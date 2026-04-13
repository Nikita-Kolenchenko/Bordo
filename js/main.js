import { initEvents } from "./events.js";
import { initCartHoverEffects } from "./cart.js";
import { initCopy, copyright } from "./footer.js";

const cardList = document.querySelector(".card-list"); // li

// ⚪ ПОИСК ЕЛЕМЕНТА ИЗ КАРЗИНЫ ПО НАЖАТИЮ ⚪
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

// ⚪ ЗАПУСК ПРИЛОЖЕНИЯ ⚪
initCartHoverEffects(cardList);
initEvents(cardList);
initCopy();
copyright();
