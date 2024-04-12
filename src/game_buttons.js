import { update_enemy_image, update_health_display, update_healing_display, update_score_display, update_log_display } from "./play_init";

const local_username = localStorage.getItem("username");
const score_access_string = "score" + local_username;
const healing_access_string = "healing" + local_username;
const health_access_string = "health" + local_username;
const enemy_health_access_string = "enemy_health" + local_username;
const enemy_index_access_string = "enemy_index" + local_username;

let enemy_index = 0;
const enemy_img_src = ["images/enemy.jpg", "images/enemy1.jpeg"];
const enemy_names = ["zombie", "landsquid"];
const run_cost = -200;
const base_win_score = 200;
const win_score_multiplier = 102;
const lose_cost = -1000;
const random_min = 0;
const random_max = 1000;
const random_numbers_count = 50;
const take_damage_chance = 375;
var random_numbers = [100, 500, 300, 700, 500, 300];
get_random_numbers(random_min, random_max, random_numbers_count);
const score_websocket_message_threshold = 5000;
let previous_high_score = 0;

function player_run() { 
    const local_score = localStorage.getItem(score_access_string);
    if (local_score >= Math.abs(run_cost)) {
        update_enemy_health_count(-20, false);
        update_score_count(run_cost);
        update_healing_count(1);
    }
}

function player_heal() {
    const local_healing = localStorage.getItem(healing_access_string);
    if (!health_is_at_max() && local_healing > 0) {
        update_healing_count(-1);
        update_health_count(1);
    }
}

// enemy health -= 1; a chance of player health -= 1; 
//  if enemy or player is defeated, server backup is updated
async function player_attack() {
    const random_index = Math.floor(Math.random() * (random_numbers_count - 1));
    const random_seed = random_numbers[random_index];
    // if enemy will be defeated, update server backup
    var will_update_server = localStorage.getItem(enemy_health_access_string) <= 1;
    if (random_seed < take_damage_chance) {
        update_health_count(-1);
        // enemy will not take damage if the player just died
        const local_health = localStorage.getItem(health_access_string);
        if (local_health < 3) {
            update_enemy_health_count(-1);
        }
        // if player has been defeated, update server backup
        will_update_server = will_update_server || local_health <= 0;
    } else {
        update_enemy_health_count(-1);
    }

    if (will_update_server) { update_gamedata_server(); }
}

function update_healing_count(count) {
    const local_healing = localStorage.getItem(healing_access_string);
    let new_healing = Number(local_healing) + count;
    localStorage.setItem(healing_access_string, new_healing);
    update_healing_display();
}
function update_health_count(count) {
    const local_health = localStorage.getItem(health_access_string);
    let new_health = Number(local_health) + count;
    if (new_health <= 0) {
        alert("You were defeated by a " + enemy_names[enemy_index] + "! You lost " + String(Math.abs(lose_cost)) + "g.");
        let log_string = local_username + " was defeated by a " + enemy_names[enemy_index] + " and lost " + String(Math.abs(lose_cost)) + "g!";
        send_websocket_message(log_string);
        console.log("player lost");
        new_health = 3;
        update_score_count(lose_cost);
        update_score_display();
        update_enemy_health_count(-20, false);
        update_gamedata_server();
    }
    localStorage.setItem(health_access_string, new_health);
    console.log("player health decreased");
    update_health_display();
}
function update_enemy_health_count(count, player_gets_score_for_win=true) {
    const local_enemy_health = localStorage.getItem(enemy_health_access_string);
    let new_enemy_health = Number(local_enemy_health) + count;
    // when enemy dies, reset its health and image
    if (new_enemy_health <= 0) {
        console.log("new enemy");
        new_enemy_health = Math.floor(Math.random() * 3) + 2;
        const local_enemy_health_max = localStorage.getItem(enemy_health_access_string + "max");
        localStorage.setItem(enemy_health_access_string + "max", new_enemy_health);
        if (player_gets_score_for_win) {
            const score_win = base_win_score + win_score_multiplier * local_enemy_health_max;
            update_score_count(score_win);
        }
        update_enemy_image_index();
    }
    localStorage.setItem(enemy_health_access_string, new_enemy_health);
    update_health_display();
}
function health_is_at_max() {
    return localStorage.getItem(health_access_string) >= 3;
}
function update_score_count(count) {
    const local_score = localStorage.getItem(score_access_string);
    let new_score = Number(local_score) + count;
    if (new_score < 0) {
        new_score = 0;
    }
    if (new_score >= Number(previous_high_score) + score_websocket_message_threshold) {
        send_websocket_message(`${local_username} reached ${new_score}g!`);
        previous_high_score = new_score;
    } else if (new_score < Number(previous_high_score) - (score_websocket_message_threshold/2)) {
        send_websocket_message(`${local_username} dropped down to ${new_score}g.`);
        previous_high_score = new_score;
    }
    localStorage.setItem(score_access_string, new_score);
    update_score_display();
}
function update_enemy_image_index() {
    const enemy_index_current = Number(localStorage.getItem(enemy_index_access_string));
    const enemy_index_updated = (enemy_index_current + 1) % 2;
    localStorage.setItem(enemy_index_access_string, enemy_index_updated);
    update_enemy_image();
}

async function update_gamedata_server() {
    const gamedata = {
        //_id: localStorage.getItem(gamedata_id_access_string),
        enemy_health: localStorage.getItem(enemy_health_access_string),
        enemy_health_max: localStorage.getItem(enemy_health_access_string + "max"),
        enemy_index: enemy_index,
        healing: localStorage.getItem(healing_access_string),
        health: localStorage.getItem(health_access_string),
        health_max: 3,
        score: localStorage.getItem(score_access_string),
    }
    let query_url = "/api/gamedata?name=" + local_username + "&gamedata=" + JSON.stringify(gamedata);
    const response = await fetch(query_url, { method : "POST", contentType: "application/JSON" });
    if (response.status == 401) {
        window.location.href = "index.html";
    }
}

async function get_random_numbers(min, max, count) {
    const request_url = "https://www.random.org/integers/?num=" + count + "&min=" + min + "&max=" + max + "&col=1&base=10&format=plain&rnd=new";
    const response = await fetch(request_url);
    const response_text = await response.text();
    random_numbers = response_text.split("\n");
}


const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
socket.onmessage = async (event) => {
    const message = await event.data.text();
    update_log_display(message);
}


async function send_websocket_message(message) {
    var ready = false;
    var attempts = 0;
    while (!ready && attempts < 1000) {
        attempts += 1;
        ready = socket.readyState == WebSocket.OPEN;
    }
    socket.send(message);
}


export { player_run, player_heal, player_attack };
