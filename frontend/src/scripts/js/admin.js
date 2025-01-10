var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Sample data (initially empty)
var employees = [];
var totalDoctors = 0;
var totalReceptionists = 0;
// let restrictedAccounts: number = 0; Remove this
// Fetch data from the API
// My code
var fetchEmployeesData = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, users, employees_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/users")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                users = _a.sent();
                employees_1 = users.filter(function (user) {
                    return user.role.name === "Receptionist" || user.role.name === "Doctor";
                });
                // Update the counters based on the fetched users
                totalDoctors = employees_1.filter(function (user) { return user.role.name === "Doctor"; }).length;
                totalReceptionists = employees_1.filter(function (user) { return user.role.name === "Receptionist"; }).length;
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching data:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Render employees
var renderEmployees = function (employees) {
    var userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";
    employees.forEach(function (user) {
        var row = "\n        <tr>\n          <td>".concat(user.name, "</td>  // user_name doesnt exist\n          <td>").concat(user.email, "</td>\n          <td>").concat(user.user_id, "</td> \n          <td>").concat(user.role.name, "</td>\n          <td>\n              <button class=\"btn btn-danger btn-sm\" onclick=\"deleteEmployee(").concat(user.user_id, ")\">Delete</button>\n          </td>\n      </tr>");
        userTableBody.innerHTML += row;
    });
    updateEmployeeCounters();
};
//  Filter emplyees 
function filterEmployees() {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    var filteredUsers = employees.filter(function (user) {
        return user.name.toLowerCase().startsWith(searchValue) ||
            user.email.toLowerCase().startsWith(searchValue) ||
            // user.accountStatus.toLowerCase().includes(searchValue) || remove
            user.role.name.toLowerCase().startsWith(searchValue);
    });
    renderEmployees(filteredUsers);
}
//  Update counters
function updateEmployeeCounters() {
    document.getElementById("totalDoctors").innerText =
        totalDoctors.toString();
    document.getElementById("totalReceptionists").innerText =
        totalReceptionists.toString();
    // (document.getElementById("restrictedAccounts") as HTMLElement).innerText =
    //   restrictedAccounts.toString(); remove
}
// Delete User
var deleteEmployee = function (user_id) { return __awaiter(_this, void 0, void 0, function () {
    var userToBeDeleted, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userToBeDeleted = employees[user_id];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/users/".concat(user_id), {
                        method: "DELETE",
                    })];
            case 2:
                _a.sent();
                if (userToBeDeleted.role.name === "Doctor") {
                    totalDoctors--;
                }
                else {
                    totalReceptionists--;
                }
                employees = employees.filter(function (user) { return user !== userToBeDeleted; });
                renderEmployees(employees);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Error deleting user:", error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
fetchEmployeesData();
// Nati
// Fetches and renders the users from the API
// document.addEventListener("DOMContentLoaded", function () {
//   const userListElement = document.getElementById("userList") as HTMLElement;
//   const userTableBody = document.getElementById("userTableBody") as HTMLElement;
//   // Fetch the list of users
//   fetch("http://localhost:4000/api/v1/users")
//     .then((response) => response.json())
//     .then((users: User[]) => {
//       // Filter users to show only Receptionists and Doctors
//       employees = users.filter(
//         (user) =>
//           user.role.name === "Receptionist" || user.role.name === "Doctor"
//       );
//       // Update the counters based on the fetched users
//       totalDoctors = employees.filter(
//         (user) => user.role.name === "Doctor"
//       ).length;
//       totalReceptionists = employees.filter(
//         (user) => user.role.name === "Receptionist"
//       ).length;
//       restrictedAccounts = employees.filter(
//         (user) => user.accountStatus === "restricted"
//       ).length;
//       // Render the users
//       renderUsers(employees);
//     })
//     .catch((error) => console.error("Error fetching users:", error));
//   // Renders the user table
//   function renderUsers(employees: User[]): void {
//     userTableBody.innerHTML = "";
//     employees.forEach((user) => {
//       const rowClass = user.accountStatus === "restricted" ? "restricted" : "";
//       const row = `<tr class="${rowClass}">
//           <td>${user.username}</td>
//           <td>${user.email}</td>
//           <td>${user.user_id}</td> 
//           <td>${user.role.name}</td>
//           <td>
//               <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.user_id})">Delete</button>
//           </td>
//       </tr>`;
//       userTableBody.innerHTML += row;
//     });
//     updateCounters();
//   }
//   // Implements search functionality
//   function filterUsers(): void {
//     const searchValue = (
//       document.getElementById("searchInput") as HTMLInputElement
//     ).value.toLowerCase();
//     const filteredUsers = employees.filter(
//       (user) =>
//         user.name.toLowerCase().includes(searchValue) ||
//         user.email.toLowerCase().includes(searchValue) ||
//         user.accountStatus.toLowerCase().includes(searchValue) ||
//         user.role.name.toLowerCase().includes(searchValue)
//     );
//     renderUsers(filteredUsers);
//   }
//   // Updates the counters for total doctors, receptionists, and restricted accounts
//   function updateCounters(): void {
//     (document.getElementById("totalDoctors") as HTMLElement).innerText =
//       totalDoctors.toString();
//     (document.getElementById("totalReceptionists") as HTMLElement).innerText =
//       totalReceptionists.toString();
//     (document.getElementById("restrictedAccounts") as HTMLElement).innerText =
//       restrictedAccounts.toString();
//   }
//   // Initial rendering of users
//   renderUsers(employees);
//   // Delete function defined globally
//   window.deleteUser = function deleteUser(userId: number): void {
//     fetch(`http://localhost:4000/api/v1/users/${userId}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert("User deleted successfully.");
//           employees = employees.filter((user) => user.user_id !== userId); // Remove user from employees
//           renderUsers(employees); // Re-render the updated list
//         } else {
//           alert("Failed to delete user.");
//         }
//       })
//       .catch((error) => {
//         alert("Error deleting user.");
//         console.error("Error deleting user:", error);
//       });
//   };
// });
// // Search input event listener
// document.getElementById("searchInput")?.addEventListener("input", filterUsers);
