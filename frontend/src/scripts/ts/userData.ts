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
  const userInfo = document.getElementById("user-info") as HTMLElement;
  if (!profileSection || !userInfo) {
    console.error("Profile section element not found.");
    return;
  }

  if (user) {
    userInfo.innerHTML = `
                  <img src="imgs/profile.png" alt="Profile Picture">
                  <h3>${user.username}</h3>`;
    profileSection.innerHTML = `
      <img src="imgs/profile.png" alt="Profile Picture">
        <h3>${user.username}</h3>
        <p>Role: ${user.role.name}</p>
        <p>Email: ${user.email}</p>
        <p>Created At: ${new Date(user.created_at).toLocaleString()}</p>
      `;
  } else {
    profileSection.innerHTML = `<h3>User not found.</h3>`;
    userInfo.innerHTML = `<h3>User not found.</h3>`;
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
    const username = formData.get("name") as string;
    const email = formData.get("email") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate password fields
    if (!newPassword && newPassword !== confirmPassword) {
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
      const updatedData = {
        username: username,
        email: email,
        password: newPassword,
      };

      // Update the user profile
      const updateResponse = await fetch(
        `http://localhost:4000/api/v1/users/${user.user_id}`,
        {
          method: "PUT",
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
  }

  const profileButton = document.getElementById(
    "profile-button"
  ) as HTMLButtonElement | null;
  const editProfileButton = document.getElementById(
    "edit-profile-button"
  ) as HTMLButtonElement | null;
  const menuButton = document.getElementById(
    "menu-btn"
  ) as HTMLButtonElement | null;
  const Loginbutton = document.getElementById(
    "login-btn"
  ) as HTMLButtonElement | null;
  const signupbutton = document.getElementById(
    "signupbtn"
  ) as HTMLButtonElement | null;
  if (profileButton) {
    profileButton.addEventListener("click", () => renderProfile(currentUser));
  } else {
    console.error("Profile button element not found.");
  }

  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => editProfile(currentUser));
  } else {
    console.error("Edit profile button element not found.");
  }
  if (menuButton) {
    menuButton.addEventListener("click", () => renderProfile(currentUser));
  } else {
    console.error("menu button element not found.");
  }
  if (signupbutton) {
    signupbutton.addEventListener("click", () => renderProfile(currentUser));
  } else {
    console.error("sign button element not found.");
  }
  if (Loginbutton) {
    Loginbutton.addEventListener("click", () => renderProfile(currentUser));
  } else {
    console.error("login button element not found.");
  }
};

init();
