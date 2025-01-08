interface User {
    name: string;
    id: string;
    age: number;
    status: string;
    time?: string;
}

// Sample data
const users: User[] = [
    { name: "John Doe", id: "001", age: 30, status: "Not Pending" },
    { name: "Jane Doe", id: "002", age: 25, status: "Not Pending" },
];

let totalCompleted: number = 0;
let totalPending: number = users.filter(user => user.status === "pending").length;
let resolvedPending: number = 0;

// Renders the queue database in a table
function renderUsers(users: User[]): void {
    const userTableBody = document.getElementById('userTableBody') as HTMLElement;
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const rowClass = user.status.toLocaleLowerCase() === "pending" ? "pending" : (user.status === "Resolved Pending" ? "resolved" : "");
        const row = `<tr class="${rowClass}">
            <td>${user.name}</td>
            <td>${user.id}</td>
            <td>${user.age}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn btn-secondary btn-sm pend-btn" onclick="pendUser(${index})">${user.status.toLowerCase() === "pending" ? "unpend" : "pend"}</button>
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
}

// Pends users
function pendUser(index: number): void {
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


// Placeholder function to simulate fetching users from the database
// function fetchUsersFromDatabase(): Promise<User[]> {
//     // Replace this with actual database fetching logic
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(users);
//         }, 1000);
//     });
// }

renderUsers(users)