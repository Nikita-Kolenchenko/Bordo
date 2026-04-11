import { menuConfig } from "./menu-config.js";
import { renderCards } from "./render.js";
import { initEvents } from "./events.js";
import { initCartHoverEffects } from "./cart.js";

const mainElement = document.getElementById("menu-container");
const cardList = document.querySelector(".card-list");

function generateAllSections() {
  mainElement.innerHTML = menuConfig
    .map(
      (section) => `
        <section id="${section.id}">
          <div class="sticky-wrapper">
            <h3>${section.title}</h3>
          </div>
            <span id="${section.id}1" class="menu-grid">${renderCards(section.data)}</span>
        </section>
    `,
    )
    .join("");

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

  // Запуск всей логики кнопок и корзины
  initEvents(cardList);
}

// Запуск приложения
generateAllSections();
initCartHoverEffects(cardList);

document.querySelector(".copy-link").addEventListener("click", function (e) {
  e.preventDefault();

  const text = this.innerText; // Сохранили адрес один раз и навсегда

  // Если уже написано Copied!, ничего не делаем
  if (text === "Copied!") return;

  navigator.clipboard.writeText(text).then(() => {
    this.innerText = "Copied!";
    this.classList.add("cursor-2");
    this.classList.remove("cursor-1");

    setTimeout(() => {
      // Возвращаем тот самый текст, который сохранили в первой строке
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
