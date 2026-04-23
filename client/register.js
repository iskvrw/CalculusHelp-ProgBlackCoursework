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
            
            if (response.successful.valueOf() === true) {
                email = response.email;
                username = response.username;
                first_name = response.first_name;

                localStorage.setItem("email", email);
                localStorage.setItem("username", username);
                localStorage.setItem("first_name", first_name);
            }
            else {
                throw Error(response.reason);
            }
            

            
            
            /*
            SAVE USERNAME AND FIRST_NAME TO LOCALSTORAGE
            Don't forget to add it upon LOGIN
            and
            Delete upon LOGOUT
            */


        }
        catch (error) {
            document.getElementById("error").innerHTML = error;
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