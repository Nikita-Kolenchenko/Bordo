export function initCopy() {
  const btn = document.querySelector(".copy-link");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const originalText = target.innerText;

    if (originalText === "Copied!") return;

    navigator.clipboard
      .writeText(originalText)
      .then(() => {
        target.innerText = "Copied!";
        target.classList.replace("cursor-1", "cursor-2");

        setTimeout(() => {
          target.innerText = originalText;
          target.classList.replace("cursor-2", "cursor-1");
        }, 1500);
      })
      .catch((err) => {
        console.error("Ошибка при копировании: ", err);
      });
  });
}

export function copyright() {
  const copyrightBtn = document.querySelector(".text-right");
  if (!copyrightBtn) return;

  copyrightBtn.addEventListener("click", () => {
    copyrightBtn.style.maxWidth = "300px";
    setTimeout(() => {
      copyrightBtn.style.maxWidth = "100px";
    }, 2000);
  });
}
