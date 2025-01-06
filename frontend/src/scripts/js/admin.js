// Sample data
var users = [
    { name: "Dr. John Doe", email: "johndoe@example.com", accountStatus: "active", role: "doctor" },
    { name: "Jane Doe", email: "janedoe@example.com", accountStatus: "restricted", role: "receptionist" },
    // Add more sample users as needed
];
var totalDoctors = users.filter(function (user) { return user.role === "doctor"; }).length;
var totalReceptionists = users.filter(function (user) { return user.role === "receptionist"; }).length;
var restrictedAccounts = users.filter(function (user) { return user.accountStatus === "restricted"; }).length;
// Renders the user table
function renderUsers(users) {
    var userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    users.forEach(function (user, index) {
        var rowClass = user.accountStatus === "restricted" ? "restricted" : "";
        var row = "<tr class=\"".concat(rowClass, "\">\n            <td>").concat(user.name, "</td>\n            <td>").concat(user.email, "</td>\n            <td>").concat(user.accountStatus, "</td>\n            <td>").concat(user.role, "</td>\n            <td>\n                <button class=\"btn btn-danger btn-sm\" onclick=\"deleteUser(").concat(index, ")\">Delete</button>\n                <button class=\"btn btn-warning btn-sm\" onclick=\"restrictUser(").concat(index, ")\">").concat(user.accountStatus === "restricted" ? "Unrestrict" : "Restrict", "</button>\n            </td>\n        </tr>");
        userTableBody.innerHTML += row;
    });
    updateCounters();
}
// Deletes a user
function deleteUser(index) {
    var deletedUser = users.splice(index, 1)[0];
    if (deletedUser.role === "doctor") {
        totalDoctors--;
    }
    else if (deletedUser.role === "receptionist") {
        totalReceptionists--;
    }
    if (deletedUser.accountStatus === "restricted") {
        restrictedAccounts--;
    }
    renderUsers(users);
}
// Restricts or unrestricts a user
function restrictUser(index) {
    var user = users[index];
    if (user.accountStatus === "active") {
        user.accountStatus = "restricted";
        restrictedAccounts++;
    }
    else {
        user.accountStatus = "active";
        restrictedAccounts--;
    }
    renderUsers(users);
}
// Implements search functionality
function filterUsers() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var filteredUsers = users.filter(function (user) {
        return user.name.toLowerCase().includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue) ||
            user.accountStatus.toLowerCase().includes(searchValue) ||
            user.role.toLowerCase().includes(searchValue);
    });
    renderUsers(filteredUsers);
}
// Updates the counters for total doctors, receptionists, and restricted accounts
function updateCounters() {
    document.getElementById('totalDoctors').innerText = totalDoctors.toString();
    document.getElementById('totalReceptionists').innerText = totalReceptionists.toString();
    document.getElementById('restrictedAccounts').innerText = restrictedAccounts.toString();
}
// Initial rendering of users
document.addEventListener('DOMContentLoaded', function () {
    renderUsers(users);
});
