
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

const uuid = require("uuid");


app.use(express.json());

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

app.post("/api/register", async (request, response) => {
    let name_request = request.query["name"];
    let pass_request = request.query["password"];
    let auth_request = await get_auth(name_request);
    if (auth_request.length < 1) {
        let user_obj = {
            username: name_request,
            password: pass_request,
            token: uuid.v4()
        }
        await set_auth(user_obj);
        await set_game_data(name_request, { ...gamedata_entry_default });
        response.status(200);
        response.send(user_obj);
    } else {
        response.status(409);
        response.send("Error: username taken");
    }
});

app.post("/api/login", async (request, response) => {
    let name_request = request.query["name"];
    let pass_request = request.query["password"];
    let auth_request = await get_auth(name_request);
    if (auth_request.length < 1 || pass_request != auth_request[0].password) {
        response.status(401);
        response.send("Error: incorrect password");
    } else {
        let user_obj = {
            username: name_request,
            password: pass_request,
            token: uuid.v4()
        }
        await set_auth(user_obj);
        response.setHeader("Set-Cookie", "auth=" + user_obj.token);
        response.status(200);
        response.send(user_obj);
    }
});

app.post("/api/gamedata", (request, response) => {
    let name_request = request.query["name"];
    const gamedata_set = JSON.parse(request.query["gamedata"]);
    if (gamedata_set === undefined) {
        response.status(400);
        response.send("Error: Missing gamedata in request");
    } else {
        save_game_data(name_request, gamedata_set);
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
    let filter = {
        username: name_request
    }
    let update = {
        $set: {
            score: game_data.score,
            health: game_data.health,
            health_max: game_data.health_max,
            healing: game_data.healing,
            enemy_index: game_data.enemy_index,
            enemy_health: game_data.enemy_health,
            enemy_health_max: game_data.enemy_health_max
        }
    }
    const result = await game_data_collection.updateOne(filter, update);
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

async function set_auth(auth_entry) {
    const result = await auth_collection.insertOne(auth_entry);
    return result;
}


let gamedata_entry_default = {
    score : 1002,
    health : 2,
    health_max : 3,
    healing : 5,
    enemy_index : 1,
    enemy_health : 2,
    enemy_health_max : 2
}


app.listen(port);

