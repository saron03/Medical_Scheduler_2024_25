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
var _this = this;
// Grab the elements from the DOM and ensure they're properly typed
var loginForm = document.getElementById("login");
var signupForm = document.getElementById("signup");
var toggleButton = document.getElementById("btn");
var loginButton = document.querySelector('.toggle-btn[onclick="login()"]');
var signupButton = document.querySelector('.toggle-btn[onclick="signup()"]');
// Check if the elements exist before proceeding
if (
  !loginForm ||
  !signupForm ||
  !toggleButton ||
  !loginButton ||
  !signupButton
) {
  console.error(
    "One or more DOM elements are missing. Please check your HTML structure."
  );
} else {
  // Function to handle the signup form display
  var signup = function () {
    loginForm.style.left = "-400px";
    signupForm.style.left = "50px";
    toggleButton.style.left = "110px";
    loginButton.classList.remove("active");
    signupButton.classList.add("active");
  };
  // Function to handle the login form display
  var login_1 = function () {
    loginForm.style.left = "50px";
    signupForm.style.left = "450px";
    toggleButton.style.left = "0px";
    signupButton.classList.remove("active");
    loginButton.classList.add("active");
  };
  // Attach functions to the global scope for button actions
  window.signup = signup;
  window.login = login_1;
  // Login Functionality
  var handleLogin = function (event) {
    return __awaiter(_this, void 0, void 0, function () {
      var form,
        role,
        email,
        password,
        loginData,
        response,
        token,
        roleId,
        error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            event.preventDefault();
            form = event.target;
            role = form.role.value;
            email = form.email.value;
            password = form.password.value;
            loginData = { email: email, password: password, role: role };
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, , 5]);
            return [
              4 /*yield*/,
              fetch("http://localhost:4000/api/v1/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
              }),
            ];
          case 2:
            response = _a.sent();
            if (!response.ok) throw new Error("Login failed");
            if (!response.ok) throw new Error("Login failed");
            return [4 /*yield*/, response.json()];
          case 3:
            token = _a.sent().token;
            // Store the JWT token
            localStorage.setItem("jwtToken", token);
            roleId = parseInt(role);
            // Navigate based on roleId
            switch (roleId) {
              case 1:
                window.location.href = "/headoffice";
                break;
              case 2:
                window.location.href =
                  "http://127.0.0.1:5500/frontend/src/admin.html";
                break;
              case 3:
                window.location.href = "/patient";
                break;
              case 4:
                // Updated navigation for doctor role
                window.location.href =
                  "http://127.0.0.1:5500/frontend/src/doctor_queue.html";
                break;
              case 5:
                // Updated navigation for receptionist role
                window.location.href =
                  "http://127.0.0.1:5500/frontend/src/receptionist_queue.html";
                break;
              default:
                window.location.href =
                  "http://127.0.0.1:5500/frontend/src/doctor_queue.html";
            }
            return [3 /*break*/, 5];
          case 4:
            error_1 = _a.sent();
            if (error_1 instanceof Error) {
              alert(error_1.message);
            }
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Signup Functionality
  var handleSignup = function (event) {
    return __awaiter(_this, void 0, void 0, function () {
      var form,
        username,
        roleId,
        email,
        password,
        confirmPassword,
        userData,
        response,
        token,
        error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            event.preventDefault();
            form = event.target;
            username = form.name.value;
            roleId = parseInt(form.role.value, 10);
            email = form.email.value;
            password = form.password.value;
            confirmPassword = form.confirmPassword.value;
            if (password !== confirmPassword) {
              alert("Passwords do not match");
              return [2 /*return*/];
            }
            userData = {
              email: email,
              username: username,
              password: password,
              roleId: roleId,
            };
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, , 5]);
            return [
              4 /*yield*/,
              fetch("http://localhost:4000/api/v1/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
              }),
            ];
          case 2:
            response = _a.sent();
            if (!response.ok) throw new Error("Signup failed");
            return [4 /*yield*/, response.json()];
          case 3:
            token = _a.sent().token;
            // Store the JWT token
            localStorage.setItem("jwtToken", token);
            // Navigate based on roleId
            switch (roleId) {
              case 1:
                window.location.href = "/headoffice";
                break;
              case 2:
                window.location.href =
                  "http://127.0.0.1:5500/frontend/src/admin.html";
                break;
              case 3:
                window.location.href = "/patient";
                break;
              case 4:
                // Updated navigation for doctor role
                window.location.href =
                  "http://127.0.0.1:5500/frontend/src/doctor_queue.html";
                break;
              case 5:
                // Updated navigation for receptionist role
                window.location.href =
                  "http://127.0.0.1:5500/frontend/src/receptionist_queue.html";
                break;
              default:
                window.location.href =
                  "http://127.0.0.1:5500/frontend/src/doctor_queue.html";
            }
            login_1(); // Switch to signup form view
            return [3 /*break*/, 5];
          case 4:
            error_2 = _a.sent();
            if (error_2 instanceof Error) {
              alert(error_2.message);
            }
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Attach event listeners for form submissions
  loginForm.addEventListener("submit", handleLogin);
  signupForm.addEventListener("submit", handleSignup);
}
