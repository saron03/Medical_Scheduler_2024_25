
const profileButton = document.getElementById("profile-button") as HTMLButtonElement | null;
const editProfileButton = document.getElementById("edit-profile-button") as HTMLButtonElement | null;
const profileSection = document.getElementById("profile") as HTMLDivElement | null;
const editProfileForm = document.getElementById("edit-profile") as HTMLFormElement | null;

const profileUrl = "http://localhost:4000/api/v1/users/5"; // API route for profile

// Function to show the active profile
function showMyProfile(): void {
    if (!profileSection) {
        console.error("Profile section element not found.");
        return;
    }

    fetch(profileUrl)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if (data.accountStatus === "active") {
                profileSection.innerHTML = `
                    <h3>${data.username}</h3>
                    <p>Role: ${data.role.name}</p>
                    <p>Email: ${data.email}</p>
                    <p>Created At: ${new Date(data.created_at).toLocaleString()}</p>
                `;
            } else {
                profileSection.innerHTML = `<h3>Profile Not Found or Inactive</h3>`;
            }
        })
        .catch((err) => {
            console.error("Error fetching profile:", err);
            profileSection.innerHTML = `<h3>Error loading profile</h3>`;
        });
}

// Function to edit the profile
function editProfile(): void {
    if (!editProfileForm || !profileSection) {
        console.error("Edit profile form or profile section element not found.");
        return;
    }

    editProfileForm.addEventListener("submit", (e: Event) => {
        e.preventDefault(); // Prevent form from reloading the page

        // Collect form data and convert to JSON
        const formData = new FormData(editProfileForm);
        const updatedData = {
            email: formData.get("email") as string,
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        fetch(profileUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Profile updated successfully:", data);

                profileSection.innerHTML = `
                    <h3>Profile Updated!</h3>
                    <p>Updated Username: ${data.username}</p>
                    <p>Updated Email: ${data.email}</p>
                    <p>Updated At: ${new Date(data.updated_at).toLocaleString()}</p>
                `;
            })
            .catch((err) => {
                console.error("Error updating profile:", err);
                profileSection.innerHTML = `
                    <h3>Error updating profile. Please try again later.</h3>
                `;
            });
    });
}

if (profileButton) {
    profileButton.addEventListener("click", showMyProfile);
} else {
    console.error("Profile button element not found.");
}

if (editProfileButton) {
    editProfileButton.addEventListener("click", editProfile);
} else {
    console.error("Edit profile button element not found.");
}
