
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static("public"));

var api_router = express.Router();

app.get("/api/gamedata", (request, response) => {
    let name = request.query["name"];
    response.send(gamedata.get(name));
});

app.post("/api/newuser", (request, response) => {
    let name_request = request.query["name"];
    let pass_request = request.query["password"];
    let current_auth_entry = auth.get(name_request);
    if (current_auth_entry === undefined) {
        auth.set(name_request, { password : pass_request });
        response.status(200);
        response.send();
    } else {
        if (pass_request != current_auth_entry.password) {
            response.status(409);
            response.send("Error: username taken");
        } else {
            response.status(200);
            response.send();
        }
    }
});


app.listen(port);


let gamedata = new Map();
let gamedata_entry = {
    score : 5678,
    health : 1,
    healing : 4,
    enemy_index : 1,
    enemy_health : 1
}
gamedata.set("Alex", gamedata_entry);


let auth = new Map();
let auth_entry = {
    password : "pass"
}
auth.set("Alex", auth_entry);
