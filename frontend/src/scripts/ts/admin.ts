interface User {
    name: string;
    email: string;
    accountStatus: string;
    role: string;
}

// Sample data
const users: User[] = [
    { name: "Dr. John Doe", email: "johndoe@example.com", accountStatus: "active", role: "doctor" },
    { name: "Jane Doe", email: "janedoe@example.com", accountStatus: "restricted", role: "receptionist" },
    // Add more sample users as needed
];

let totalDoctors: number = users.filter(user => user.role === "doctor").length;
let totalReceptionists: number = users.filter(user => user.role === "receptionist").length;
let restrictedAccounts: number = users.filter(user => user.accountStatus === "restricted").length;

// Renders the user table
function renderUsers(users: User[]): void {
    const userTableBody = document.getElementById('userTableBody') as HTMLElement;
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const rowClass = user.accountStatus === "restricted" ? "restricted" : "";
        const row = `<tr class="${rowClass}">
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.accountStatus}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
                <button class="btn btn-warning btn-sm" onclick="restrictUser(${index})">${user.accountStatus === "restricted" ? "Unrestrict" : "Restrict"}</button>
            </td>
        </tr>`;
        userTableBody.innerHTML += row;
    });
    updateCounters();
}

// Deletes a user
function deleteUser(index: number): void {
    const deletedUser = users.splice(index, 1)[0];
    if (deletedUser.role === "doctor") {
        totalDoctors--;
    } else if (deletedUser.role === "receptionist") {
        totalReceptionists--;
    }
    if (deletedUser.accountStatus === "restricted") {
        restrictedAccounts--;
    }
    renderUsers(users);
}

// Restricts or unrestricts a user
function restrictUser(index: number): void {
    const user = users[index];
    if (user.accountStatus === "active") {
        user.accountStatus = "restricted";
        restrictedAccounts++;
    } else {
        user.accountStatus = "active";
        restrictedAccounts--;
    }
    renderUsers(users);
}

// Implements search functionality
function filterUsers(): void {
    const searchValue = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchValue) || 
        user.email.toLowerCase().includes(searchValue) ||
        user.accountStatus.toLowerCase().includes(searchValue) ||
        user.role.toLowerCase().includes(searchValue)
    );
    renderUsers(filteredUsers);
}

// Updates the counters for total doctors, receptionists, and restricted accounts
function updateCounters(): void {
    (document.getElementById('totalDoctors') as HTMLElement).innerText = totalDoctors.toString();
    (document.getElementById('totalReceptionists') as HTMLElement).innerText = totalReceptionists.toString();
    (document.getElementById('restrictedAccounts') as HTMLElement).innerText = restrictedAccounts.toString();
}

// Initial rendering of users
document.addEventListener('DOMContentLoaded', () => {
    renderUsers(users);
});
