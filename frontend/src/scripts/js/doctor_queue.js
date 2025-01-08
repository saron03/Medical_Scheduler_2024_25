// Sample data
var users = [
    { name: "John Doe", id: "001", age: 30, status: "Not Pending" },
    { name: "Jane Doe", id: "002", age: 25, status: "Not Pending" },
];
var totalCompleted = 0;
var totalPending = users.filter(function (user) { return user.status === "pending"; }).length;
var resolvedPending = 0;
// Renders the queue database in a table
function renderUsers(users) {
    var userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    users.forEach(function (user, index) {
        var rowClass = user.status.toLocaleLowerCase() === "pending" ? "pending" : (user.status === "Resolved Pending" ? "resolved" : "");
        var row = "<tr class=\"".concat(rowClass, "\">\n            <td>").concat(user.name, "</td>\n            <td>").concat(user.id, "</td>\n            <td>").concat(user.age, "</td>\n            <td>").concat(user.status, "</td>\n            <td>\n                <button class=\"btn btn-secondary btn-sm pend-btn\" onclick=\"pendUser(").concat(index, ")\">").concat(user.status.toLowerCase() === "pending" ? "unpend" : "pend", "</button>\n                <button class=\"btn btn-success btn-sm\" onclick=\"completeUser(").concat(index, ")\">Complete</button>\n            </td>\n        </tr>");
        userTableBody.innerHTML += row;
    });
    addPendEventListeners();
    updateCounters();
}
// Adds event listeners to all pend buttons
function addPendEventListeners() {
    var pendButtons = document.querySelectorAll('.pend-btn');
    pendButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            if (button.textContent === "pend") {
                button.textContent = "unpend";
            }
            else {
                button.textContent = "pend";
            }
        });
    });
}
// Deletes users from queue table when service is completed
function completeUser(index) {
    var completedUser = users.splice(index, 1)[0];
    completedUser.time = new Date().toLocaleString();
    totalCompleted++;
    renderUsers(users);
}
// Pends users
function pendUser(index) {
    if (users[index].status.toLowerCase() === "not pending") {
        users[index].status = "Pending";
        totalPending++;
    }
    else {
        users[index].status = "Not Pending";
        totalPending--;
    }
    renderUsers(users);
}
// Listens for an update from receptionist side
function resolvePendingUser(index) {
    users[index].status = "Resolved Pending";
    totalPending--;
    resolvedPending++;
    renderUsers(users);
}
// Implements search mechanism
function filterUsers() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var filteredUsers = users.filter(function (user) {
        return user.name.toLowerCase().startsWith(searchValue) ||
            user.id.toLowerCase().startsWith(searchValue) ||
            user.age.toString().toLowerCase().startsWith(searchValue) ||
            user.status.toLowerCase().startsWith(searchValue);
    });
    renderUsers(filteredUsers);
}
// Function to update counters for total completed, pending, and resolved pending
function updateCounters() {
    document.getElementById('totalCompleted').innerText = totalCompleted.toString();
    document.getElementById('totalPending').innerText = totalPending.toString();
    document.getElementById('resolvedPending').innerText = resolvedPending.toString();
}
// Placeholder function to simulate fetching users from the database
// function fetchUsersFromDatabase(): Promise<User[]> {
//     // Replace this with actual database fetching logic
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(users);
//         }, 1000);
//     });
// }
renderUsers(users);
