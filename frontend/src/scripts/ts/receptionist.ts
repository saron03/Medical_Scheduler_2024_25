// User interface to define the shape of user objects
interface User {
    name: string;
    dateTime: string;
    status: string;
}

// Sample data
let users: User[] = [
    { name: "John Doe", dateTime: new Date().toLocaleString(), status: "Not Pending" },
    { name: "Jane Doe", dateTime: new Date().toLocaleString(), status: "Not Pending" },
];

let activeEntries: number = users.length;
let pendingEntries: number = users.filter(user => user.status === "Pending").length;

// Renders the queue database in a table
function renderUsers(users: User[]): void {
    const userTableBody = document.getElementById('userTableBody') as HTMLTableSectionElement;
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const rowClass = user.status === "Pending" ? "pending" : (user.status === "Resolved Pending" ? "resolved" : "");
        const resolveButtonDisabled = user.status !== "Pending";
        const row = `
            <tr class="${rowClass}">
                <td>${user.name}</td>
                <td>${user.dateTime}</td>
                <td>${user.status}</td>
                <td>
                    <button style="border: none; color: white;" class="btn btn-sm" onclick="resolvePendingUser(${index})" ${resolveButtonDisabled ? 'disabled' : ''}>Resolve Pending</button>
                    <button style="border: none; color: white;" class="btn btn-sm" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>`;
        userTableBody.innerHTML += row;
    });
    updateCounters();
}

// Adds user to the queue
function addUser(event: Event): void {
    event.preventDefault();
    const userName = (document.getElementById('userName') as HTMLInputElement).value;
    // const userDob = (document.getElementById('userDob') as HTMLInputElement).value;
    // const userContact = (document.getElementById('userContact') as HTMLInputElement).value;
    // const userEmail = (document.getElementById('userEmail') as HTMLInputElement).value;
    // const userPassword = (document.getElementById('userPassword') as HTMLInputElement).value;
    
    const newUser: User = {
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
function deleteUser(index: number): void {
    const user = users[index];
    if (user.status === "Pending") {
        pendingEntries--;
    }
    users.splice(index, 1);
    activeEntries--;
    renderUsers(users);
}

// Listens for an update from receptionist side
function resolvePendingUser(index: number): void {
    users[index].status = "Resolved Pending";
    pendingEntries--;
    renderUsers(users);
}

// Implements search mechanism
function filterUsers(): void {
    const searchValue = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchValue) ||
        user.dateTime.toLowerCase().includes(searchValue) ||
        user.status.toLowerCase().includes(searchValue)
    );
    renderUsers(filteredUsers);
}

// Function to update counters for active and pending entries
function updateCounters(): void {
    (document.getElementById('activeEntries') as HTMLElement).innerText = activeEntries.toString();
    (document.getElementById('pendingEntries') as HTMLElement).innerText = pendingEntries.toString();
}

// Modal functions
function openAddUserModal(): void {
    (document.getElementById('addUserModal') as HTMLElement).style.display = 'block';
}

function closeAddUserModal(): void {
    (document.getElementById('addUserModal') as HTMLElement).style.display = 'none';
}

// Load the state when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderUsers(users);
});
