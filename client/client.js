if (localStorage.getItem("username") !== null) {
    let register_button = document.getElementById("register_button");
    register_button.innerHTML = "";

    let login_button = document.getElementById("login_button");
    login_button.innerHTML = "Logout";
}
else {
    let register_button = document.getElementById("register_button");
    register_button.innerHTML = "Register";
    let login_button = document.getElementById("login_button");
    login_button.innerHTML = "Login";
}