async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Account created! Check your email.");
  }
}


async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Login successful!");
  }
}
async function uploadMod(){

const file = document.getElementById("file").files[0];
const name = document.getElementById("name").value;
const version = document.getElementById("version").value;
const description = document.getElementById("description").value;


if(!file){
alert("Choose a file first");
return;
}


const fileName = Date.now() + "-" + file.name;


// Upload file
const {error: uploadError} = await supabaseClient
.storage
.from("mods")
.upload(fileName, file);


if(uploadError){
alert(uploadError.message);
return;
}


// Get link
const {data} = supabaseClient
.storage
.from("mods")
.getPublicUrl(fileName);


const user = await supabaseClient.auth.getUser();


// Save info
const {error} = await supabaseClient
.from("mods")
.insert({
name:name,
version:version,
description:description,
file_url:data.publicUrl,
creator:user.data.user.id
});


if(error){
alert(error.message);
}else{
alert("Mod uploaded successfully!");
}

}
