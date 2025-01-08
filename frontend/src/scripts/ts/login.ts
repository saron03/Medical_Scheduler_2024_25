// Grab the elements from the DOM and ensure they're properly typed
const loginForm = document.getElementById("login") as HTMLFormElement;
const signupForm = document.getElementById("signup") as HTMLFormElement;
const toggleButton = document.getElementById("btn") as HTMLDivElement;
const loginButton = document.querySelector('.toggle-btn[onclick="login()"]') as HTMLButtonElement;
const signupButton = document.querySelector('.toggle-btn[onclick="signup()"]') as HTMLButtonElement;

// Check if the elements exist before proceeding
if (!loginForm || !signupForm || !toggleButton || !loginButton || !signupButton) {
    console.error("One or more DOM elements are missing. Please check your HTML structure.");
} else {
    // Function to handle the signup form display
    function signup(): void {
        loginForm.style.left = "-400px";
        signupForm.style.left = "50px";
        toggleButton.style.left = "110px";

        loginButton.classList.remove('active');
        signupButton.classList.add('active');
    }

    // Function to handle the login form display
    function login(): void {
        loginForm.style.left = "50px";
        signupForm.style.left = "450px";
        toggleButton.style.left = "0px";

        signupButton.classList.remove('active');
        loginButton.classList.add('active');
    }

    // Attach functions to the global scope for use in the HTML
    (window as any).signup = signup;
    (window as any).login = login;
}


  // Login Functionality
  const handleLogin = async (event: Event): Promise<void> => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const role = (form.role as HTMLInputElement).value;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    const loginData = { email, password, role };

    try {
      const response = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error("Login failed");

      const responseData: { roleId: number } = await response.json();
      roleId = responseData.roleId; // Update roleId based on login response

      // Navigate based on roleId
      switch (roleId) {
        case 1:
          window.location.href = "/headoffice";
          break;
        case 2:
          window.location.href = "/branch";
          break;
        case 3:
          window.location.href = "/patient";
          break;
        case 4:
          window.location.href = "/doctor";
          break;
        case 5:
          window.location.href = "/receptionist";
          break;
        default:
          window.location.href = "/";
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // Signup Functionality
  const handleSignup = async (event: Event): Promise<void> => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const username = (form.name as HTMLInputElement).value;
    const roleId = parseInt((form.role as HTMLInputElement).value, 10); // Role ID as a number
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    const confirmPassword = (form.confirmPassword as HTMLInputElement).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { email, username, password, roleId };

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) throw new Error("Signup failed");

      alert("Signup successful!");
      toggleForms(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // Attach event listeners
  loginForm.addEventListener("submit", handleLogin);
  signupForm.addEventListener("submit", handleSignup);
