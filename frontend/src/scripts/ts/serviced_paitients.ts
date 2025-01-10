// Check for JWT token on load
const checkJwtToken = (): void => {
    const jwtToken = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (!jwtToken) {
      window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
    }
  };
  
  // Call the checkJwtToken function on load
  checkJwtToken();
  
interface CompletedUser {
    name: string;
    id: string;
    age: number;
    time: string;
}

// Function to render completed users in the table
function renderCompletedUsers(): void {
    const completedUsers: CompletedUser[] = JSON.parse(localStorage.getItem('completedUsers') || '[]');
    const completedUserTableBody = document.getElementById('completedUserTableBody') as HTMLElement;
    completedUserTableBody.innerHTML = '';
    completedUsers.forEach(user => {
        const row = `<tr class="completed">
            <td>${user.name}</td>
            <td>${user.id}</td>
            <td>${user.age}</td>
            <td>${user.time}</td>
        </tr>`;
        completedUserTableBody.innerHTML += row;
    });
}

// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser(): void {
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("jwtToken");
  
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
  }
  // Attach the logout function to the logout button
  document.getElementById("logout")?.addEventListener("click", logoutUser);

// Initial rendering of completed users
document.addEventListener('DOMContentLoaded', renderCompletedUsers);
