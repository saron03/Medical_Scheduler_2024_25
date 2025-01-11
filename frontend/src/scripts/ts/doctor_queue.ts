import {
  fetchQueues,
  deleteUserFromQueue,
  fetchUserDetails,
  updateUserStatus,
  Queue,
} from './apis/api';

// Check for JWT token on load
const checkJwtToken = (): void => {
  const jwtToken = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
  if (!jwtToken) {
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
  }
};

// Call the checkJwtToken function on load
checkJwtToken();

// Global array for users
let users: Queue[] = [];
let totalCompleted: number = 0;
let pending: number = 0;
let resolvedPending: number = 0;

// Sample data
const fetchData = async (): Promise<void> => {
  try {
    const data: Queue[] = await fetchQueues();
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

// Deletes users from queue table when service is completed
const completeUser = async (index: number): Promise<void> => {
  const user = users[index];
  if (user.status === 2) {
    pending--;
  } else if (user.status === 3) {
    resolvedPending--;
  }
  try {
    await deleteUserFromQueue(user.queue_id);
    users.splice(index, 1);
    totalCompleted++;
    renderUsers(users);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Pends users
const pendUser = async (index: number): Promise<void> => {
  const user = users[index];

  try {
    // Step 1: Fetch the current queue details from the backend
    const currentQueue = await fetchUserDetails(user.queue_id);

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
    await updateUserStatus(currentQueue.queue_id, newStatus);

    // Step 4: Update the local user object and re-render
    user.status = newStatus;
    renderUsers(users);
  } catch (error) {
    console.error("Error resolving user:", error);
  }
};

// Implements search mechanism
function filterUsers(): void {
  const searchValue = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value.toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      user.patient.first_name.toLowerCase().startsWith(searchValue) ||
      user.patient.last_name.toLowerCase().startsWith(searchValue) ||
      String(user.patient.patient_id).startsWith(searchValue) ||
      user.patient.date_of_birth.toLowerCase().startsWith(searchValue) ||
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

fetchData();