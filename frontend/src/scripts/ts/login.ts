
const loginForm = document.getElementById("login") as HTMLFormElement | null;
const signupForm = document.getElementById("signup") as HTMLFormElement | null;
const toggleButton = document.getElementById("btn") as HTMLDivElement | null;

if (!loginForm || !signupForm || !toggleButton) {
    console.error("One or more DOM elements are missing. Please check your HTML structure.");
} else {
    
    function signup(): void {
        loginForm.style.left = "-400px";
        signupForm.style.left = "50px";
        toggleButton.style.left = "110px";
    }

    function login(): void {
        loginForm.style.left = "50px";
        signupForm.style.left = "450px";
        toggleButton.style.left = "0px";
    }

    (window as any).signup = signup;
    (window as any).login = login;
}
