function toggleMenu() {
  var subMenu = document.getElementById("subMenu");
  if (subMenu) {
    subMenu.classList.toggle("open-menu");
  } else {
    console.error("SubMenu element not found.");
  }
}
window.toggleMenu = toggleMenu;
var EditForm = document.getElementById("edit-profile");
var Profile = document.getElementById("profile");
var toggleButton = document.getElementById("btn");
if (!EditForm || !Profile || !toggleButton) {
  console.error(
    "One or more DOM elements are missing. Please check your HTML structure."
  );
} else {
  function editProfile() {
    if (Profile && EditForm && toggleButton) {
      Profile.style.left = "-400px";
      EditForm.style.left = "50px";
      toggleButton.style.left = "110px";
    }
  }
  function showProfile() {
    if (Profile && EditForm && toggleButton) {
      Profile.style.left = "50px";
      EditForm.style.left = "450px";
      toggleButton.style.left = "0px";
    }
  }
  window.editProfile = editProfile;
  window.showProfile = showProfile;
}
function storeActionAndNavigate() {
  localStorage.setItem("action", "clickButton");
  window.location.href = "profile.html";
}
var action = localStorage.getItem("action");
if (action === "clickButton") {
  var targetButton = document.querySelector(".target-button");
  if (targetButton) {
    targetButton.click();
  }
  // Clear the action to avoid repeated clicks on reload
  localStorage.removeItem("action");
}
