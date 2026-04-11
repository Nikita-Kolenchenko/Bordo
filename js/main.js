import { initEvents } from "./events.js";
import { initCartHoverEffects } from "./cart.js";

const cardList = document.querySelector(".card-list");

// Инициализация клика (Flip)
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("is-animating");
    card.classList.toggle("is-flipped");
    setTimeout(() => {
      card.classList.remove("is-animating");
    }, 400);
  });
});

initEvents(cardList);

// Запуск приложения
initCartHoverEffects(cardList);

document.querySelector(".copy-link").addEventListener("click", function (e) {
  e.preventDefault();

  const text = this.innerText;

  if (text === "Copied!") return;

  navigator.clipboard.writeText(text).then(() => {
    this.innerText = "Copied!";
    this.classList.add("cursor-2");
    this.classList.remove("cursor-1");

    setTimeout(() => {
      this.innerText = text;
      this.classList.remove("cursor-2");
      this.classList.add("cursor-1");
    }, 1500);
  });
});

window.playCardAnimation = function (nameId) {
  const targetCard = document.getElementById(nameId);
  if (targetCard) {
    const targetInner = targetCard.querySelector(".card-inner");
    const targetMain = targetInner.classList[1];
    const inner = targetInner.querySelectorAll(`.${targetMain}`);
    inner.forEach((name) => {
      name.classList.add("animate");
      setTimeout(() => name.classList.remove("animate"), 1500);
    });
  }
};
