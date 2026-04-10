const extendedMenu = document.getElementById("extendedMenu");
const sections = document.querySelectorAll("main section");
const ss = document.querySelectorAll("section span");
const navLinks = document.querySelectorAll(".menu-2 a");
const subMenus = document.querySelectorAll("#extendedMenu span");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 2.5) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  subMenus.forEach((span) => {
    if (span.classList.contains(current)) {
      span.classList.add("active");
    } else {
      span.classList.remove("active");
    }
  });
});

const menuLinks = document.querySelectorAll(".Menu a");

menuLinks.forEach((linking) => {
  linking.addEventListener("click", () => {
    document
      .querySelectorAll(".card-inner")
      .forEach((article) => article.classList.remove("animate"));

    const className = linking.id;

    document.querySelectorAll("." + className).forEach((article) => {
      article.classList.add("animate");
      setTimeout(() => {
        article.classList.remove("animate");
      }, 1500);
    });
  });
});
