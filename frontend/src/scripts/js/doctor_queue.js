// src/components/index.ts
var users = [
    { name: "John Doe", id: "001", age: 30, status: "Not Pending" },
    { name: "Jane Doe", id: "002", age: 25, status: "Not Pending" },
];
var totalCompleted = 0;
var totalPending = users.filter(function (user) { return user.status === "Pending"; }).length;
var resolvedPending = 0;
// Function to render users in the table
function renderUsers(users) {
    var userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    users.forEach(function (user, index) {
        var rowClass = user.status === "Pending" ? "pending" : (user.status === "Resolved Pending" ? "resolved" : "");
        var row = "<tr class=\"".concat(rowClass, "\">\n            <td>").concat(user.name, "</td>\n            <td>").concat(user.id, "</td>\n            <td>").concat(user.age, "</td>\n            <td>").concat(user.status, "</td>\n            <td>\n                <button class=\"btn btn-secondary btn-sm\" onclick=\"pendUser(").concat(index, ")\">Pend</button>\n                <button class=\"btn btn-success btn-sm\" onclick=\"completeUser(").concat(index, ")\">Complete</button>\n            </td>\n        </tr>");
        userTableBody.innerHTML += row;
    });
    updateCounters();
}
// Function to delete a user and add to completed list
function completeUser(index) {
    var completedUser = users.splice(index, 1)[0];
    completedUser.time = new Date().toLocaleString();
    totalCompleted++;
    renderUsers(users);
    // Store completed user in local storage
    var completedUsers = JSON.parse(localStorage.getItem('completedUsers') || '[]');
    completedUsers.push(completedUser);
    localStorage.setItem('completedUsers', JSON.stringify(completedUsers));
}
// Function to add a new user
function addUser(event) {
    event.preventDefault();
    var name = document.getElementById('userName').value;
    var id = document.getElementById('userId').value;
    var age = parseInt(document.getElementById('userAge').value, 10);
    users.push({ name: name, id: id, age: age, status: "Not Pending" });
    renderUsers(users);
    closeAddUserModal();
}
// Function to pend a user
function pendUser(index) {
    users[index].status = "Pending";
    totalPending++;
    renderUsers(users);
}
// Function to resolve a pending user
function resolvePendingUser(index) {
    users[index].status = "Resolved Pending";
    totalPending--;
    resolvedPending++;
    renderUsers(users);
}
// Function to filter users based on the search input
function filterUsers() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var filteredUsers = users.filter(function (user) {
        return user.name.toLowerCase().includes(searchValue) ||
            user.id.toLowerCase().includes(searchValue) ||
            user.age.toString().toLowerCase().includes(searchValue) ||
            user.status.toLowerCase().includes(searchValue);
    });
    renderUsers(filteredUsers);
}
// Function to update counters for total completed, pending, and resolved pending
function updateCounters() {
    document.getElementById('totalCompleted').innerText = totalCompleted.toString();
    document.getElementById('totalPending').innerText = totalPending.toString();
    document.getElementById('resolvedPending').innerText = resolvedPending.toString();
}
// Functions to open and close Add User Modal
function openAddUserModal() {
    document.getElementById('addUserModal').style.display = "block";
}
function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = "none";
}
// Save the state before navigating away
function saveState() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('totalCompleted', totalCompleted.toString());
    localStorage.setItem('totalPending', totalPending.toString());
    localStorage.setItem('resolvedPending', resolvedPending.toString());
}
document.querySelector('a[href="completed.html"]').addEventListener('click', saveState);
// Load the state when the page loads
document.addEventListener('DOMContentLoaded', function (event) {
    var savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    var savedTotalCompleted = localStorage.getItem('totalCompleted');
    var savedTotalPending = localStorage.getItem('totalPending');
    var savedResolvedPending = localStorage.getItem('resolvedPending');
    if (savedUsers.length > 0) {
        users.length = 0; // Clear the existing users array
        users.push.apply(// Clear the existing users array
        users, savedUsers); // Load saved users
        totalCompleted = parseInt(savedTotalCompleted || '0', 10);
        totalPending = parseInt(savedTotalPending || '0', 10);
        resolvedPending = parseInt(savedResolvedPending || '0', 10);
        renderUsers(users);
    }
});
// Initial rendering of users
renderUsers(users);
