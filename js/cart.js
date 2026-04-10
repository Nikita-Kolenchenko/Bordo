export function updateEmptyState() {
  const cardListUl = document.querySelector(".card-list");
  const emptyBlock = document.querySelector(".card-list-empty");
  if (!cardListUl || !emptyBlock) return;

  const isEmpty = cardListUl.children.length === 0;
  emptyBlock.style.display = isEmpty ? "flex" : "none";
  cardListUl.style.display = isEmpty ? "none" : "block";
}

export function initCartHoverEffects(cardListUl) {
  // Проверяем: если устройство НЕ поддерживает ховер (телефон), выходим из функции
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
