export function Copy() {
  document.querySelector(".copy-link").addEventListener("click", (e) => {
    e.preventDefault();

    const text = this.innerText;

    if (text === "Copied!") return;

    navigator.clipboard.writeText(text).then(() => {
      this.innerText = "Copied!";
      this.classList.add("cursor-2");
      this.classList.remove("cursor-1");

      setTimeout(() => {
        this.innerText = text;
        this.classList.remove("cursor-2");
        this.classList.add("cursor-1");
      }, 1500);
    });
  });
}
