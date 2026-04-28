const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');
const fs = require("fs");

const jsSHA = require("jssha");
const path = require("path");

app.use(express.static('client'));
app.use(express.static('./'));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({extended: false}));
app.use(cors());

http.createServer(function (request, response) {
  response.writeHead(200);
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');

app.get("/", function(req, res) {
    res.redirect("http://127.0.0.1:8090/client/index.html");
})

app.post("/register_request", function(request, response) {
    let email = request.body["email"];
    let password = request.body["password_one"];
    let username = request.body["username"];
    let first_name = request.body["first_name"];

    const hashObject = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
    hashObject.update(password);
    const password_hashed = hashObject.getHash("HEX");

    const spawn = require("child_process").spawn;
    const script_data = [email, password_hashed, username, first_name]
    const registerProcess = spawn('python3', ['./checkRegisterCredentials.py', script_data]);

    registerProcess.stdout.on("data", (data) => {
        //console.log(data.toString());
        console.log('something something output');
        const successful = data[0];
        const reason = data[1];
        if (successful) {
            user_data = {"email":email, "username": username, "first_name": first_name, "successful": successful, "reason":reason};
            response.status(200);
            response.send(user_data);
        }
        else {
            throw Error(reason);
        }
    });
});


app.post("/login_request", function(request, response) {
    let email = request.body["email"];
    let password = request.body["password"];

    const hashObject = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
    hashObject.update(password);
    const password_hashed = hashObject.getHash("HEX");

    const spawn = require("child_process").spawn;
    const script_data = [email, password_hashed]
    const loginProcess = spawn('python3', ['./checkLoginCredentials.py', script_data]);

    loginProcess.stdout.on("data", (data) => {
        //console.log(data.toString('utf8'));
        const converted_data = data.toString("utf8").slice(11, -2);
        const credentials = JSON.parse(converted_data.trim().replaceAll("'", '"'));
        console.log("my credentials are: ", credentials, typeof(credentials));
        
        let success = data.toString().slice(1, 5).toLowerCase();
        let successful = false;
        console.log(success);
        if (data.toString().slice(1, 5).toLowerCase() === "true") {
            const successful = true;
            const reason = data[1];
            user_data = {"email": credentials["email"], "username": credentials["username"], "first_name": credentials["first_name"], "successful": successful, "reason":reason};
            console.log(user_data["email"]);

            response.status(200);
            response.send(user_data);
        }
    });
})

app.post("logout_request", function(request, response) {
    response.redirect("http://127.0.0.1:8090/client/index.html");
});

app.post("/post_comment", function(request, response) {
    //console.log("What is this? pls tell me", request.body, request.body["location"]);
    let location = request.body["location"];
    let file = JSON.parse(fs.readFileSync(location, "utf8"));;

    let username = request.body["username"];
    let first_name = request.body["first_name"];
    let comment = request.body["comment-string"];

    let numberOfComments = Object.keys(file).length;
    let comment_id = numberOfComments.toString();
    let commentObject = {"comment":comment, "username":username, "first_name": first_name};
    file[comment_id] = commentObject;
    let new_file = JSON.stringify(file);
    console.log(file);
    fs.writeFile(location, new_file, finished);

    response.status(200);
    response.send();
})

function finished() {}

app.listen(8090);