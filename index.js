
const express = require('express');
const app = express();
const port = 4000;
app.use(express.static("public"));

const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const gameDataCollection = db.collection('gamedata');


app.get("/api/gamedata", async (request, response) => {
    let name_request = request.query["name"];
    const gamedata_request = await get_game_data(name_request);
    if (gamedata_request.size() < 1) {
        response.status(404);
        response.send("Error: could not find gamedata for user " + name_request);
    } else {
        response.status(200);
        response.send(gamedata_request[0]);
    }
});

app.post("/api/login", (request, response) => {
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

app.post("/api/gamedata", (request, response) => {
    let name_request = request.query["name"];
    const gamedata_set = JSON.parse(request.query["gamedata"]);
    if (gamedata_set === undefined) {
        response.status(400);
        response.send("Error: Missing gamedata in request");
    } else {
        gamedata.set(name_request, gamedata_set);
        response.status(200);
        response.send();
    }
});



function get_game_data(username_request) {
    const query = { username: username_request };
    const options = {
      limit: 1,
    };
    const cursor = gameDataCollection.find(query, options);
    return cursor.toArray();
  }



app.listen(port);


let gamedata = new Map();
let gamedata_entry_default = {
    score : 1002,
    health : 2,
    health_max : 3,
    healing : 5,
    enemy_index : 1,
    enemy_health : 2,
    enemy_health_max : 2
}
gamedata.set("Alex", gamedata_entry_default);


let auth = new Map();
let auth_entry = {
    password : "pass"
}
auth.set("Alex", auth_entry);
