// Check for JWT token on load
const checkJwtToken = (): void => {
    const jwtToken = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (!jwtToken) {
      window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
    }
  };
  
  // Call the checkJwtToken function on load
checkJwtToken();

function toggleMenu(): void {
    const subMenu = document.getElementById("subMenu");

    if (subMenu) {
        subMenu.classList.toggle("open-menu");
    } else {
        console.error("SubMenu element not found.");
    }
}

(window as any).toggleMenu = toggleMenu;

const EditForm = document.getElementById("edit-profile") as HTMLFormElement | null;
const Profile = document.getElementById("profile") as HTMLDivElement | null;
const toggleButton = document.getElementById("btn") as HTMLDivElement | null;

if (!EditForm || !Profile || !toggleButton) {
    console.error("One or more DOM elements are missing. Please check your HTML structure.");
} else {

    function editProfile(): void {
        if (Profile && EditForm && toggleButton) {
            Profile.style.left = "-400px";
            EditForm.style.left = "50px";
            toggleButton.style.left = "110px";
        }
    }

    function showProfile(): void {
        if (Profile && EditForm && toggleButton) {
            Profile.style.left = "50px";
            EditForm.style.left = "450px";
            toggleButton.style.left = "0px";
        }
    }

    (window as any).editProfile = editProfile;
    (window as any).showProfile = showProfile;
}

function storeActionAndNavigate(): void {
    localStorage.setItem("action", "clickButton");
    window.location.href = "profile.html";
}

const action = localStorage.getItem("action");

if (action === "clickButton") {
    const targetButton = document.querySelector(".target-button") as HTMLButtonElement | null;

    if (targetButton) {
        targetButton.click();
    }

    // Clear the action to avoid repeated clicks on reload
    localStorage.removeItem("action");
}

// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser(): void {
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("jwtToken");
  
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
  }
  // Attach the logout function to the logout button
  document.getElementById("logout")?.addEventListener("click", logoutUser);