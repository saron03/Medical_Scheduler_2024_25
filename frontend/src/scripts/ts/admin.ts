// Define User interface
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

// Fetch data from the API
const fetchEmployeesData = async (): Promise<void> => {
  try {
    console.log("Fetching employees data...");
    const response = await fetch("http://localhost:4000/api/v1/users");
    const users: User[] = await response.json();

    console.log("Fetched users:", users);

    // Filter users to show only Receptionists and Doctors
    employees = users.filter(
      (user) => user.role.name === "Receptionist" || user.role.name === "Doctor"
    );

    console.log("Filtered employees:", employees);

    // Update the counters based on the fetched users
    totalDoctors = employees.filter(
      (user) => user.role.name === "Doctor"
    ).length;
    totalReceptionists = employees.filter(
      (user) => user.role.name === "Receptionist"
    ).length;

    console.log("Total Doctors:", totalDoctors);
    console.log("Total Receptionists:", totalReceptionists);

    // Render the filtered employees
    renderEmployees(employees);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Render employees
const renderEmployees = (employees: User[]): void => {
  const userTableBody = document.getElementById("userTableBody") as HTMLTableSectionElement;
  userTableBody.innerHTML = "";

  employees.forEach((user, index) => {
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.user_id}</td>
        <td>${user.role.name}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
        </td>
      </tr>`;
    userTableBody.innerHTML += row;
  });

  console.log("Employees rendered on the table:", employees);

  updateEmployeeCounters();
};

// Delete User
const deleteEmployee = async (index: number): Promise<void> => {
  console.log("Delete button clicked, index:", index);
  console.log("Current employees array:", employees);

  const userToBeDeleted = employees[index];
  console.log("Attempting to delete user:", userToBeDeleted);

  if (!userToBeDeleted) {
    console.error("User not found at index:", index);
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/api/v1/users/${userToBeDeleted.user_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    if (userToBeDeleted.role.name === "Doctor") {
      totalDoctors--;
    } else if (userToBeDeleted.role.name === "Receptionist") {
      totalReceptionists--;
    }

    employees.splice(index, 1);
    renderEmployees(employees);
    console.log("Updated Employees List:", employees);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Filter employees
function filterEmployees(): void {
  const searchValue = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value.toLowerCase();
  console.log("Filtering employees with search value:", searchValue);

  const filteredUsers = employees.filter(
    (user) =>
      user.name.toLowerCase().startsWith(searchValue) ||
      user.email.toLowerCase().startsWith(searchValue) ||
      user.role.name.toLowerCase().startsWith(searchValue)
  );
  
  console.log("Filtered users:", filteredUsers);
  renderEmployees(filteredUsers);
}

// Update counters
function updateEmployeeCounters(): void {
  (document.getElementById("totalDoctors") as HTMLElement).innerText =
    totalDoctors.toString();
  (document.getElementById("totalReceptionists") as HTMLElement).innerText =
    totalReceptionists.toString();
  console.log("Employee counters updated: Doctors", totalDoctors, "Receptionists", totalReceptionists);
}

// Call the function to fetch and render employees on page load
fetchEmployeesData();

// const deleteEmployee = async (index: number): Promise<void> => {
//   const userToBeDeleted = employees[index];

//   try {
//     await fetch(`http://localhost:4000/api/v1/users/${userToBeDeleted.user_id}`, {
//       // Check userId or user_id
//       method: "DELETE",
//     });
//     if (userToBeDeleted.role.name === "Doctor") {
//       totalDoctors--;
//     } else {
//       totalReceptionists--;
//     }
//     // employees = employees.filter((user) => user !== userToBeDeleted);
//     employees.splice(index, 1);
//     renderEmployees(employees);
//   } catch (error) {
//     console.error("Error deleting user:", error);
//   }
// };

// const deleteUser = async (index: number): Promise<void> => {
//   const user = users[index];
//   if (user.status === 2) {
//     pendingEntries--;
//   }
//   try {
//     await fetch(`http://localhost:4000/api/v1/queues/${user.queue_id}`, {
//       method: "DELETE",
//     });
//     users.splice(index, 1);
//     activeEntries--;
//     renderUsers(users);
//   } catch (error) {
//     console.error("Error deleting user:", error);
//   }
// };


// Nati

// Fetches and renders the users from the API
// document.addEventListener("DOMContentLoaded", function () {
//   const userListElement = document.getElementById("userList") as HTMLElement;
//   const userTableBody = document.getElementById("userTableBody") as HTMLElement;

//   // Fetch the list of users
//   fetch("http://localhost:4000/api/v1/users")
//     .then((response) => response.json())
//     .then((users: User[]) => {
//       // Filter users to show only Receptionists and Doctors
//       employees = users.filter(
//         (user) =>
//           user.role.name === "Receptionist" || user.role.name === "Doctor"
//       );

//       // Update the counters based on the fetched users
//       totalDoctors = employees.filter(
//         (user) => user.role.name === "Doctor"
//       ).length;
//       totalReceptionists = employees.filter(
//         (user) => user.role.name === "Receptionist"
//       ).length;
//       restrictedAccounts = employees.filter(
//         (user) => user.accountStatus === "restricted"
//       ).length;

//       // Render the users
//       renderUsers(employees);
//     })
//     .catch((error) => console.error("Error fetching users:", error));

//   // Renders the user table
//   function renderUsers(employees: User[]): void {
//     userTableBody.innerHTML = "";
//     employees.forEach((user) => {
//       const rowClass = user.accountStatus === "restricted" ? "restricted" : "";
//       const row = `<tr class="${rowClass}">
//           <td>${user.username}</td>
//           <td>${user.email}</td>
//           <td>${user.user_id}</td>
//           <td>${user.role.name}</td>
//           <td>
//               <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.user_id})">Delete</button>
//           </td>
//       </tr>`;
//       userTableBody.innerHTML += row;
//     });
//     updateCounters();
//   }

//   // Implements search functionality
//   function filterUsers(): void {
//     const searchValue = (
//       document.getElementById("searchInput") as HTMLInputElement
//     ).value.toLowerCase();
//     const filteredUsers = employees.filter(
//       (user) =>
//         user.name.toLowerCase().includes(searchValue) ||
//         user.email.toLowerCase().includes(searchValue) ||
//         user.accountStatus.toLowerCase().includes(searchValue) ||
//         user.role.name.toLowerCase().includes(searchValue)
//     );
//     renderUsers(filteredUsers);
//   }

//   // Updates the counters for total doctors, receptionists, and restricted accounts
//   function updateCounters(): void {
//     (document.getElementById("totalDoctors") as HTMLElement).innerText =
//       totalDoctors.toString();
//     (document.getElementById("totalReceptionists") as HTMLElement).innerText =
//       totalReceptionists.toString();
//     (document.getElementById("restrictedAccounts") as HTMLElement).innerText =
//       restrictedAccounts.toString();
//   }

//   // Initial rendering of users
//   renderUsers(employees);

//   // Delete function defined globally

//   window.deleteUser = function deleteUser(userId: number): void {
//     fetch(`http://localhost:4000/api/v1/users/${userId}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert("User deleted successfully.");
//           employees = employees.filter((user) => user.user_id !== userId); // Remove user from employees
//           renderUsers(employees); // Re-render the updated list
//         } else {
//           alert("Failed to delete user.");
//         }
//       })
//       .catch((error) => {
//         alert("Error deleting user.");
//         console.error("Error deleting user:", error);
//       });
//   };
// });

// // Search input event listener
// document.getElementById("searchInput")?.addEventListener("input", filterUsers);
