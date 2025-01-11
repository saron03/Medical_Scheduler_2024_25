"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = exports.loginUser = exports.addToQueue = exports.registerPatient = exports.updateUserStatus = exports.deleteUser = exports.deleteUserFromQueue = exports.fetchUserDetails = exports.fetchUsers = exports.fetchQueues = void 0;
// Fetch Queues
var fetchQueues = function () { return __awaiter(void 0, void 0, void 0, function () {
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
                return [2 /*return*/, data];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching queues:", error_1);
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.fetchQueues = fetchQueues;
// Fetch Users
var fetchUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, users, error_2;
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
                return [2 /*return*/, users];
            case 3:
                error_2 = _a.sent();
                console.error("Error fetching users:", error_2);
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.fetchUsers = fetchUsers;
// Fetch User Details
var fetchUserDetails = function (queue_id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues/".concat(queue_id))];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch user details: ".concat(response.statusText));
                }
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_3 = _a.sent();
                console.error("Error fetching user details:", error_3);
                throw error_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.fetchUserDetails = fetchUserDetails;
// Delete User from Queue
var deleteUserFromQueue = function (queue_id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues/".concat(queue_id), {
                        method: "DELETE",
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error("Error deleting user:", error_4);
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserFromQueue = deleteUserFromQueue;
// Delete User
var deleteUser = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/users/".concat(user_id), {
                        method: "DELETE",
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to delete user: ".concat(response.statusText));
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error("Error deleting user:", error_5);
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
// Update User Status in Queue
var updateUserStatus = function (queue_id, newStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues/".concat(queue_id), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: newStatus }),
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error("Error updating user status:", error_6);
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserStatus = updateUserStatus;
// Register Patient
var registerPatient = function (patientData, token) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/patients", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(token),
                        },
                        body: JSON.stringify(patientData),
                    })];
            case 1:
                response = _a.sent();
                if (response.status !== 201) {
                    throw new Error("Failed to register patient");
                }
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_7 = _a.sent();
                console.error("Error registering patient:", error_7);
                throw error_7;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerPatient = registerPatient;
// Add Patient to Queue
var addToQueue = function (queueData, token) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/queues", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(token),
                        },
                        body: JSON.stringify(queueData),
                    })];
            case 1:
                response = _a.sent();
                if (response.status !== 201) {
                    throw new Error("Failed to add patient to queue");
                }
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_8 = _a.sent();
                console.error("Error adding patient to queue:", error_8);
                throw error_8;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addToQueue = addToQueue;
// Login User
var loginUser = function (loginData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/users/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(loginData),
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Login failed");
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_9 = _a.sent();
                console.error("Error logging in user:", error_9);
                throw error_9;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
// Signup User
var signupUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/users/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData),
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Signup failed");
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_10 = _a.sent();
                console.error("Error signing up user:", error_10);
                throw error_10;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signupUser = signupUser;
