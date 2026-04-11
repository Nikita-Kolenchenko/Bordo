import { menuConfig } from "./menu-config.js";

const mainElement = document.getElementById("menu-container");
const cardList = document.querySelector(".card-list");

// --- ЛОГИКА КАРТОЧЕК ---
function initCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });
}

// --- ЛОГИКА СТЕППЕРОВ ---
function initSteppers() {
  const containers = document.querySelectorAll(".stepper-container");

  containers.forEach((container) => {
    container.addEventListener("click", (e) => e.stopPropagation());
    const card = container.closest(".card");
    const addBtn = container.querySelector(".main-btn");
    const plusBtn = container.querySelector(".plus");
    const minusBtn = container.querySelector(".minus");

    const updateUI = (newValue, isActive) => {
      const allAddBtns = card.querySelectorAll(".main-btn");
      const allControls = card.querySelectorAll(".counter-controls");
      const allValueDisplays = card.querySelectorAll(".count-value");

      allValueDisplays.forEach((el) => (el.textContent = newValue));
      allAddBtns.forEach((b) =>
        isActive ? b.classList.add("hidden") : b.classList.remove("hidden"),
      );
      allControls.forEach((c) =>
        isActive ? c.classList.remove("hidden") : c.classList.add("hidden"),
      );
    };

    addBtn.addEventListener("click", () => {
      const basketBtn = document.querySelector("header nav button svg");
      console.log(basketBtn);
      const { name, price, img } = addBtn.dataset;
      card.dataset.count = 1;
      updateUI(1, true);

      basketBtn.classList.add("plus-on-basket");
      setTimeout(() => basketBtn.classList.remove("plus-on-basket"), 500);

      cardList.insertAdjacentHTML(
        "beforeend",
        `
        <li data-cart-item="${name}">
          <img src="${img}" alt="${name}">
          <a>${name}</a>
          <p>${price} $</p>
          <p class="item-count">1</p> 
          <button class='liBtn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </li>
      `,
      );
      updateEmptyState();
      addBtn.stopPropagation();
    });

    plusBtn.addEventListener("click", () => {
      let count = parseInt(card.dataset.count) || 1;
      if (count < 10) {
        count++;
        card.dataset.count = count;
        updateUI(count, true);
        const cartItemCount = cardList.querySelector(
          `[data-cart-item="${addBtn.dataset.name}"] .item-count`,
        );
        if (cartItemCount) cartItemCount.textContent = count;
      }
      plusBtn.stopPropagation();
      updateEmptyState();
    });

    minusBtn.addEventListener("click", () => {
      let count = parseInt(card.dataset.count) || 1;
      if (count > 1) {
        count--;
        card.dataset.count = count;
        updateUI(count, true);
        const cartItemCount = cardList.querySelector(
          `[data-cart-item="${addBtn.dataset.name}"] .item-count`,
        );
        if (cartItemCount) cartItemCount.textContent = count;
      } else {
        const itemInCart = cardList.querySelector(
          `[data-cart-item="${addBtn.dataset.name}"]`,
        );
        if (itemInCart) itemInCart.remove();
        card.dataset.count = 1;
        updateUI(1, false);
      }
      minusBtn.stopPropagation();
      updateEmptyState();
    });
  });
}

// --- УДАЛЕНИЕ ИЗ КОРЗИНЫ ---
cardList.addEventListener("click", (event) => {
  const btn = event.target.closest(".liBtn");
  if (!btn) return;

  const listItem = btn.closest("li");
  const itemName = listItem.dataset.cartItem;

  listItem.remove();

  const addBtnInMenu = document.querySelector(
    `.main-btn[data-name="${itemName}"]`,
  );
  if (addBtnInMenu) {
    const card = addBtnInMenu.closest(".card");
    card.dataset.count = 1;

    const allAddBtns = card.querySelectorAll(".main-btn");
    const allControls = card.querySelectorAll(".counter-controls");
    const allValueDisplays = card.querySelectorAll(".count-value");

    allValueDisplays.forEach((el) => (el.textContent = 1));
    allAddBtns.forEach((b) => b.classList.remove("hidden"));
    allControls.forEach((c) => c.classList.add("hidden"));
  }
  if (typeof updateEmptyState === "function") {
    updateEmptyState();
  }
});

generateAllSections();
