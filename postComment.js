async function postComment() {
    /*
    load json file
    file = 
    also get first_name and username

    comment in the form of:
    First_name @username
    [comment]
    [comment]
    */
    let username = localStorage.getItem("username");
    let first_name = localStorage.getItem("first_name");
    let title = document.title;
    let location = await getLocation(title);

    const form = document.querySelector('form');
    const commentData = new FormData(form);
    commentData.append("username", username);
    commentData.append("first_name", first_name);
    commentData.append("location", location);
    const urlEncodedParameters = new URLSearchParams(commentData).toString();

    let response = await fetch("http://127.0.0.1:8090/post_comment", {
        method: "POST",
        body: urlEncodedParameters,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });

    try {
        if (response.ok) {
            if (title === "Differentiation") {
                window.location.replace("http://127.0.0.1:8090/topicOne_Differentiation.html");
            }
            else if (title === "Multivariate Functions") {
                window.location.replace("http://127.0.0.1:8090/topicTwo_MultivariateFunctions.html");
            }
            else if (title === "Multivariate Extrema") {
                window.location.replace("http://127.0.0.1:8090/topicThree_MultivariateExtrema.html");
            }
            else if (title === "Vector-valued Functions") {
                window.location.replace("http://127.0.0.1:8090/topicFour_VectorValuedFunctions.html");
            }
            else if (title === "Exponentials and Logarhithm") {
                window.location.replace("http://127.0.0.1:8090/topicFive_Exponentials.html");
            };
        }
        else {   
            throw(Error("Register request failed."));
        }
    }
    catch (error) {
        throw(error);
    }
}

async function getLocation(title) {
    console.log("This is the title: ",title);
    if (title === "Differentiation") {
        let location = "./comments/topicOne_Differentiation.json";
        return location;
    }
    else if (title === "Multivariate Functions") {
        let location = "./comments/topicTwo_MultivariateFunctions.json";
        return location;
    }
    else if (title === "Multivariate Extrema") {
        let location = "./comments/topicThree_MultivariateExtrema.json";
        return location;
    }
    else if (title === "Vector-valued Functions") {
        let location = "./comments/topicFour_VectorValuedFunctions.json";
        return location;
    }
    else if (title === "Exponentials and Logarhithm") {
        let location = "./comments/topicFive_Exponentials.json";
        return location;
    };
}

let comment_form = document.querySelector("form");
comment_form.addEventListener("submit", (event) => {
    event.preventDefault();
    postComment();
})