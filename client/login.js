async function Login() {
    const form = document.querySelector('form');
    const loginData = new FormData(form);
    const urlEncodedParameters = new URLSearchParams(loginData).toString();

    console.log("Place -1", urlEncodedParameters, loginData, form);
    let response = await fetch("http://127.0.0.1:8090/login_request", {
        method: "POST",
        body: urlEncodedParameters,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });
    
    try {
        if (response.ok) {
            console.log("Place 2");
            let data = await response.json();
            console.log(data, typeof(data));
            
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            localStorage.removeItem("first_name");

            localStorage.setItem("email", data["email"]);
            localStorage.setItem("username", data["username"]);
            localStorage.setItem("first_name", data["first_name"]);

            window.location.replace("http://127.0.0.1:8090/index.html");
            }
        }
    catch (error) {
        throw(error);
    }
}

//const loginbutton = document.getElementById("loginSubmit");
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    Login();
});