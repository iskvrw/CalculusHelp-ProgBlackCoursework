async function Logout() {
    let register_button = document.getElementById("register_button");
    register_button.innerHTML = "Register";
    let login_button = document.getElementById("login_button")
    login_button.innerHTML = "Login";

    localStorage.removeItem("username");
    localStorage.removeItem("first_name");
    localStorage.removeItem("email");

    window.location.replace("http://127.0.0.1:8090/index.html");
}

const logout_button = document.getElementById("login_button");
logout_button.addEventListener('click', (event) => {
    let string = logout_button.innerHTML;
    if (string == "Logout") {
        event.preventDefault();
        Logout();
    } 
});
