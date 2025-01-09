// Interfaces for the Patient and Doctor Models
interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  address: string;
  created_at: string;
  updated_at: string;
}

interface Doctor {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
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
let activeEntries: number = 0;
let pendingEntries: number = 0;

// Fetch data from the API
const fetchData = async (): Promise<void> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/queues");
    const data: Queue[] = await response.json();
    users = data;
    activeEntries = users.length;
    pendingEntries = users.filter((user) => user.status === 2).length;
    renderUsers(users);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Render the users in the table
const renderUsers = (users: Queue[]): void => {
  const userTableBody = document.getElementById(
    "userTableBody"
  ) as HTMLTableSectionElement;
  userTableBody.innerHTML = "";

  users.forEach((user, index) => {
    const rowClass =
      user.status === 2 ? "pending" : user.status === 3 ? "resolved" : "";
    const resolveButtonDisabled = user.status !== 2;
    const row = `
        <tr class="${rowClass}">
          <td>${user.patient.first_name} ${user.patient.last_name}</td>
          <td>${new Date(user.created_at).toLocaleString()}</td>
          <td>${
            user.status === 1
              ? "Not Pending"
              : user.status === 2
              ? "Pending"
              : "Resolved Pending"
          }</td>
          <td>
            <button style="border: none; color: white;" class="btn btn-sm" onclick="resolvePendingUser(${index})" ${
      resolveButtonDisabled ? "disabled" : ""
    }>Resolve Pending</button>
            <button style="border: none; color: white;" class="btn btn-sm" onclick="deleteUser(${index})">Delete</button>
          </td>
        </tr>`;
    userTableBody.innerHTML += row;
  });

  updateCounters();
};

// Update counters for active and pending entries
const updateCounters = (): void => {
  document.getElementById("activeEntries")!.innerText =
    activeEntries.toString();
  document.getElementById("pendingEntries")!.innerText =
    pendingEntries.toString();
};

// Resolve pending user
const resolvePendingUser = async (index: number): Promise<void> => {
  const user = users[index];
  if (user.status === 2) {
    user.status = 3;
    try {
      await fetch(`http://localhost:4000/api/v1/queues/${user.queue_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: 3 }),
      });
      pendingEntries--;
      renderUsers(users);
    } catch (error) {
      console.error("Error resolving user:", error);
    }
  }
};

// Delete user from the queue
const deleteUser = async (index: number): Promise<void> => {
  const user = users[index];
  if (user.status === 2) {
    pendingEntries--;
  }
  try {
    await fetch(`http://localhost:4000/api/v1/queues/${user.queue_id}`, {
      method: "DELETE",
    });
    users.splice(index, 1);
    activeEntries--;
    renderUsers(users);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Add a new user to the queue
const addUser = async (event: Event): Promise<void> => {
  event.preventDefault();

  const firstName = (document.getElementById("firstName") as HTMLInputElement)
    .value;
  const lastName = (document.getElementById("lastName") as HTMLInputElement)
    .value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phoneNumber = (
    document.getElementById("phoneNumber") as HTMLInputElement
  ).value;
  const dob = (document.getElementById("dob") as HTMLInputElement).value;
  const gender = (document.getElementById("gender") as HTMLSelectElement).value;
  const address = (document.getElementById("address") as HTMLInputElement)
    .value;

  const newUser: Queue = {
    status: 1,
    patient: {
      patient_id: 0,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      date_of_birth: dob,
      gender: gender,
      address: address,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    doctor: {
      user_id: 0,
      username: "",
      email: "",
      password: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    queue_id: Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const response = await fetch("http://localhost:4000/api/v1/queues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data: Queue = await response.json();
    users.push(data);
    activeEntries++;
    renderUsers(users);
    closeAddUserModal(); // Close the modal after adding a user
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Search and filter users
const filterUsers = (): void => {
  const searchValue = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value.toLowerCase();
  const filteredUsers = users.filter((user) => {
    return (
      user.patient.first_name.toLowerCase().includes(searchValue) ||
      user.patient.last_name.toLowerCase().includes(searchValue) ||
      new Date(user.created_at)
        .toLocaleString()
        .toLowerCase()
        .includes(searchValue) ||
      (user.status === 1
        ? "Not Pending"
        : user.status === 2
        ? "Pending"
        : "Resolved Pending"
      )
        .toLowerCase()
        .includes(searchValue)
    );
  });
  renderUsers(filteredUsers);
};

// Modal functions
const openAddUserModal = (): void => {
  document.getElementById("addUserModal")!.style.display = "block";
};

const closeAddUserModal = (): void => {
  document.getElementById("addUserModal")!.style.display = "none";
};

// Initialize the page by fetching users
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
