// Interfaces for the Patient and Doctor Models
export interface Patient {
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

export interface Doctor {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface Queue {
  status: number; // 1 - Not Pending, 2 - Pending, 3 - Resolved Pending
  patient: Patient;
  doctor: Doctor;
  queue_id: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  accountStatus: string;
  role: { name: string };
}

// Fetch Queues
export const fetchQueues = async (): Promise<Queue[]> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/queues");
    const data: Queue[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching queues:", error);
    throw error;
  }
};

// Fetch Users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/users");
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch User Details
export const fetchUserDetails = async (queue_id: number): Promise<Queue> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/queues/${queue_id}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch user details: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Delete User from Queue
export const deleteUserFromQueue = async (queue_id: number): Promise<void> => {
  try {
    await fetch(`http://localhost:4000/api/v1/queues/${queue_id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Delete User
export const deleteUser = async (user_id: number): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/users/${user_id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Update User Status in Queue
export const updateUserStatus = async (
  queue_id: number,
  newStatus: number
): Promise<void> => {
  try {
    await fetch(`http://localhost:4000/api/v1/queues/${queue_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

// Register Patient
export const registerPatient = async (
  patientData: Partial<Patient>,
  token: string
): Promise<Patient> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patientData),
    });

    if (response.status !== 201) {
      throw new Error("Failed to register patient");
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering patient:", error);
    throw error;
  }
};

// Add Patient to Queue
export const addToQueue = async (
  queueData: { patient_id: number; doctor_id: number; status: number },
  token: string
): Promise<Queue> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/queues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queueData),
    });

    if (response.status !== 201) {
      throw new Error("Failed to add patient to queue");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding patient to queue:", error);
    throw error;
  }
};

// Login User
export const loginUser = async (loginData: {
  email: string;
  password: string;
  role: string;
}): Promise<{ token: string }> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) throw new Error("Login failed");

    return await response.json();
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Signup User
export const signupUser = async (userData: {
  email: string;
  username: string;
  password: string;
  roleId: number;
}): Promise<{ token: string }> => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/v1/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) throw new Error("Signup failed");

    return await response.json();
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};
