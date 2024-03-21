
const express = require('express');
const app = express();
const port = 4000;
app.use(express.static("public"));

const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startupdata');
const game_data_collection = db.collection('gamedata');
const auth_collection = db.collection('auth');


app.get("/api/gamedata", async (request, response) => {
    let name_request = request.query["name"];
    const gamedata_request = await get_game_data(name_request);
    if (gamedata_request.length < 1) {
        response.status(404);
        response.send("Error: could not find gamedata for user " + name_request);
    } else {
        response.status(200);
        response.send(gamedata_request[0]);
    }
});

app.post("/api/login", async (request, response) => {
    let name_request = request.query["name"];
    let pass_request = request.query["password"];
    let auth_request = await get_auth(name_request);
    if (auth_request.length < 1) {
        await set_auth(name_request, pass_request);
        await set_game_data(name_request, { ...gamedata_entry_default });
        response.status(200);
        response.send();
    } else {
        if (pass_request != auth_request[0].password) {
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



(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("Database available");
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

function get_game_data(username_request) {
    const query = { username: username_request };
    const options = {
        limit: 1,
    };
    const cursor = game_data_collection.find(query, options);
    return cursor.toArray();
}

async function set_game_data(name_request, game_data) {
    game_data.username = name_request;
    const result = await game_data_collection.insertOne(game_data);
    return result;
}

async function save_game_data(name_request, game_data) {
    game_data.username = name_request;
    const result = await game_data_collection.save({ username: name_request }, game_data);
    return result;
}


function get_auth(username_request, password_request) {
    const query = { 
        username: username_request
    };
    const options = {
        limit: 1
    };
    const cursor = auth_collection.find(query, options);
    return cursor.toArray();
}

async function set_auth(name_request, password_request) {
    auth_entry = {
        username: name_request,
        password: password_request
    }
    const result = await auth_collection.insertOne(auth_entry);
    return result;
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
