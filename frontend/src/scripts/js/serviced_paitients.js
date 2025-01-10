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
// Function to render completed users in the table
function renderCompletedUsers() {
    var completedUsers = JSON.parse(localStorage.getItem('completedUsers') || '[]');
    var completedUserTableBody = document.getElementById('completedUserTableBody');
    completedUserTableBody.innerHTML = '';
    completedUsers.forEach(function (user) {
        var row = "<tr class=\"completed\">\n            <td>".concat(user.name, "</td>\n            <td>").concat(user.id, "</td>\n            <td>").concat(user.age, "</td>\n            <td>").concat(user.time, "</td>\n        </tr>");
        completedUserTableBody.innerHTML += row;
    });
}
// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser() {
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("jwtToken");
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
}
// Attach the logout function to the logout button
(_a = document.getElementById("logout")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", logoutUser);
// Initial rendering of completed users
document.addEventListener('DOMContentLoaded', renderCompletedUsers);
