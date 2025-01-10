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
// Global array for users
var users = [];
var activeEntries = 0;
var pendingEntries = 0;
// Fetch data from the API
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
                activeEntries = users.length;
                pendingEntries = users.filter(function (user) { return user.status === 2; }).length;
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
// Render the users in the table
var renderUsers = function (users) {
    var userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";
    users.forEach(function (user, index) {
        var rowClass = user.status === 2 ? "pending" : user.status === 3 ? "resolved" : "";
        var resolveButtonDisabled = user.status !== 2;
        var row = "\n        <tr class=\"".concat(rowClass, "\">\n          <td>").concat(user.patient.first_name, " ").concat(user.patient.last_name, "</td>\n          <td>").concat(new Date(user.created_at).toLocaleString(), "</td>\n          <td>").concat(user.status === 1
            ? "Not Pending"
            : user.status === 2
                ? "Pending"
                : "Resolved Pending", "\n          </td>\n          <td>\n            <button class=\"btn btn-sm\" onclick=\"resolvePendingUser(").concat(index, ")\" ").concat(resolveButtonDisabled ? "disabled" : "", ">Resolve Pending</button>\n            <button class=\"btn btn-sm\" onclick=\"deleteUser(").concat(index, ")\">Delete</button>\n          </td>\n        </tr>");
        userTableBody.innerHTML += row;
    });
    updateCounters();
};
// Update counters for active and pending entries
var updateCounters = function () {
    document.getElementById("activeEntries").innerText =
        activeEntries.toString();
    document.getElementById("pendingEntries").innerText =
        pendingEntries.toString();
};
// Resolve pending user
var resolvePendingUser = function (index) { return __awaiter(_this, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = users[index];
                if (!(user.status === 2)) return [3 /*break*/, 4];
                user.status = 3;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues/".concat(user.queue_id), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: 3 }),
                    })];
            case 2:
                _a.sent();
                pendingEntries--;
                renderUsers(users);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Error resolving user:", error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Delete user from the queue
var deleteUser = function (index) { return __awaiter(_this, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = users[index];
                if (user.status === 2) {
                    pendingEntries--;
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
                activeEntries--;
                renderUsers(users);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error deleting user:", error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Add a new user to the queue
var addUser = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var token, base64Payload, payload, registeredById, firstName, lastName, email, phoneNumber, dob, gender, address, doctorId, patientData, patientResponse, patient, queueData, queueResponse, queueEntry, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                token = localStorage.getItem("jwtToken");
                if (!token) {
                    console.error("No token found in local storage");
                    return [2 /*return*/];
                }
                base64Payload = token.split(".")[1];
                payload = JSON.parse(atob(base64Payload));
                registeredById = payload.user_id;
                firstName = document.getElementById("firstName")
                    .value;
                lastName = document.getElementById("lastName")
                    .value;
                email = document.getElementById("email").value;
                phoneNumber = document.getElementById("phoneNumber").value;
                dob = document.getElementById("dob").value;
                gender = document.getElementById("gender").value;
                address = document.getElementById("address")
                    .value;
                doctorId = parseInt(document.getElementById("doctorId").value);
                patientData = {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: phoneNumber,
                    date_of_birth: dob,
                    gender: gender,
                    address: address,
                    registered_by_id: registeredById,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/patients", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(token),
                        },
                        body: JSON.stringify(patientData),
                    })];
            case 2:
                patientResponse = _a.sent();
                if (patientResponse.status !== 201) {
                    throw new Error("Failed to register patient");
                }
                return [4 /*yield*/, patientResponse.json()];
            case 3:
                patient = _a.sent();
                queueData = {
                    patient_id: patient.patient_id,
                    doctor_id: doctorId,
                    status: 1,
                };
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(token),
                        },
                        body: JSON.stringify(queueData),
                    })];
            case 4:
                queueResponse = _a.sent();
                if (queueResponse.status !== 201) {
                    throw new Error("Failed to add patient to queue");
                }
                return [4 /*yield*/, queueResponse.json()];
            case 5:
                queueEntry = _a.sent();
                users.push(queueEntry);
                activeEntries++;
                renderUsers(users);
                closeAddUserModal();
                return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.error("Error adding user:", error_4);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
// Search and filter users
var filterUsers = function () {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    var filteredUsers = users.filter(function (user) {
        return (user.patient.first_name.toLowerCase().includes(searchValue) ||
            user.patient.last_name.toLowerCase().includes(searchValue) ||
            new Date(user.created_at)
                .toLocaleString()
                .toLowerCase()
                .includes(searchValue) ||
            (user.status === 1
                ? "Not Pending"
                : user.status === 2
                    ? "Pending"
                    : "Resolved Pending")
                .toLowerCase()
                .includes(searchValue));
    });
    renderUsers(filteredUsers);
};
// Modal functions
var openAddUserModal = function () {
    document.getElementById("addUserModal").style.display = "block";
};
var closeAddUserModal = function () {
    document.getElementById("addUserModal").style.display = "none";
};
// Initialize the page by fetching users
document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});
