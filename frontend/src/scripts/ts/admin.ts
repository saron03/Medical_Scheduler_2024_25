interface User {
  user_id: number;
  name: string;
  email: string;
  accountStatus: string;
  role: { name: string };
}

// Sample data (initially empty)
let employees: User[] = [];
let totalDoctors: number = 0;
let totalReceptionists: number = 0;
let restrictedAccounts: number = 0;

// Fetches and renders the users from the API
document.addEventListener("DOMContentLoaded", function () {
  const userListElement = document.getElementById("userList");
  const userTableBody = document.getElementById("userTableBody") as HTMLElement;

  // Fetch the list of users
  fetch("http://localhost:4000/api/v1/users")
    .then((response) => response.json())
    .then((users: User[]) => {
      // Filter users to show only Receptionists and Doctors
      employees = users.filter(
        (user) =>
          user.role.name === "Receptionist" || user.role.name === "Doctor"
      );

      // Update the counters based on the fetched users
      totalDoctors = employees.filter(
        (user) => user.role.name === "Doctor"
      ).length;
      totalReceptionists = employees.filter(
        (user) => user.role.name === "Receptionist"
      ).length;
      restrictedAccounts = employees.filter(
        (user) => user.accountStatus === "restricted"
      ).length;

      // Render the users
      renderUsers(employees);
    })
    .catch((error) => console.error("Error fetching users:", error));

  // Renders the user table
  function renderUsers(employees: User[]): void {
    userTableBody.innerHTML = "";
    employees.forEach((user) => {
      const rowClass = user.accountStatus === "restricted" ? "restricted" : "";
      const row = `<tr class="${rowClass}">
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.user_id}</td> 
          <td>${user.role.name}</td>
          <td>
              <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.user_id})">Delete</button>
          </td>
      </tr>`;
      userTableBody.innerHTML += row;
    });
    updateCounters();
  }

  // Implements search functionality
  function filterUsers(): void {
    const searchValue = (
      document.getElementById("searchInput") as HTMLInputElement
    ).value.toLowerCase();
    const filteredUsers = employees.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.accountStatus.toLowerCase().includes(searchValue) ||
        user.role.name.toLowerCase().includes(searchValue)
    );
    renderUsers(filteredUsers);
  }

  // Updates the counters for total doctors, receptionists, and restricted accounts
  function updateCounters(): void {
    (document.getElementById("totalDoctors") as HTMLElement).innerText =
      totalDoctors.toString();
    (document.getElementById("totalReceptionists") as HTMLElement).innerText =
      totalReceptionists.toString();
    (document.getElementById("restrictedAccounts") as HTMLElement).innerText =
      restrictedAccounts.toString();
  }

  // Initial rendering of users
  renderUsers(employees);

  // Delete function defined globally
  window.deleteUser = function deleteUser(userId: number): void {
    fetch(`http://localhost:4000/api/v1/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("User deleted successfully.");
          employees = employees.filter((user) => user.user_id !== userId); // Remove user from employees
          renderUsers(employees); // Re-render the updated list
        } else {
          alert("Failed to delete user.");
        }
      })
      .catch((error) => {
        alert("Error deleting user.");
        console.error("Error deleting user:", error);
      });
  };
});

// Search input event listener
document.getElementById("searchInput")?.addEventListener("input", filterUsers);
