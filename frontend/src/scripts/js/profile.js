var _a;
// Check for JWT token on load
var checkJwtToken = function () {
    var jwtToken = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (!jwtToken) {
        window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
    }
};
// Call the checkJwtToken function on load
checkJwtToken();
function toggleMenu() {
    var subMenu = document.getElementById("subMenu");
    if (subMenu) {
        subMenu.classList.toggle("open-menu");
    }
    else {
        console.error("SubMenu element not found.");
    }
}
window.toggleMenu = toggleMenu;
var EditForm = document.getElementById("edit-profile");
var Profile = document.getElementById("profile");
var toggleButton = document.getElementById("btn");
if (!EditForm || !Profile || !toggleButton) {
    console.error("One or more DOM elements are missing. Please check your HTML structure.");
}
else {
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
// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser() {
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("jwtToken");
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
}
// Attach the logout function to the logout button
(_a = document.getElementById("logout")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", logoutUser);
