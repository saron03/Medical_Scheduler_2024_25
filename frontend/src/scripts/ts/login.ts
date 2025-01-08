// Grab the elements from the DOM and ensure they're properly typed
const loginForm = document.getElementById("login") as HTMLFormElement | null;
const signupForm = document.getElementById("signup") as HTMLFormElement | null;
const toggleButton = document.getElementById("btn") as HTMLDivElement | null;

// Check if the elements exist before proceeding
if (!loginForm || !signupForm || !toggleButton) {
    console.error("One or more DOM elements are missing. Please check your HTML structure.");
} else {
    // Function to handle the signup form display
    function signup(): void {
        loginForm.style.left = "-400px";
        signupForm.style.left = "50px";
        toggleButton.style.left = "110px";
    }

    // Function to handle the login form display
    function login(): void {
        loginForm.style.left = "50px";
        signupForm.style.left = "450px";
        toggleButton.style.left = "0px";
    }

    // Attach functions to the global scope for use in the HTML
    (window as any).signup = signup;
    (window as any).login = login;
}
