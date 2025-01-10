var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
// Fetch the current user based on the token
var fetchCurrentUser = function () { return __awaiter(_this, void 0, void 0, function () {
    var token, response, currentUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = localStorage.getItem("jwtToken");
                if (!token) {
                    console.error("Authorization token not found.");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/users/user", {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer ".concat(token),
                        },
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch user: ".concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 3:
                currentUser = _a.sent();
                console.log("Current user fetched:", currentUser);
                return [2 /*return*/, currentUser];
            case 4:
                error_1 = _a.sent();
                console.error("Error fetching current user:", error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Render the profile for the current user
var renderProfile = function (user) {
    var profileSection = document.getElementById("profile");
    var userName = document.getElementById("user-info");
    if (!profileSection) {
        console.error("Profile section element not found.");
        return;
    }
    if (user) {
        userName.innerHTML = "\n          <img src=\"imgs/profile.png\" alt=\"Profile Picture\" />\n          <h3>".concat(user.username, "</h3>\n        ");
        profileSection.innerHTML = "\n        <img src=\"imgs/profile.png\" alt=\"Profile Picture\" />\n        <h3>".concat(user.username, "</h3>\n        <p>Role: ").concat(user.role.name, "</p>\n        <p>Email: ").concat(user.email, "</p>\n        <p>Created At: ").concat(new Date(user.created_at).toLocaleString(), "</p>\n      ");
    }
    else {
        userName.innerHTML = "<h3>User Not Found or Inactive</h3>";
        profileSection.innerHTML = "<h3>User not found.</h3>";
    }
};
// Edit the profile for the current user
var editProfile = function (user) { return __awaiter(_this, void 0, void 0, function () {
    var editProfileForm, profileSection;
    var _this = this;
    return __generator(this, function (_a) {
        editProfileForm = document.getElementById("edit-profile");
        profileSection = document.getElementById("profile");
        if (!editProfileForm || !profileSection) {
            console.error("Edit profile form or profile section element not found.");
            return [2 /*return*/];
        }
        editProfileForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
            var formData, username, email, newPassword, confirmPassword, token, updatedData, updateResponse, updatedUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        formData = new FormData(editProfileForm);
                        username = formData.get("username");
                        email = formData.get("email");
                        newPassword = formData.get("newPassword");
                        confirmPassword = formData.get("confirmPassword");
                        // Validate password fields
                        if (newPassword !== confirmPassword) {
                            alert("New password and confirmation password do not match.");
                            return [2 /*return*/];
                        }
                        token = localStorage.getItem("jwtToken");
                        if (!token) {
                            console.error("Authorization token not found.");
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        updatedData = __assign({ email: email || undefined, username: username || undefined }, (newPassword && { password: newPassword }));
                        return [4 /*yield*/, fetch("http://localhost:4000/api/v1/users/".concat(user.user_id), {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(token),
                                },
                                body: JSON.stringify(updatedData),
                            })];
                    case 2:
                        updateResponse = _a.sent();
                        if (!updateResponse.ok) {
                            throw new Error("HTTP error! status: ".concat(updateResponse.status));
                        }
                        return [4 /*yield*/, updateResponse.json()];
                    case 3:
                        updatedUser = _a.sent();
                        console.log("Profile updated successfully:", updatedUser);
                        // Render the updated profile
                        renderProfile(updatedUser);
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error("Error updating profile:", error_2);
                        profileSection.innerHTML = "<h3>Error updating profile. Please try again later.</h3>";
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
// Initialize the application
var init = function () { return __awaiter(_this, void 0, void 0, function () {
    var currentUser, loginbtn, signupbtn, editProfileButton;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchCurrentUser()];
            case 1:
                currentUser = _a.sent();
                if (!currentUser) {
                    console.error("Current user could not be loaded.");
                    return [2 /*return*/];
                }
                loginbtn = document.getElementById("login-btn");
                signupbtn = document.getElementById("signup-btn");
                editProfileButton = document.getElementById("edit-profile-button");
                if (loginbtn) {
                    loginbtn.addEventListener("click", function () { return renderProfile(currentUser); });
                }
                else {
                    console.error("Profile button element not found.");
                }
                if (signupbtn) {
                    signupbtn.addEventListener("click", function () { return renderProfile(currentUser); });
                }
                else {
                    console.error("Profile button element not found.");
                }
                if (editProfileButton) {
                    editProfileButton.addEventListener("click", function () { return editProfile(currentUser); });
                }
                else {
                    console.error("Edit profile button element not found.");
                }
                return [2 /*return*/];
        }
    });
}); };
init();
