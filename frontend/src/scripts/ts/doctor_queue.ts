interface User {
    name: string;
    id: string;
    age: number;
    status: string;
    time?: string;
}

// Sample data
const users: User[] = [
    { name: "John Doe", id: "001", age: 30, status: "not pending" },
    { name: "Jane Doe", id: "002", age: 25, status: "not pending" },
];

let totalCompleted: number = 0;
let totalPending: number = users.filter(user => user.status === "pending").length;
let resolvedPending: number = 0;

// Renders the queue database in a table
function renderUsers(users: User[]): void {
    const userTableBody = document.getElementById('userTableBody') as HTMLElement;
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const rowClass = user.status === "pending" ? "pending" : (user.status === "Resolved Pending" ? "resolved" : "");
        const row = `<tr class="${rowClass}">
            <td>${user.name}</td>
            <td>${user.id}</td>
            <td>${user.age}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn btn-secondary btn-sm pend-btn" onclick="pendUser(${index})">${user.status === "pending" ? "unpend" : "pend"}</button>
                <button class="btn btn-success btn-sm" onclick="completeUser(${index})">Complete</button>
            </td>
        </tr>`;
        userTableBody.innerHTML += row;
    });
    addPendEventListeners();
    updateCounters();
}

// Adds event listeners to all pend buttons
function addPendEventListeners(): void {
    const pendButtons = document.querySelectorAll('.pend-btn');
    pendButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (button.textContent === "pend") {
                button.textContent = "unpend";
            } else {
                button.textContent = "pend";
            }
        });
    });
}

// Deletes users from queue table when service is completed
function completeUser(index: number): void {
    const completedUser = users.splice(index, 1)[0];
    completedUser.time = new Date().toLocaleString();
    totalCompleted++;
    renderUsers(users);

    // It caches serviced users for review if needed
    const completedUsers: User[] = JSON.parse(localStorage.getItem('completedUsers') || '[]');
    completedUsers.push(completedUser);
    localStorage.setItem('completedUsers', JSON.stringify(completedUsers));
}

// Pends users
function pendUser(index: number): void {
    if (users[index].status === "not pending") {
        users[index].status = "pending";
        totalPending++;
    }
    else {
        users[index].status = "not pending";
        totalPending--;
    }
    renderUsers(users);
}

// Listens for an update from receptionist side
function resolvePendingUser(index: number): void {
    users[index].status = "Resolved Pending";
    totalPending--;
    resolvedPending++;
    renderUsers(users);
}

// Implements search mechanism
function filterUsers(): void {
    const searchValue = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().startsWith(searchValue) || 
        user.id.toLowerCase().startsWith(searchValue) ||
        user.age.toString().toLowerCase().startsWith(searchValue) ||
        user.status.toLowerCase().startsWith(searchValue)
    );
    renderUsers(filteredUsers);
}

// Function to update counters for total completed, pending, and resolved pending
function updateCounters(): void {
    (document.getElementById('totalCompleted') as HTMLElement).innerText = totalCompleted.toString();
    (document.getElementById('totalPending') as HTMLElement).innerText = totalPending.toString();
    (document.getElementById('resolvedPending') as HTMLElement).innerText = resolvedPending.toString();
}

// Save the state before navigating away
function saveState(): void {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('totalCompleted', totalCompleted.toString());
    localStorage.setItem('totalPending', totalPending.toString());
    localStorage.setItem('resolvedPending', resolvedPending.toString());
}

(document.querySelector('a[href="completed.html"]') as HTMLAnchorElement).addEventListener('click', saveState);

// Load the state when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const savedTotalCompleted = localStorage.getItem('totalCompleted');
    const savedTotalPending = localStorage.getItem('totalPending');
    const savedResolvedPending = localStorage.getItem('resolvedPending');

    if (savedUsers.length > 0) {
        users.length = 0; // Clear the existing users array
        users.push(...savedUsers); // Load saved users
    }

    if (savedTotalCompleted !== null) {
        totalCompleted = parseInt(savedTotalCompleted, 10);
    }

    if (savedTotalPending !== null) {
        totalPending = parseInt(savedTotalPending, 10);
    }

    if (savedResolvedPending !== null) {
        resolvedPending = parseInt(savedResolvedPending, 10);
    }

    renderUsers(users);
});

// Initial rendering of users
renderUsers(users);
