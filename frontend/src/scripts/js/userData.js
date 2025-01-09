var profileButton = document.getElementById("profile-button");
var editProfileButton = document.getElementById("edit-profile-button");
var profileSection = document.getElementById("profile");
var editProfileForm = document.getElementById("edit-profile");
var profileUrl = "http://localhost:4000/api/v1/users/5"; // API route for profile
// Function to show the active profile
function showMyProfile() {
    if (!profileSection) {
        console.error("Profile section element not found.");
        return;
    }
    fetch(profileUrl)
        .then(function (res) {
        if (!res.ok) {
            throw new Error("HTTP error! status: ".concat(res.status));
        }
        return res.json();
    })
        .then(function (data) {
        if (data.accountStatus === "active") {
            profileSection.innerHTML = "\n                    <h3>".concat(data.username, "</h3>\n                    <p>Role: ").concat(data.role.name, "</p>\n                    <p>Email: ").concat(data.email, "</p>\n                    <p>Created At: ").concat(new Date(data.created_at).toLocaleString(), "</p>\n                ");
        }
        else {
            profileSection.innerHTML = "<h3>Profile Not Found or Inactive</h3>";
        }
    })
        .catch(function (err) {
        console.error("Error fetching profile:", err);
        profileSection.innerHTML = "<h3>Error loading profile</h3>";
    });
}
// Function to edit the profile
function editProfile() {
    if (!editProfileForm || !profileSection) {
        console.error("Edit profile form or profile section element not found.");
        return;
    }
    editProfileForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from reloading the page
        // Collect form data and convert to JSON
        var formData = new FormData(editProfileForm);
        var updatedData = {
            email: formData.get("email"),
            username: formData.get("username"),
            password: formData.get("password"),
        };
        fetch(profileUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then(function (res) {
            if (!res.ok) {
                throw new Error("HTTP error! status: ".concat(res.status));
            }
            return res.json();
        })
            .then(function (data) {
            console.log("Profile updated successfully:", data);
            profileSection.innerHTML = "\n                    <h3>Profile Updated!</h3>\n                    <p>Updated Username: ".concat(data.username, "</p>\n                    <p>Updated Email: ").concat(data.email, "</p>\n                    <p>Updated At: ").concat(new Date(data.updated_at).toLocaleString(), "</p>\n                ");
        })
            .catch(function (err) {
            console.error("Error updating profile:", err);
            profileSection.innerHTML = "\n                    <h3>Error updating profile. Please try again later.</h3>\n                ";
        });
    });
}
if (profileButton) {
    profileButton.addEventListener("click", showMyProfile);
}
else {
    console.error("Profile button element not found.");
}
if (editProfileButton) {
    editProfileButton.addEventListener("click", editProfile);
}
else {
    console.error("Edit profile button element not found.");
}
