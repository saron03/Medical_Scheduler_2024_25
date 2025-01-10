var _a;
// Sample data (initially empty)
var employees = [];
var totalDoctors = 0;
var totalReceptionists = 0;
var restrictedAccounts = 0;
// Fetches and renders the users from the API
document.addEventListener("DOMContentLoaded", function () {
  var userListElement = document.getElementById("userList");
  var userTableBody = document.getElementById("userTableBody");
  // Fetch the list of users
  fetch("http://localhost:4000/api/v1/users")
    .then(function (response) {
      return response.json();
    })
    .then(function (users) {
      // Filter users to show only Receptionists and Doctors
      employees = users.filter(function (user) {
        return user.role.name === "Receptionist" || user.role.name === "Doctor";
      });
      // Update the counters based on the fetched users
      totalDoctors = employees.filter(function (user) {
        return user.role.name === "Doctor";
      }).length;
      totalReceptionists = employees.filter(function (user) {
        return user.role.name === "Receptionist";
      }).length;
      restrictedAccounts = employees.filter(function (user) {
        return user.accountStatus === "restricted";
      }).length;
      // Render the users
      renderUsers(employees);
    })
    .catch(function (error) {
      return console.error("Error fetching users:", error);
    });
  // Renders the user table
  function renderUsers(employees) {
    userTableBody.innerHTML = "";
    employees.forEach(function (user) {
      var rowClass = user.accountStatus === "restricted" ? "restricted" : "";
      var row = '<tr class="'
        .concat(rowClass, '">\n          <td>')
        .concat(user.username, "</td>\n          <td>")
        .concat(user.email, "</td>\n          <td>")
        .concat(user.user_id, "</td> \n          <td>")
        .concat(
          user.role.name,
          '</td>\n          <td>\n              <button class="btn btn-danger btn-sm" onclick="deleteUser('
        )
        .concat(
          user.user_id,
          ')">Delete</button>\n          </td>\n      </tr>'
        );
      userTableBody.innerHTML += row;
    });
    updateCounters();
  }
  // Implements search functionality
  function filterUsers() {
    var searchValue = document
      .getElementById("searchInput")
      .value.toLowerCase();
    var filteredUsers = employees.filter(function (user) {
      return (
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.accountStatus.toLowerCase().includes(searchValue) ||
        user.role.name.toLowerCase().includes(searchValue)
      );
    });
    renderUsers(filteredUsers);
  }
  // Updates the counters for total doctors, receptionists, and restricted accounts
  function updateCounters() {
    document.getElementById("totalDoctors").innerText = totalDoctors.toString();
    document.getElementById("totalReceptionists").innerText =
      totalReceptionists.toString();
    document.getElementById("restrictedAccounts").innerText =
      restrictedAccounts.toString();
  }
  // Initial rendering of users
  renderUsers(employees);
  // Delete function defined globally
  window.deleteUser = function deleteUser(userId) {
    fetch("http://localhost:4000/api/v1/users/".concat(userId), {
      method: "DELETE",
    })
      .then(function (response) {
        if (response.ok) {
          alert("User deleted successfully.");
          employees = employees.filter(function (user) {
            return user.user_id !== userId;
          }); // Remove user from employees
          renderUsers(employees); // Re-render the updated list
        } else {
          alert("Failed to delete user.");
        }
      })
      .catch(function (error) {
        alert("Error deleting user.");
        console.error("Error deleting user:", error);
      });
  };
});
// Search input event listener
(_a = document.getElementById("searchInput")) === null || _a === void 0
  ? void 0
  : _a.addEventListener("input", filterUsers);
