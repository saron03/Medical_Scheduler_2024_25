const hamBurger = document.querySelector(".toggle-btn") as HTMLButtonElement;

hamBurger.addEventListener("click", function () {
  const sidebar = document.querySelector("#sidebar") as HTMLElement;
  sidebar.classList.toggle("expand");
});