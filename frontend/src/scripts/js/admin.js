"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };


var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };


var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./apis/api");
// Check for JWT token on load
var checkJwtToken = function () {
  var jwtToken =
    localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
  if (!jwtToken) {
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
  }
};

// Call the checkJwtToken function on load
checkJwtToken();
// Sample data (initially empty)
var employees = [];
var totalDoctors = 0;
var totalReceptionists = 0;


// Fetch data from the API
var fetchEmployeesData = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, (0, api_1.fetchUsers)()];
        case 1:
          users = _a.sent();
          // Filter users to show only Receptionists and Doctors
          employees = users.filter(function (user) {
            return (
              user.role.name === "Receptionist" || user.role.name === "Doctor"
            );
          });
          // Update the counters based on the fetched users
          totalDoctors = employees.filter(function (user) {
            return user.role.name === "Doctor";
          }).length;
          totalReceptionists = employees.filter(function (user) {
            return user.role.name === "Receptionist";
          }).length;
          // Render the filtered employees
          renderEmployees(employees);
          return [3 /*break*/, 3];
        case 2:
          error_1 = _a.sent();
          console.error("Error fetching data:", error_1);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};


// Render employees
var renderEmployees = function (employees) {
  var userTableBody = document.getElementById("userTableBody");
  userTableBody.innerHTML = "";
  employees.forEach(function (user, index) {
    var row = "\n      <tr>\n        <td>"
      .concat(user.username, "</td>\n        <td>")
      .concat(user.email, "</td>\n        <td>")
      .concat(user.user_id, "</td>\n        <td>")
      .concat(
        user.role.name,
        '</td>\n        <td>\n          <button class="btn btn-danger btn-sm" onclick="deleteEmployee('
      )
      .concat(index, ')">Delete</button>\n        </td>\n      </tr>');
    userTableBody.innerHTML += row;
  });
  updateEmployeeCounters();
};


// Delete User
var deleteEmployee = function (index) {
  return __awaiter(void 0, void 0, void 0, function () {
    var userToBeDeleted, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          userToBeDeleted = employees[index];
          if (!userToBeDeleted) {
            return [2 /*return*/];
          }
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [4 /*yield*/, (0, api_1.deleteUser)(userToBeDeleted.user_id)];
        case 2:
          _a.sent();
          if (userToBeDeleted.role.name === "Doctor") {
            totalDoctors--;
          } else if (userToBeDeleted.role.name === "Receptionist") {
            totalReceptionists--;
          }
          employees.splice(index, 1);
          renderEmployees(employees);
          return [3 /*break*/, 4];
        case 3:
          error_2 = _a.sent();
          console.error("Error deleting user:", error_2);
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};


// Filter employees
function filterEmployees() {
  var searchValue = document.getElementById("searchInput").value.toLowerCase();
  var filteredUsers = employees.filter(function (user) {
    return (
      user.username.toLowerCase().startsWith(searchValue) ||
      user.email.toLowerCase().startsWith(searchValue) ||
      user.role.name.toLowerCase().startsWith(searchValue)
    );
  });
  renderEmployees(filteredUsers);
}

// Update counters
function updateEmployeeCounters() {
  document.getElementById("totalDoctors").innerText = totalDoctors.toString();
  document.getElementById("totalReceptionists").innerText =
    totalReceptionists.toString();
}

// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser() {
  localStorage.removeItem("jwtToken");
  sessionStorage.removeItem("jwtToken");
  window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
}

// Attach the logout function to the logout button
(_a = document.getElementById("logout")) === null || _a === void 0
  ? void 0
  : _a.addEventListener("click", logoutUser);
// Call the function to fetch and render employees on page load
fetchEmployeesData();
