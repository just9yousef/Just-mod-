const search = document.querySelector(".hero input");
const cards = document.querySelectorAll(".card");

search.addEventListener("input", () => {
  const text = search.value.toLowerCase();

  cards.forEach(card => {
    const name = card.textContent.toLowerCase();

    if (name.includes(text)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
