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
var _a;
var _this = this;
// Check for JWT token on load
var checkJwtToken = function () {
    var jwtToken = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (!jwtToken) {
        window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
    }
};
// Call the checkJwtToken function on load
checkJwtToken();
// Global array for users
var users = [];
var totalCompleted = 0;
var pending = 0;
var resolvedPending = 0;
// Sample data
var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                users = data;
                pending = users.filter(function (user) { return user.status === 2; }).length;
                resolvedPending = users.filter(function (user) { return user.status === 3; }).length;
                renderUsers(users);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching data:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Renders the queue database in a table
function renderUsers(users) {
    var userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";
    users.forEach(function (user, index) {
        var rowClass = user.status === 2 ? "pending" : user.status === 3 ? "resolved" : "";
        var row = "<tr class=\"".concat(rowClass, "\">\n            <td>").concat(user.patient.first_name, " ").concat(user.patient.last_name, "</td>\n            <td>").concat(user.patient.patient_id, "</td>\n            <td>").concat(user.patient.date_of_birth, "</td>\n            <td>").concat(user.status === 2
            ? "Pending"
            : user.status === 3
                ? "Resolved Pending"
                : "Not Pending", "</td>\n            <td>\n                <button class=\"btn btn-secondary btn-sm pend-btn\" onclick=\"pendUser(").concat(index, ")\">\n                    ").concat(user.status === 2
            ? "Unpend"
            : user.status === 3
                ? "Pend"
                : "Pend", "\n                </button>\n                <button class=\"btn btn-success btn-sm\" onclick=\"completeUser(").concat(index, ")\">Complete</button>\n            </td>\n        </tr>");
        userTableBody.innerHTML += row;
    });
    updateCounters();
}
// Adds event listeners to all pend buttons
// function addPendEventListeners(): void {
//     const pendButtons = document.querySelectorAll('.pend-btn');
//     pendButtons.forEach((button, index) => {
//         button.addEventListener('click', () => {
//             if (button.textContent === "pend") {
//                 button.textContent = "unpend";
//             } else {
//                 button.textContent = "pend";
//             }
//         });
//     });
// }
// Deletes users from queue table when service is completed
var completeUser = function (index) { return __awaiter(_this, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = users[index];
                if (user.status === 2) {
                    pending--;
                }
                else if (user.status === 3) {
                    resolvedPending--;
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues/".concat(user.queue_id), {
                        method: "DELETE",
                    })];
            case 2:
                _a.sent();
                users.splice(index, 1);
                totalCompleted++;
                renderUsers(users);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Error deleting user:", error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// function completeUser(index: number): void {
//     const completedUser = users.splice(index, 1)[0];
//     completedUser.time = new Date().toLocaleString();
//     totalCompleted++;
//     renderUsers(users);
// }
// Pends users
var pendUser = function (index) { return __awaiter(_this, void 0, void 0, function () {
    var user, response, currentQueue, newStatus, putResponse, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = users[index];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues/".concat(user.queue_id))];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch user details: ".concat(response.statusText));
                }
                return [4 /*yield*/, response.json()];
            case 3:
                currentQueue = _a.sent();
                newStatus = void 0;
                if (currentQueue.status === 2) {
                    newStatus = 1; // Move from Pending to Not Pending
                    pending--;
                }
                else if (currentQueue.status === 3) {
                    newStatus = 2; // Move from Resolved Pending to Pending
                    resolvedPending--;
                    pending++;
                }
                else {
                    newStatus = 2; // Move from Not Pending to Pending
                    pending++;
                }
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues/".concat(currentQueue.queue_id), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: newStatus }),
                    })];
            case 4:
                putResponse = _a.sent();
                if (!putResponse.ok) {
                    throw new Error("Failed to update user status: ".concat(putResponse.statusText));
                }
                // Step 4: Update the local user object and re-render
                user.status = newStatus;
                renderUsers(users);
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.error("Error resolving user:", error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// function pendUser(index: number): void {
//     if (users[index].status.toLowerCase() === "not pending") {
//         users[index].status = "Pending";
//         totalPending++;
//     }
//     else {
//         users[index].status = "Not Pending";
//         totalPending--;
//     }
//     renderUsers(users);
// }
// Listens for an update from receptionist side
// function resolvePendingUser(index: number): void {
//     users[index].status = "Resolved Pending";
//     totalPending--;
//     resolvedPending++;
//     renderUsers(users);
// }
// Implements search mechanism
function filterUsers() {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    var filteredUsers = users.filter(function (user) {
        return user.patient.name.toLowerCase().startsWith(searchValue) ||
            user.patient.id.toLowerCase().startsWith(searchValue) ||
            user.patient.age.toString().toLowerCase().startsWith(searchValue) ||
            user.status.toString().toLowerCase().startsWith(searchValue);
    });
    renderUsers(filteredUsers);
}
// Function to update counters for total completed, pending, and resolved pending
function updateCounters() {
    document.getElementById("totalCompleted").innerText =
        totalCompleted.toString();
    document.getElementById("totalPending").innerText =
        pending.toString();
    document.getElementById("resolvedPending").innerText =
        resolvedPending.toString();
}
// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser() {
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("jwtToken");
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
}
// Attach the logout function to the logout button
(_a = document.getElementById("logout")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", logoutUser);
// Placeholder function to simulate fetching users from the database
// function fetchUsersFromDatabase(): Promise<User[]> {
//     // Replace this with actual database fetching logic
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(users);
//         }, 1000);
//     });
// }
fetchData();
