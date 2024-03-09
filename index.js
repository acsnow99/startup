
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
        gamedata.set(name_request, { ...gamedata_entry_default })
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
let gamedata_entry_default = {
    score : 1002,
    health : 2,
    health_max : 3,
    healing : 3,
    enemy_index : 1,
    enemy_health : 3,
    enemy_health_max : 3
}
gamedata.set("Alex", gamedata_entry_default);


let auth = new Map();
let auth_entry = {
    password : "pass"
}
auth.set("Alex", auth_entry);
