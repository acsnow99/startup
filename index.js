
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static("public"));

var api_router = express.Router();

app.get("/api/gamedata", (request, response) => {
    response.send(gamedata.get("Alex"));
});


app.listen(port);


let gamedata = new Map();
let gamedata_entry = {
    score : 5678,
    health : 1,
    healing : 4,
    enemy_index : 1,
    enemy_health : 1,
}
gamedata.set("Alex", gamedata_entry);
