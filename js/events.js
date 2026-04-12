import { updateEmptyState } from "./cart.js";

// ⚪ РАБОТА СТЕППЕРОВ ⚪
export function initEvents(cardList) {
  let totalSum = 0;
  const totalElement = document.getElementById("total");
  document.querySelectorAll(".stepper-container").forEach((container) => {
    // ⚪ блокирует передачу события родительским элементам
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

    // ⚪ обработка события кнопки add
    addBtn.addEventListener("click", () => {
      const basketBtn = document.querySelector(".svgBtn");
      basketBtn.classList.add("plus-on-basket");
      setTimeout(() => basketBtn.classList.remove("plus-on-basket"), 500);
      const { name, price, img } = addBtn.dataset;
      const currentPrice = Number(price);
      totalSum += currentPrice;
      totalElement.textContent = totalSum + " $";
      card.count = 1;
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

    // ⚪ обработка события кнопки плюс
    container.querySelector(".plus").addEventListener("click", () => {
      const basketBtn = document.querySelector(".svgBtn");
      const { price } = addBtn.dataset;
      const currentPrice = Number(price);
      totalSum += currentPrice;
      totalElement.textContent = totalSum + " $";
      basketBtn.classList.add("plus-on-basket");
      setTimeout(() => basketBtn.classList.remove("plus-on-basket"), 500);
      let count = (parseInt(card.dataset.count) || 1) + 1;
      if (count <= 10) {
        card.dataset.count = count;
        updateUI(count, true);
        const item = cardList.querySelector(
          `[data-cart-item="${addBtn.dataset.name}"] .item-count`,
        );
        if (item) item.textContent = count;
      }
      updateEmptyState();
    });

    // ⚪ обработка события кнопки минус
    container.querySelector(".minus").addEventListener("click", () => {
      const basketBtn = document.querySelector(".svgBtn");
      const { price } = addBtn.dataset;
      const currentPrice = Number(price);
      totalSum -= currentPrice;
      totalElement.textContent = totalSum + " $";
      basketBtn.classList.add("plus-on-basket");
      setTimeout(() => basketBtn.classList.remove("plus-on-basket"), 500);
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

  // ⚪ удаление из корзины
  cardList.addEventListener("click", (e) => {
    const btn = e.target.closest(".liBtn");
    if (!btn) return;

    const listItem = btn.closest("li");
    const name = listItem.dataset.cartItem;

    // 1. Достаем цену за 1 единицу
    const priceElement = listItem.querySelector(".cart-price");
    const priceOneItem = parseFloat(
      priceElement.textContent.replace(/[^\d.]/g, ""),
    );

    // 2. Достаем КОЛИЧЕСТВО из соседнего элемента
    const countElement = listItem.querySelector(".item-count");
    const count = parseInt(countElement.textContent) || 1;

    // 3. Считаем полную сумму этой строки (цена * количество)
    const totalLinePrice = priceOneItem * count;

    // 4. Вычитаем из общей суммы всё сразу
    totalSum -= totalLinePrice;

    if (totalSum < 0) totalSum = 0;
    totalElement.textContent = totalSum.toFixed(2) + " $";

    // 5. Удаляем элемент
    listItem.remove();

    // 6. Сбрасываем карточку в магазине
    const menuBtn = document.querySelector(`.main-btn[data-name="${name}"]`);
    if (menuBtn) {
      const card = menuBtn.closest(".card");
      card.dataset.count = 0; // Сбрасываем в 0, чтобы при новом добавлении началось с 1

      card
        .querySelectorAll(".main-btn")
        .forEach((b) => b.classList.remove("hidden"));
      card
        .querySelectorAll(".counter-controls")
        .forEach((c) => c.classList.add("hidden"));
      card
        .querySelectorAll(".count-value")
        .forEach((el) => (el.textContent = 1));
    }

    updateEmptyState();
  });
}
