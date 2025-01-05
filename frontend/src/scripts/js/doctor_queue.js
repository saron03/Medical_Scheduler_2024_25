"use strict";
// Sample data
const users = [
    { name: "John Doe", id: "001", age: 30, status: "Not Pending" },
    { name: "Jane Doe", id: "002", age: 25, status: "Not Pending" },
];
let totalCompleted = 0;
let totalPending = users.filter(user => user.status === "Pending").length;
let resolvedPending = 0;
// Renders the queue database in a table
function renderUsers(users) {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const rowClass = user.status === "Pending" ? "pending" : (user.status === "Resolved Pending" ? "resolved" : "");
        const row = `<tr class="${rowClass}">
            <td>${user.name}</td>
            <td>${user.id}</td>
            <td>${user.age}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="pendUser(${index})">Pend</button>
                <button class="btn btn-warning btn-sm" onclick="updateUser(${index})">Update</button>
                <button class="btn btn-success btn-sm" onclick="completeUser(${index})">Complete</button>
            </td>
        </tr>`;
        userTableBody.innerHTML += row;
    });
    updateCounters();
}
// deletes users from queue table when service is completed
function completeUser(index) {
    const completedUser = users.splice(index, 1)[0];
    completedUser.time = new Date().toLocaleString();
    totalCompleted++;
    renderUsers(users);
    // It caches serviced users for review if needed
    const completedUsers = JSON.parse(localStorage.getItem('completedUsers') || '[]');
    completedUsers.push(completedUser);
    localStorage.setItem('completedUsers', JSON.stringify(completedUsers));
}
// pends users
function pendUser(index) {
    users[index].status = "Pending";
    totalPending++;
    renderUsers(users);
}
// listens for an update from receptioist side
function resolvePendingUser(index) {
    users[index].status = "Resolved Pending";
    totalPending--;
    resolvedPending++;
    renderUsers(users);
}
// implements search mechanism
function filterUsers() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchValue) ||
        user.id.toLowerCase().includes(searchValue) ||
        user.age.toString().toLowerCase().includes(searchValue) ||
        user.status.toLowerCase().includes(searchValue));
    renderUsers(filteredUsers);
}
// Function to update counters for total completed, pending, and resolved pending
function updateCounters() {
    document.getElementById('totalCompleted').innerText = totalCompleted.toString();
    document.getElementById('totalPending').innerText = totalPending.toString();
    document.getElementById('resolvedPending').innerText = resolvedPending.toString();
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
document.addEventListener('DOMContentLoaded', () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const savedTotalCompleted = localStorage.getItem('totalCompleted');
    const savedTotalPending = localStorage.getItem('totalPending');
    const savedResolvedPending = localStorage.getItem('resolvedPending');
    if (savedUsers) {
        users.length = 0; // Clear the existing users array
        users.push(...savedUsers); // Load saved users
        totalCompleted = parseInt(savedTotalCompleted, 10);
        totalPending = parseInt(savedTotalPending, 10);
        resolvedPending = parseInt(savedResolvedPending, 10);
        renderUsers(users);
    }
});
// Initial rendering of users
renderUsers(users);
