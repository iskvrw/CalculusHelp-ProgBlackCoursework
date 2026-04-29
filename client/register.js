async function Register() {
    if (document.getElementById("password-field-one").value === document.getElementById("password-field-two").value) {
        try {
            const form = document.querySelector('form');
            const registerData = new FormData(form);
            const urlEncodedParameters = new URLSearchParams(registerData).toString();

            let response = await fetch("http://127.0.0.1:8090/register_request", {
                method: "POST",
                body: urlEncodedParameters,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            });
            try {
                if (response.ok) {
                    let data = await response.json();
                    console.log(data);

                    localStorage.setItem("email", data["email"]);
                    localStorage.setItem("username", data["username"]);
                    localStorage.setItem("first_name", data["first_name"]);
                    
                    window.location.replace("http://127.0.0.1:8090/index.html");
                }
                else {   
                    throw(Error("Register request failed."));
                }
            }
            catch (error) {
                throw(error);
            }
            
        }
        catch (error) {
            document.getElementById("error").innerHTML = error;
        }
    }
};

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    Register();
});