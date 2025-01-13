import { fetchUsers, deleteUser, User } from "./apis/api";

// Check for JWT token on load
const checkJwtToken = (): void => {
  const jwtToken =
    localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
  if (!jwtToken) {
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
  }
};

// Call the checkJwtToken function on load
checkJwtToken();

// Sample data (initially empty)
let employees: User[] = [];
let totalDoctors: number = 0;
let totalReceptionists: number = 0;

// Fetch data from the API
const fetchEmployeesData = async (): Promise<void> => {
  try {
    const users: User[] = await fetchUsers();

    // Filter users to show only Receptionists and Doctors
    employees = users.filter(
      (user) => user.role.name === "Receptionist" || user.role.name === "Doctor"
    );

    // Update the counters based on the fetched users
    totalDoctors = employees.filter(
      (user) => user.role.name === "Doctor"
    ).length;
    totalReceptionists = employees.filter(
      (user) => user.role.name === "Receptionist"
    ).length;

    // Render the filtered employees
    renderEmployees(employees);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Render employees
const renderEmployees = (employees: User[]): void => {
  const userTableBody = document.getElementById(
    "userTableBody"
  ) as HTMLTableSectionElement;
  userTableBody.innerHTML = "";

  employees.forEach((user, index) => {
    const row = `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.user_id}</td>
        <td>${user.role.name}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
        </td>
      </tr>`;
    userTableBody.innerHTML += row;
  });

  updateEmployeeCounters();
};

// Delete User
const deleteEmployee = async (index: number): Promise<void> => {
  const userToBeDeleted = employees[index];

  if (!userToBeDeleted) {
    return;
  }

  try {
    await deleteUser(userToBeDeleted.user_id);

    if (userToBeDeleted.role.name === "Doctor") {
      totalDoctors--;
    } else if (userToBeDeleted.role.name === "Receptionist") {
      totalReceptionists--;
    }

    employees.splice(index, 1);
    renderEmployees(employees);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Filter employees
function filterEmployees(): void {
  const searchValue = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value.toLowerCase();

  const filteredUsers = employees.filter(
    (user) =>
      user.username.toLowerCase().startsWith(searchValue) ||
      user.email.toLowerCase().startsWith(searchValue) ||
      user.role.name.toLowerCase().startsWith(searchValue)
  );

  renderEmployees(filteredUsers);
}

// Update counters
function updateEmployeeCounters(): void {
  (document.getElementById("totalDoctors") as HTMLElement).innerText =
    totalDoctors.toString();
  (document.getElementById("totalReceptionists") as HTMLElement).innerText =
    totalReceptionists.toString();
}

// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser(): void {
  localStorage.removeItem("jwtToken");
  sessionStorage.removeItem("jwtToken");

  window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
}

// Attach the logout function to the logout button
document.getElementById("logout")?.addEventListener("click", logoutUser);

// Call the function to fetch and render employees on page load
fetchEmployeesData();
