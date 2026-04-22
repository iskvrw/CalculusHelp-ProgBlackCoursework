const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');

const jsSHA = require("jssha");
const path = require("path")
const localStorage = require("localStorage");


app.use(express.static('client'));
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

    const hash_table = require("./data.json");
    const generate = require("child_process");
    const script_data = [email, password, username, first_name]
    const registerProcess = generate.spawn('python3', ['./checkRegisterCredentials.py', script_data]);
    registerProcess.stdout.on("data", (data) => {
        console.log(data.toString());
        console.log('pussy tight hoe');
        const successful = data[0];
        const reason = data[1];
        if (successful) {
            response.redirect("http://127.0.0.1:8090/client/index.html");
            user_data = {"email":email, "username": username, "first_name": first_name};
            return user_data;
        }
        else {
            throw Error(reason);
        }
    });

    /*
    if (!(password_hashed in hash_table)) {
        let entry = {password_hashed:{"email":email, "username":username, "first_name":first_name}};
        hash_table.push(entry);
        try {
            fs.writeFile("data.json", hash_table);
            response.redirect("http://127.0.0.1:8090/client/index.html");
            response.send({"username":username, "first_name":first_name});
        }
        catch {
            throw Error("Unable to register account.");
        }

    }
    else {
        throw Error("woah something happened")
    }
        */
        
})


app.get("/index.html/", function(request, response) {
    /* Send a request from */
    document.getElementById().innerHTML = "";
    document.getElementById().innerHTML = "";
})


app.listen(8090);