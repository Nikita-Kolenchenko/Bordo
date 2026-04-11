import { updateEmptyState } from "./render.js";

export function initEvents(cardList) {
  document.querySelectorAll(".stepper-container").forEach((container) => {
    container.addEventListener("click", (e) => e.stopPropagation());
    const card = container.closest(".card");
    const addBtn = container.querySelector(".main-btn");

    const updateUI = (newValue, isActive) => {
      card
        .querySelectorAll(".count-value")
        .forEach((el) => (el.textContent = newValue));
      card
        .querySelectorAll(".main-btn")
        .forEach((b) =>
          isActive ? b.classList.add("hidden") : b.classList.remove("hidden"),
        );
      card
        .querySelectorAll(".counter-controls")
        .forEach((c) =>
          isActive ? c.classList.remove("hidden") : c.classList.add("hidden"),
        );
    };

    addBtn.addEventListener("click", () => {
      const { name, price, img } = addBtn.dataset;
      card.dataset.count = 1;
      updateUI(1, true);
      cardList.insertAdjacentHTML(
        "beforeend",
        `
        <li data-cart-item="${name}">
          <img src="${img}" alt="${name}">
          <a class="dialogMenu ${name}" href='#${name}' onclick="cart.close(); playCardAnimation('${name}')">${name}</a> <p class="cart-price">${price} $</p> <p class="item-count">1</p> 
          <button class='liBtn'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
        </li>`,
      );
      updateEmptyState();
    });

    container.querySelector(".plus").addEventListener("click", () => {
      let count = (parseInt(card.dataset.count) || 1) + 1;
      if (count <= 10) {
        card.dataset.count = count;
        updateUI(count, true);
        const item = cardList.querySelector(
          `[data-cart-item="${addBtn.dataset.name}"] .item-count`,
        );
        if (item) item.textContent = count;
      }
    });

    container.querySelector(".minus").addEventListener("click", () => {
      let count = (parseInt(card.dataset.count) || 1) - 1;
      if (count >= 1) {
        card.dataset.count = count;
        updateUI(count, true);
        const item = cardList.querySelector(
          `[data-cart-item="${addBtn.dataset.name}"] .item-count`,
        );
        if (item) item.textContent = count;
      } else {
        cardList
          .querySelector(`[data-cart-item="${addBtn.dataset.name}"]`)
          ?.remove();
        card.dataset.count = 1;
        updateUI(1, false);
      }
      updateEmptyState();
    });
  });

  cardList.addEventListener("click", (e) => {
    const btn = e.target.closest(".liBtn");
    if (!btn) return;
    const name = btn.closest("li").dataset.cartItem;
    const parentCard = btn.closest("li");
    parentCard.remove();
    const menuBtn = document.querySelector(`.main-btn[data-name="${name}"]`);
    if (menuBtn) {
      const card = menuBtn.closest(".card");
      card.dataset.count = 1;
      card
        .querySelectorAll(".count-value")
        .forEach((el) => (el.textContent = 1));
      card
        .querySelectorAll(".main-btn")
        .forEach((b) => b.classList.remove("hidden"));
      card
        .querySelectorAll(".counter-controls")
        .forEach((c) => c.classList.add("hidden"));
    }
    updateEmptyState();
  });
}
