const express = require('express');
const app = express();
const jsSHA = require("jssha");
const fs = require("fs");
const { exec } = require('child_process');
const { Alert } = require('bootstrap');
const { error } = require('console');

app.use(express.static('client'));

app.get("/register.html/register_data?", function(request, response) {
    let email = request.params["email"];
    let password = request.params["password"];
    let username = request.params["username"];
    let first_name = request.params["first_name"];

    const hashObject = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
    hashObject.update(password);
    const password_hashed = hashObject.getHash("HEX");

    const hash_table = JSON.parse(require("./data.json"));
    if (!(password_hashed in hash_table)) {
        let entry = {password_hashed:{"email":email, "username":username, "first_name":first_name}};
        hash_table.push(entry);
        try {
            fs.writeFile("data.json", hash_table);

            response.redirect("http://127.0.0.1:5500/client/index.html");

            response.send({"username":username, "first_name":first_name});
        }
        catch {
            throw Error("Unable to register account.");
        }

    }
    else {
        throw Error
    }
})

app.get("/index.html/", function(request, response) {
    /* Send a request from */
    document.getElementById().innerHTML = "";
    document.getElementById().innerHTML = "";
})

app.listen(8090);