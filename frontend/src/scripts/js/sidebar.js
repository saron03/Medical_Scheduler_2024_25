"use strict";
const hamBurger = document.querySelector(".toggle-btn");
hamBurger.addEventListener("click", function () {
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("expand");
});
