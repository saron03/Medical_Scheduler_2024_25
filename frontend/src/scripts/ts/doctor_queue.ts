// src/components/index.ts

// Sample data
interface User {
    name: string;
    id: string;
    age: number;
    status: string;
    time?: string;
}

const users: User[] = [
    { name: "John Doe", id: "001", age: 30, status: "Not Pending" },
    { name: "Jane Doe", id: "002", age: 25, status: "Not Pending" },
];

let totalCompleted: number = 0;
let totalPending: number = users.filter(user => user.status === "Pending").length;
let resolvedPending: number = 0;

// Function to render users in the table
function renderUsers(users: User[]): void {
    const userTableBody = document.getElementById('userTableBody') as HTMLElement;
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
                <button class="btn btn-success btn-sm" onclick="completeUser(${index})">Complete</button>
            </td>
        </tr>`;
        userTableBody.innerHTML += row;
    });
    updateCounters();
}

// Function to delete a user and add to completed list
function completeUser(index: number): void {
    const completedUser: User = users.splice(index, 1)[0];
    completedUser.time = new Date().toLocaleString();
    totalCompleted++;
    renderUsers(users);

    // Store completed user in local storage
    const completedUsers: User[] = JSON.parse(localStorage.getItem('completedUsers') || '[]');
    completedUsers.push(completedUser);
    localStorage.setItem('completedUsers', JSON.stringify(completedUsers));
}

// Function to add a new user
function addUser(event: Event): void {
    event.preventDefault();
    const name = (document.getElementById('userName') as HTMLInputElement).value;
    const id = (document.getElementById('userId') as HTMLInputElement).value;
    const age = parseInt((document.getElementById('userAge') as HTMLInputElement).value, 10);
    users.push({ name, id, age, status: "Not Pending" });
    renderUsers(users);
    closeAddUserModal();
}

// Function to pend a user
function pendUser(index: number): void {
    users[index].status = "Pending";
    totalPending++;
    renderUsers(users);
}

// Function to resolve a pending user
function resolvePendingUser(index: number): void {
    users[index].status = "Resolved Pending";
    totalPending--;
    resolvedPending++;
    renderUsers(users);
}

// Function to filter users based on the search input
function filterUsers(): void {
    const searchValue = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchValue) ||
        user.id.toLowerCase().includes(searchValue) ||
        user.age.toString().toLowerCase().includes(searchValue) ||
        user.status.toLowerCase().includes(searchValue)
    );
    renderUsers(filteredUsers);
}

// Function to update counters for total completed, pending, and resolved pending
function updateCounters(): void {
    (document.getElementById('totalCompleted') as HTMLElement).innerText = totalCompleted.toString();
    (document.getElementById('totalPending') as HTMLElement).innerText = totalPending.toString();
    (document.getElementById('resolvedPending') as HTMLElement).innerText = resolvedPending.toString();
}

// Functions to open and close Add User Modal
function openAddUserModal(): void {
    (document.getElementById('addUserModal') as HTMLElement).style.display = "block";
}

function closeAddUserModal(): void {
    (document.getElementById('addUserModal') as HTMLElement).style.display = "none";
}

// Save the state before navigating away
function saveState(): void {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('totalCompleted', totalCompleted.toString());
    localStorage.setItem('totalPending', totalPending.toString());
    localStorage.setItem('resolvedPending', resolvedPending.toString());
}

(document.querySelector('a[href="completed.html"]') as HTMLElement).addEventListener('click', saveState);

// Load the state when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    const savedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const savedTotalCompleted = localStorage.getItem('totalCompleted');
    const savedTotalPending = localStorage.getItem('totalPending');
    const savedResolvedPending = localStorage.getItem('resolvedPending');

    if (savedUsers.length > 0) {
        users.length = 0; // Clear the existing users array
        users.push(...savedUsers); // Load saved users
        totalCompleted = parseInt(savedTotalCompleted || '0', 10);
        totalPending = parseInt(savedTotalPending || '0', 10);
        resolvedPending = parseInt(savedResolvedPending || '0', 10);
        renderUsers(users);
    }
});

// Initial rendering of users
renderUsers(users);
