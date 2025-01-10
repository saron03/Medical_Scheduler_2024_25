// Define User Interface
interface User {
  user_id: number;
  username: string;
  email: string;
  password?: string;
  role: { role_id: number; name: string };
  created_at: string;
  updated_at?: string;
}

// Fetch the current user based on the token
const fetchCurrentUser = async (): Promise<User | undefined> => {
  const token = localStorage.getItem("jwtToken"); // Retrieve token from localStorage
  if (!token) {
    console.error("Authorization token not found.");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/api/v1/users/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }

    const currentUser: User = await response.json();
    console.log("Current user fetched:", currentUser);
    return currentUser;
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
};

// Render the profile for the current user
const renderProfile = (user: User): void => {
  const profileSection = document.getElementById("profile") as HTMLElement;
  const userName = document.getElementById("user-info") as HTMLElement | null;
  if (!profileSection) {
    console.error("Profile section element not found.");
    return;
  }

  if (user) {
    userName.innerHTML = `
          <img src="imgs/profile.png" alt="Profile Picture" />
          <h3>${user.username}</h3>
        `;
    profileSection.innerHTML = `
        <img src="imgs/profile.png" alt="Profile Picture" />
        <h3>${user.username}</h3>
        <p>Role: ${user.role.name}</p>
        <p>Email: ${user.email}</p>
        <p>Created At: ${new Date(user.created_at).toLocaleString()}</p>
      `;
  } else {
    userName.innerHTML = `<h3>User Not Found or Inactive</h3>`;
    profileSection.innerHTML = `<h3>User not found.</h3>`;
  }
};

// Edit the profile for the current user
const editProfile = async (user: User): Promise<void> => {
  const editProfileForm = document.getElementById(
    "edit-profile"
  ) as HTMLFormElement;
  const profileSection = document.getElementById("profile") as HTMLElement;

  if (!editProfileForm || !profileSection) {
    console.error("Edit profile form or profile section element not found.");
    return;
  }

  editProfileForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(editProfileForm);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate password fields
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation password do not match.");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("Authorization token not found.");
      return;
    }

    try {
      // Prepare updated data
      const updatedData: { email?: string; username?: string; password?: string } = {
        email: email || undefined,
        username: username || undefined,
        ...(newPassword && { password: newPassword }), // Include password only if provided
      };

      // Update the user profile
      const updateResponse = await fetch(
        `http://localhost:4000/api/v1/users/${user.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }

      const updatedUser = await updateResponse.json();
      console.log("Profile updated successfully:", updatedUser);

      // Render the updated profile
      renderProfile(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      profileSection.innerHTML = `<h3>Error updating profile. Please try again later.</h3>`;
    }
  });
};

// Initialize the application
const init = async (): Promise<void> => {
  const currentUser = await fetchCurrentUser();
  if (!currentUser) {
    console.error("Current user could not be loaded.");
    return;
  }

  
const loginbtn= document.getElementById("login-btn") as HTMLImageElement | null;
const signupbtn= document.getElementById("signup-btn") as HTMLImageElement | null;
  const editProfileButton = document.getElementById(
    "edit-profile-button"
  ) as HTMLButtonElement | null;

  if (loginbtn) {
    loginbtn.addEventListener("click", () => renderProfile(currentUser));
  } else {
    console.error("Profile button element not found.");
  }

  if (signupbtn) {
    signupbtn.addEventListener("click", () => renderProfile(currentUser));
  } else {
    console.error("Profile button element not found.");
  }

  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => editProfile(currentUser));
  } else {
    console.error("Edit profile button element not found.");
  }
};

init();
