let title = document.getElementsByTagName("title").innerHTML;
let location = await getLocation(title);
let file = await fetch(location);
numberOfComments = file.length;

for (i = 0; i < numberOfComments; i++) {
    const object = file["" + i];
    let comment = object["comment"];
    let first_name = object["first_name"];
    let username = object["username"];
    
    const commentDiv = document.createElement("div");
    const commentDivIdAttribute = document.createAttribute("id");
    commentDivIdAttribute.value = i;
    commentDiv.setAttributeNode(commentDivIdAttribute);

    const usernameDiv = document.createElement("div");
    usernameDiv.innerHTML = username;
    const usernameDivIdAttribute = document.createAttribute("class");
    usernameDivIdAttribute.value = "username";
    usernameDiv.setAttributeNode(usernameDivIdAttribute);

    const first_nameDiv = document.createElement("div");
    first_nameDiv.innerHTML = first_name;
    const first_nameDivIdAttribute = document.createAttribute("class");
    first_nameDivIdAttribute.value = "first_name";
    first_nameDiv.setAttributeNode(first_nameDivIdAttribute);

    const comment_stringDiv = document.createElement("div");
    comment_stringDiv.innerHTML = comment;
    const comment_stringDivAttribute = document.createAttribute("class");
    comment_stringDivAttribute.value = "comment";
    commentDiv.setAttributeNode(comment_stringDivAttribute);
    
    commentDiv.append(first_nameDiv);
    commentDiv.append(usernameDiv);
    commentDiv.append(comment_stringDiv);

    document.getElementById("comments-section").append(commentDiv);
}

async function getLocation(title) {
    if (title === "Differentiation") {
        let location = "comments/topicOne_Differentiation.json";
        return location;
    }
    else if (title === "Multivariate Functions") {
        let location = "comments/topicTwo_MultivariateFunctions.json";
        return location;
    }
    else if (title === "Multivariate Extrema") {
        let location = "comments/topicThree_MultivariateExtrema.json";
        return location;
    }
    else if (title === "Vector-valued Functions") {
        let location = "comments/topicFour_VectorValuedFunctions.json";
        return location;
    }
    else if (title === "Exponentials and Logarhithm") {
        let location = "comments/topicFive_Exponentials.json";
        return location;
    };
}