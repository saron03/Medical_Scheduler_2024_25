// Sample data
var users = [
    { name: "John Doe", dateTime: new Date().toLocaleString(), status: "Not Pending" },
    { name: "Jane Doe", dateTime: new Date().toLocaleString(), status: "Not Pending" },
];
var activeEntries = users.length;
var pendingEntries = users.filter(function (user) { return user.status === "Pending"; }).length;
// Renders the queue database in a table
function renderUsers(users) {
    var userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    users.forEach(function (user, index) {
        var rowClass = user.status === "Pending" ? "pending" : (user.status === "Resolved Pending" ? "resolved" : "");
        var resolveButtonDisabled = user.status !== "Pending";
        var row = "\n            <tr class=\"".concat(rowClass, "\">\n                <td>").concat(user.name, "</td>\n                <td>").concat(user.dateTime, "</td>\n                <td>").concat(user.status, "</td>\n                <td>\n                    <button style=\"border: none; color: white;\" class=\"btn btn-sm\" onclick=\"resolvePendingUser(").concat(index, ")\" ").concat(resolveButtonDisabled ? 'disabled' : '', ">Resolve Pending</button>\n                    <button style=\"border: none; color: white;\" class=\"btn btn-sm\" onclick=\"deleteUser(").concat(index, ")\">Delete</button>\n                </td>\n            </tr>");
        userTableBody.innerHTML += row;
    });
    updateCounters();
}
// Adds user to the queue
function addUser(event) {
    event.preventDefault();
    var userName = document.getElementById('userName').value;
    // const userDob = (document.getElementById('userDob') as HTMLInputElement).value;
    // const userContact = (document.getElementById('userContact') as HTMLInputElement).value;
    // const userEmail = (document.getElementById('userEmail') as HTMLInputElement).value;
    // const userPassword = (document.getElementById('userPassword') as HTMLInputElement).value;
    var newUser = {
        name: userName,
        dateTime: new Date().toLocaleString(),
        status: "Not Pending",
    };
    users.push(newUser);
    activeEntries++;
    renderUsers(users);
    closeAddUserModal();
}
// Deletes users from queue table when misentry
function deleteUser(index) {
    var user = users[index];
    if (user.status === "Pending") {
        pendingEntries--;
    }
    users.splice(index, 1);
    activeEntries--;
    renderUsers(users);
}
// Listens for an update from receptionist side
function resolvePendingUser(index) {
    users[index].status = "Resolved Pending";
    pendingEntries--;
    renderUsers(users);
}
// Implements search mechanism
function filterUsers() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var filteredUsers = users.filter(function (user) {
        return user.name.toLowerCase().includes(searchValue) ||
            user.dateTime.toLowerCase().includes(searchValue) ||
            user.status.toLowerCase().includes(searchValue);
    });
    renderUsers(filteredUsers);
}
// Function to update counters for active and pending entries
function updateCounters() {
    document.getElementById('activeEntries').innerText = activeEntries.toString();
    document.getElementById('pendingEntries').innerText = pendingEntries.toString();
}
// Modal functions
function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
}
function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
}
// Load the state when the page loads
document.addEventListener('DOMContentLoaded', function () {
    renderUsers(users);
});
