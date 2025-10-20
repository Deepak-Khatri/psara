document.addEventListener("DOMContentLoaded", () => {
  const heroText = document.querySelector(".hero-content");
  heroText.style.opacity = 0;
  setTimeout(() => {
    heroText.style.transition = "opacity 1.5s ease-in";
    heroText.style.opacity = 1;
  }, 300);
});
