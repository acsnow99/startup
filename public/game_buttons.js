console.log("Game buttons script loaded");

let enemy_index = 0;
const local_username = localStorage.getItem("username");
const score_access_string = "score" + local_username;
const healing_access_string = "healing" + local_username;
const health_access_string = "health" + local_username;
const enemy_health_access_string = "enemy_health" + local_username;
const enemy_index_access_string = "enemy_index" + local_username;
const enemy_img_src = ["images/monster.jpg", "images/monster1.jpeg"];
const enemy_names = ["zombie", "landsquid"];
const run_cost = -200;
const base_win_score = 200;
const win_score_multiplier = 102;
const lose_cost = -1000;
const take_damage_chance = 0.4;

document.querySelector("#game_button_run")?.addEventListener('click', function(event) { 
    console.log("run button clicked");
    const local_score = localStorage.getItem(score_access_string);
    if (local_score >= Math.abs(run_cost)) {
        update_enemy_health_count(-20, false);
        update_score_count(run_cost);
        update_healing_count(1);
    }
});

document.querySelector("#game_button_heal")?.addEventListener('click', function(event) {
    console.log("heal button clicked");
    const local_healing = localStorage.getItem(healing_access_string);
    if (!health_is_at_max() && local_healing > 0) {
        update_healing_count(-1);
        update_health_count(1);
    }
});

// monster health -= 1; a chance of player health -= 1; 
//  if monster or player is defeated, server backup is updated
document.querySelector("#game_button_fight")?.addEventListener('click', function(event) {
    console.log("fight button clicked");
    const random_seed = Math.random();
    // if monster will be defeated, update server backup
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
});

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
        update_log_display(local_username + " was defeated by a " + enemy_names[enemy_index] + " and lost " + String(Math.abs(lose_cost)) + "g!");
        console.log("player lost");
        new_health = 3;
        update_score_count(lose_cost);
        update_score_display();
        update_enemy_health_count(-20, false);
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
            const message = local_username + " defeated a " + enemy_names[enemy_index] + " and earned " + String(score_win) + "g!";
            update_log_display(message);
            update_score_count(score_win);
        }
        update_monster_image();
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
    localStorage.setItem(score_access_string, new_score);
    update_score_display();
}
function update_monster_image() {
    const enemy_img_obj = document.querySelector("#monster_image");
    enemy_index = (enemy_index + 1) % 2;
    enemy_img_obj.src = enemy_img_src[enemy_index];
}

async function update_gamedata_server() {
    const gamedata = {
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
}

