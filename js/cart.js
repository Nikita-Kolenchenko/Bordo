// ⚪ ПЕРЕВОРОТ КАРТОЧКИ ⚪
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("is-animating");
    card.classList.toggle("is-flipped");
    setTimeout(() => {
      card.classList.remove("is-animating");
    }, 400);
  });
});

// ⚪ ЕСЛИ В КОРЗИНЕ ПУСТО НО ДОБАВЛЯЕМ НАДПИСЬ И КНОПКУ ⚪
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

// ⚪ СТИЛИ ПРИ НАВЕДЕНИИ НА КНОПКУ УДАЛЕНИЯ В КОРЗИНЕ ⚪
export function initCartHoverEffects(cardListUl) {
  if (!window.matchMedia("(hover: hover)").matches) {
    return;
  }

  cardListUl.addEventListener("mouseover", (e) => {
    const btn = e.target.closest(".liBtn");
    if (!btn) return;

    const allLis = cardListUl.querySelectorAll("li");
    const parentLi = btn.closest("li");

    allLis.forEach((li) => {
      li.style.opacity = "0.5";
      li.style.border = "1px solid #333";
    });

    if (parentLi) {
      parentLi.style.opacity = "1";
      parentLi.style.border = "1px solid #5e1914";
      parentLi.style.backgroundColor = "rgba(94, 25, 20, 0.1)";
    }
    cardListUl.addEventListener("click", () => {
      allLis.forEach((li) => {
        li.style.opacity = "1";
        li.style.backgroundColor = "#1e1e1e";
        li.style.border = "1px solid #333";
      });
    });
  });
  cardListUl.addEventListener("mouseout", (e) => {
    if (e.target.closest(".liBtn")) {
      const allLis = cardListUl.querySelectorAll("li");
      allLis.forEach((li) => {
        li.style.opacity = "1";
        li.style.border = "1px solid #333";
        li.style.backgroundColor = "#1e1e1e";
      });
    }
  });
}
