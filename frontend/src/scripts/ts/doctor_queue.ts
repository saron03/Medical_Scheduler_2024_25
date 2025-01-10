// Check for JWT token on load
const checkJwtToken = (): void => {
  const jwtToken = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
  if (!jwtToken) {
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
  }
};

// Call the checkJwtToken function on load
checkJwtToken();

interface User {
  name: string;
  id: string;
  age: number;
  status: string;
  time?: string;
}

interface Queue {
  status: number; // 1 - Not Pending, 2 - Pending, 3 - Resolved Pending
  patient: Patient;
  doctor: Doctor;
  queue_id: number;
  created_at: string;
  updated_at: string;
}

// Global array for users
let users: Queue[] = [];
let totalCompleted: number = 0;
let pending: number = 0;
let resolvedPending: number = 0;

// Sample data
const fetchData = async (): Promise<void> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/queues");
    const data: Queue[] = await response.json();
    users = data;
    pending = users.filter((user) => user.status === 2).length;
    resolvedPending = users.filter((user) => user.status === 3).length;
    renderUsers(users);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Renders the queue database in a table
function renderUsers(users: Queue[]): void {
  const userTableBody = document.getElementById("userTableBody") as HTMLElement;
  userTableBody.innerHTML = "";
  users.forEach((user, index) => {
    const rowClass =
      user.status === 2 ? "pending" : user.status === 3 ? "resolved" : "";
    const row = `<tr class="${rowClass}">
            <td>${user.patient.first_name} ${user.patient.last_name}</td>
            <td>${user.patient.patient_id}</td>
            <td>${user.patient.date_of_birth}</td>
            <td>${
              user.status === 2
                ? "Pending"
                : user.status === 3
                ? "Resolved Pending"
                : "Not Pending"
            }</td>
            <td>
                <button class="btn btn-secondary btn-sm pend-btn" onclick="pendUser(${index})">
                    ${
                      user.status === 2
                        ? "Unpend"
                        : user.status === 3
                        ? "Pend"
                        : "Pend"
                    }
                </button>
                <button class="btn btn-success btn-sm" onclick="completeUser(${index})">Complete</button>
            </td>
        </tr>`;
    userTableBody.innerHTML += row;
  });
  updateCounters();
}

// Adds event listeners to all pend buttons
// function addPendEventListeners(): void {
//     const pendButtons = document.querySelectorAll('.pend-btn');
//     pendButtons.forEach((button, index) => {
//         button.addEventListener('click', () => {
//             if (button.textContent === "pend") {
//                 button.textContent = "unpend";
//             } else {
//                 button.textContent = "pend";
//             }
//         });
//     });
// }

// Deletes users from queue table when service is completed
const completeUser = async (index: number): Promise<void> => {
  const user = users[index];
  if (user.status === 2) {
    pending--;
  } else if (user.status === 3) {
    resolvedPending--;
  }
  try {
    await fetch(`http://localhost:4000/api/v1/queues/${user.queue_id}`, {
      method: "DELETE",
    });
    users.splice(index, 1);
    totalCompleted++;
    renderUsers(users);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
// function completeUser(index: number): void {
//     const completedUser = users.splice(index, 1)[0];
//     completedUser.time = new Date().toLocaleString();
//     totalCompleted++;
//     renderUsers(users);
// }

// Pends users
const pendUser = async (index: number): Promise<void> => {
  const user = users[index];

  try {
    // Step 1: Fetch the current queue details from the backend
    const response = await fetch(
      `http://localhost:4000/api/v1/queues/${user.queue_id}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch user details: ${response.statusText}`);
    }
    const currentQueue: Queue = await response.json();

    // Step 2: Update the status based on current data
    let newStatus: number;
    if (currentQueue.status === 2) {
      newStatus = 1; // Move from Pending to Not Pending
      pending--;
    } else if (currentQueue.status === 3) {
      newStatus = 2; // Move from Resolved Pending to Pending
      resolvedPending--;
      pending++;
    } else {
      newStatus = 2; // Move from Not Pending to Pending
      pending++;
    }

    // Step 3: Send the updated status back to the server
    const putResponse = await fetch(
      `http://localhost:4000/api/v1/queues/${currentQueue.queue_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    if (!putResponse.ok) {
      throw new Error(
        `Failed to update user status: ${putResponse.statusText}`
      );
    }

    // Step 4: Update the local user object and re-render
    user.status = newStatus;
    renderUsers(users);
  } catch (error) {
    console.error("Error resolving user:", error);
  }
};

// function pendUser(index: number): void {
//     if (users[index].status.toLowerCase() === "not pending") {
//         users[index].status = "Pending";
//         totalPending++;
//     }
//     else {
//         users[index].status = "Not Pending";
//         totalPending--;
//     }
//     renderUsers(users);
// }

// Listens for an update from receptionist side

// function resolvePendingUser(index: number): void {
//     users[index].status = "Resolved Pending";
//     totalPending--;
//     resolvedPending++;
//     renderUsers(users);
// }

// Implements search mechanism
function filterUsers(): void {
  const searchValue = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value.toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      user.patient.name.toLowerCase().startsWith(searchValue) ||
      user.patient.id.toLowerCase().startsWith(searchValue) ||
      user.patient.age.toString().toLowerCase().startsWith(searchValue) ||
      user.status.toString().toLowerCase().startsWith(searchValue)
  );
  renderUsers(filteredUsers);
}

// Function to update counters for total completed, pending, and resolved pending
function updateCounters(): void {
  (document.getElementById("totalCompleted") as HTMLElement).innerText =
    totalCompleted.toString();
  (document.getElementById("totalPending") as HTMLElement).innerText =
    pending.toString();
  (document.getElementById("resolvedPending") as HTMLElement).innerText =
    resolvedPending.toString();
}
// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser(): void {
  localStorage.removeItem("jwtToken");
  sessionStorage.removeItem("jwtToken");

  window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
}
// Attach the logout function to the logout button
document.getElementById("logout")?.addEventListener("click", logoutUser);

// Placeholder function to simulate fetching users from the database
// function fetchUsersFromDatabase(): Promise<User[]> {
//     // Replace this with actual database fetching logic
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(users);
//         }, 1000);
//     });
// }

fetchData();
