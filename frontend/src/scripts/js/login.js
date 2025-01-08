// Grab the elements from the DOM and ensure they're properly typed
var loginForm = document.getElementById("login");
var signupForm = document.getElementById("signup");
var toggleButton = document.getElementById("btn");
// Check if the elements exist before proceeding
if (!loginForm || !signupForm || !toggleButton) {
    console.error("One or more DOM elements are missing. Please check your HTML structure.");
}
else {
    // Function to handle the signup form display
    function signup() {
        loginForm.style.left = "-400px";
        signupForm.style.left = "50px";
        toggleButton.style.left = "110px";
    }
    // Function to handle the login form display
    function login() {
        loginForm.style.left = "50px";
        signupForm.style.left = "450px";
        toggleButton.style.left = "0px";
    }
    // Attach functions to the global scope for use in the HTML
    window.signup = signup;
    window.login = login;
}
