function Register() {
    if (document.getElementById("password-field-one").value === document.getElementById("password-field-two").value) {
        try {
            const form = document.querySelector('form');
            const registerData = new FormData(form);
            const urlEncodedParameters = new URLSearchParams(registerData).toString();

            let response = fetch("http://127.0.0.1:8090/register_request", {
                method: "POST",
                body: urlEncodedParameters,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            });
            
            email = response.email;
            username = response.username;
            first_name = response.first_name;

            localStorage.setItem("email", email);
            localStorage.setItem("username", username);
            localStorage.setItem("first_name", first_name);
            
            /*
            SAVE USERNAME AND FIRST_NAME TO LOCALSTORAGE
            Don't forget to add it upon LOGIN
            and
            Delete upon LOGOUT
            */


        }
        catch {
            document.getElementById("error").innerHTML = "There already exists an account with this email. Please log in.";
            Alert("There has been an error. Please try again.");
        }
    }
};

/*
let registerSubmit = document.getElementById("registerSubmit");
registerSubmit.addEventListener("click", Register);
*/

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    Register();
});