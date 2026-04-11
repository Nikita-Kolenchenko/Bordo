import { menuStarters, menuMain, menuDesserts, menuDrinks } from "../menu.js";

const mainElement = document.getElementById("menu-container");
const cardList = document.querySelector(".card-list"); // Вынесем поиск корзины в константу

const menuConfig = [
  { id: "starters", title: "starters", data: menuStarters },
  { id: "mains", title: "mains", data: menuMain },
  { id: "desserts", title: "desserts", data: menuDesserts },
  { id: "drinks", title: "drinks", data: menuDrinks },
];

// --- ГЕНЕРАЦИЯ МЕНЮ ---
function generateAllSections() {
  mainElement.innerHTML = menuConfig
    .map(
      (section) => `
        <section id="${section.id}">
            <div class="sticky-wrapper">
              <h3>${section.title}</h3>
            </div>
            <span id="${section.id}1" class="menu-grid">
                ${renderCards(section.data)}
            </span>
        </section>
    `,
    )
    .join("");

  // После генерации HTML инициализируем события
  initCards();
  initSteppers();
}

function renderCards(data) {
  const btnTemplate = (item) => `
        <div class="stepper-container">
            <button class="main-btn add-btn" data-name="${item.name}" data-price="${item.price}" data-img="${item.img}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                add
            </button>
            <div class="counter-controls hidden">
                <button class="minus add-btn" data-name="${item.name}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                    </svg>
                </button>
                <span class="count-value">1</span>
                <button class="plus add-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
            </div>
        </div>
    `;

  return data
    .map(
      (item) => `
        <article class="card">
            <div class="card-inner">
                <div class="${item.class} card-front">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="card-content">
                        <h2>${item.price} $</h2>
                        <a>${item.name}</a>
                        <p>${item.gram || item.ml || ""} ${item.gram ? "g" : "ml"}</p>
                        ${btnTemplate(item)}
                     </div>
                </div>
                <div class="${item.class} card-back">
                    <h3>Nutrition Info</h3>
                    <p>Calories: ${item.calories} kcal</p>
                    <p>Spicy: ${item.spicy}/5</p>
                    <p>Rating: ${item.rating} ⭐</p>
                    ${btnTemplate(item)}
                </div>
            </div>
        </article>
    `,
    )
    .join("");
}

function updateEmptyState() {
  const cardListUl = document.querySelector(".card-list");
  const emptyBlock = document.querySelector(".card-list-empty");

  // Если в списке 0 элементов
  if (cardListUl.children.length === 0) {
    emptyBlock.style.display = "flex"; // Показываем надпись
    cardListUl.style.display = "none"; // Скрываем сам список
  } else {
    emptyBlock.style.display = "none"; // Скрываем надпись
    cardListUl.style.display = "block"; // Показываем список
  }
}
// --- ЛОГИКА КАРТОЧЕК (FLIP) ---
function initCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });
}

// --- ЛОГИКА СТЕППЕРОВ (+/-) ---
function initSteppers() {
  const containers = document.querySelectorAll(".stepper-container");

  containers.forEach((container) => {
    container.addEventListener("click", (e) => e.stopPropagation()); // Чтобы карточка не переворачивалась при клике на кнопки
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
      const { name, price, img } = addBtn.dataset;
      card.dataset.count = 1;
      updateUI(1, true);

      // Используем insertAdjacentHTML, чтобы не "убивать" обработчики на других li
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

// --- УДАЛЕНИЕ ИЗ КОРЗИНЫ (Делегирование) ---
cardList.addEventListener("click", (event) => {
  const btn = event.target.closest(".liBtn");
  if (!btn) return;

  const listItem = btn.closest("li");
  const itemName = listItem.dataset.cartItem;

  // 1. Удаляем из корзины
  listItem.remove();

  // 2. Сбрасываем карточку в меню
  const addBtnInMenu = document.querySelector(
    `.main-btn[data-name="${itemName}"]`,
  );
  if (addBtnInMenu) {
    const card = addBtnInMenu.closest(".card");
    card.dataset.count = 1;

    // Вручную обновляем UI всех сторон карточки
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

// Запуск приложения
generateAllSections();

// Эффекты наведения (Hover) на кнопки корзины
const cardListUl = document.querySelector(".card-list");

cardListUl.addEventListener("mouseover", (e) => {
  const btn = e.target.closest(".liBtn");
  if (!btn) return;

  const allLis = cardListUl.querySelectorAll("li");
  const parentLi = btn.closest("li");

  // 1. Сначала "приглушаем" все элементы
  allLis.forEach((li) => {
    li.style.opacity = "0.5";
    li.style.border = "1px solid #333";
  });

  // 2. Добавляем эффекты ТОЛЬКО для активного parentLi
  if (parentLi) {
    parentLi.style.opacity = "1";
    parentLi.style.transform = "scale(1.02), translateY(0px)";
    parentLi.style.border = "1px solid #5e1914";
    parentLi.style.backgroundColor = "rgba(94, 25, 20, 0.1)";
  }
});

// Возврат в исходное состояние
cardListUl.addEventListener("mouseout", (e) => {
  if (e.target.closest(".liBtn")) {
    const allLis = cardListUl.querySelectorAll("li");
    allLis.forEach((li) => {
      li.style.opacity = "1";
      li.style.transform = "scale(1), translateY(0px)";
      li.style.border = "1px solid #333";
      li.style.backgroundColor = "#1e1e1e";
    });
  }
});
