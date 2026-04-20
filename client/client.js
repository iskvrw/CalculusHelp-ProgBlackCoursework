const fs = require("fs");

async function Register() {
    if (document.getElementById("password-field-one") === document.getElementById("password-field-two")) {
        try {
            const parameters = new URLSearchParams();
            parameters.append("email", document.getElementById("email"));
            parameters.append("password", document.getElementById("password-field-one"));
            parameters.append("username", document.getElementById("username"));
            parameters.append("first_name", document.getElementById("first_name"));
            const url = "http://127.0.0.1:5500/client/register.html/register_data?" + parameters.toString();

            const response = await fetch(url);
            username = response.username;
            first_name = response.first_name;
            
            /*
            SAVE USERNAME AND FIRST_NAME TO LOCALSTORAGE
            Don't forget to add it upon LOGIN
            and
            Delete upon LOGOUT
            */


        }
        catch {
            document.getElementById("error").innerHTML = "There already exists an account with this email. Please log in.";
            Alert("There has been an error. Please try again.")
        }
    }
}

async function Login() {
    const parameters = new URLSearchParams();
    parameters.append("email", document.getElementById("email"));
    parameters.append("password", document.getElementById("password"));
    const url = "http://127.0.0.1:5500/client/register.html/login_data?" + parameters.toString();

    const response = await fetch(url);
    username = response.username;
    first_name = response.first_name;
    
}

async function Logout() {
    username = "";
    first_name = "";
    const url = "http://127.0.0.1:5500/client/register.html/logout";

    const response = await fetch(url);
}

let registerSubmit = document.getElementById("registerSubmit");
registerSubmit.addEventListener("click", Register);

let loginSubmit = document.getElementById("loginSubmit");
loginSubmit.addEventListener("click", Login);

let logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", Logout);