export function renderCards(data) {
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
        <article class="card" id="${item.name}">
            <div class="card-inner ${item.name}">
                <div class="${item.class} card-front ${item.name}">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="card-content">
                        <h2>${item.price} $</h2>
                        <a>${item.name}</a>
                        <p>${item.gram || item.ml || ""} ${item.gram ? "g" : "ml"}</p>
                        ${btnTemplate(item)}
                     </div>
                </div>
                <div class="${item.class} card-back ${item.name}">
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

export function updateEmptyState() {
  const cardListUl = document.querySelector(".card-list");
  const emptyBlock = document.querySelector(".card-list-empty");

  if (cardListUl.children.length === 0) {
    emptyBlock.style.display = "flex";
    cardListUl.style.display = "none";
  } else {
    emptyBlock.style.display = "none";
    cardListUl.style.display = "block";
  }
}
