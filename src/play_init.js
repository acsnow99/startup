const log_max = 8;
const less_log_max = 4;
const less_log_screen_width_limit = 600;
let log_count = 0;

const gamedata_id_access_string = "gamedata_id";
const score_access_string = "score";
const healing_access_string = "healing";
const health_access_string = "health";
const enemy_health_access_string = "enemy_health";
const enemy_index_access_string = "enemy_index";
const enemy_img_src = ["images/enemy.png", "images/enemy1.png", "images/enemy2.png"];

async function get_gamedata() {
    let username = localStorage.getItem("username");
    let gamedata = {};
    try {
        let query_url = "/api/gamedata?name=" + username;
        const response = await fetch(query_url);
        if (response.status == 401) {
            window.location.href = "/";
        }
        gamedata = await response.json();
        localStorage.setItem(gamedata_id_access_string + username, gamedata._id);
        localStorage.setItem(score_access_string + username, gamedata.score);
        localStorage.setItem(enemy_health_access_string + username, gamedata.enemy_health);
        localStorage.setItem(enemy_health_access_string + username + "max", gamedata.enemy_health_max);
        localStorage.setItem(enemy_index_access_string + username, gamedata.enemy_index);
        localStorage.setItem(health_access_string + username, gamedata.health);
        localStorage.setItem(healing_access_string + username, gamedata.healing);
    } catch {
        console.log("Error: could not fetch gamedata for " + username);
    }
}

function update_username_display() {
    const local_username = localStorage.getItem("username");
    const username_display = document.createElement("h3");
    username_display.id = "username_display";
    username_display.textContent = local_username;
    const username_parent_obj = document.querySelector("#username_and_score");
    username_parent_obj.appendChild(username_display);
}
  

// TODO: refactor the two functions below into one function
function update_score_display() {
    const local_username = localStorage.getItem("username");
    const score_access_string = "score" + local_username;
    const local_score = localStorage.getItem(score_access_string);
    const score_display = document.createElement("h5");
    score_display.id = "score_display";
    if (local_score != null) {
        score_display.textContent = local_score;
    } else {
        score_display.textContent = "0";
    }
    const score_parent_object = document.querySelector("#username_and_score");
    let existing_score_display = document.getElementById("score_display");
    if (existing_score_display != null) {
        score_parent_object.removeChild(existing_score_display);
    }
    score_parent_object.appendChild(score_display);
}
function update_healing_display() {
    const local_username = localStorage.getItem("username");
    const healing_access_string = "healing" + local_username;
    const local_healing = localStorage.getItem(healing_access_string);
    const healing_display = document.createElement("div");

    healing_display.id = "healing_display";
    if (local_healing != null) {
        healing_display.textContent = "Heal! " + local_healing;
    } else {
        healing_display.textContent = "Heal! 0";
    }
    const healing_parent_object = document.querySelector("#game_button_heal");
    let existing_healing_display = document.getElementById("healing_display");
    if (existing_healing_display != null) {
        healing_parent_object.removeChild(existing_healing_display);
    }
    healing_parent_object.appendChild(healing_display);
}
function update_run_display() {
    const run_display = document.createElement("div");

    run_display.id = "run_display";
    run_display.textContent = "Run!";
    const run_parent_object = document.querySelector("#game_button_run");
    let existing_run_display = document.getElementById("run_display");
    if (existing_run_display != null) {
        run_parent_object.removeChild(existing_run_display);
    }
    run_parent_object.appendChild(run_display);
}
function update_health_display() {
    const local_username = localStorage.getItem("username");
    const health_access_string = "health" + local_username;
    const enemy_health_access_string = "enemy_health" + local_username;
    const local_health = localStorage.getItem(health_access_string);
    const local_enemy_health = localStorage.getItem(enemy_health_access_string);
    const local_enemy_health_max = localStorage.getItem(enemy_health_access_string + "max");
    const health_display = document.createElement("div");
    const enemy_health_display = document.createElement("div");

    health_display.id = "player_health";
    health_display.setAttribute("class", "game_images_hearts_container_internal player_hearts");
    var health_filled_to_display = local_health;
    var health_empty_to_display = 3-local_health;
    for (var i = 0; i < health_filled_to_display; i++) {
        var image = document.createElement("img");
        image.src = "images/heart_filled.png";
        image.setAttribute("class", "heart_image");
        health_display.appendChild(image);
    }
    for (var i = 0; i < health_empty_to_display; i++) {
        var image = document.createElement("img");
        image.src = "images/heart_outline.png";
        image.setAttribute("class", "heart_image");
        health_display.appendChild(image);
    }

    const health_parent_object = document.querySelector("#health_container");
    let existing_health_display = document.getElementById("player_health");
    if (existing_health_display != null) {
        health_parent_object.removeChild(existing_health_display);
    }
    health_parent_object.appendChild(health_display);


    enemy_health_display.setAttribute("class", "game_images_hearts_container_internal");
    enemy_health_display.setAttribute("id", "enemy_health");
    var health_filled_to_display = local_enemy_health;
    var health_empty_to_display = local_enemy_health_max-local_enemy_health;
    for (var i = 0; i < health_empty_to_display; i++) {
        var image = document.createElement("img");
        image.src = "images/heart_outline.png";
        image.setAttribute("class", "heart_image");
        enemy_health_display.appendChild(image);
    }
    for (var i = 0; i < health_filled_to_display; i++) {
        var image = document.createElement("img");
        image.src = "images/heart_filled.png";
        image.setAttribute("class", "heart_image");
        enemy_health_display.appendChild(image);
    }

    let existing_enemy_health_display = document.getElementById("enemy_health");
    if (existing_enemy_health_display != null) {
        health_parent_object.removeChild(existing_enemy_health_display);
    }
    health_parent_object.appendChild(enemy_health_display);

}

function update_log_display(message) {
    const log_parent = document.getElementById("game_log_container");
    const log_message_element = document.createElement("p");
    log_message_element.id = "log" + String(log_count++);
    if (window.innerWidth > less_log_screen_width_limit && log_count > log_max) {
        let log_old = document.getElementById("log" + String(log_count - log_max - 1));
        log_parent.removeChild(log_old);
        let log_second_old = document.getElementById("log" + String(log_count - log_max));
        log_second_old.setAttribute("style", "opacity: 20%")
    } else if (log_count > less_log_max) {
        let log_old = document.getElementById("log" + String(log_count - less_log_max - 1));
        log_parent.removeChild(log_old);
        let log_second_old = document.getElementById("log" + String(log_count - less_log_max));
        log_second_old.setAttribute("style", "opacity: 20%")
    }
    log_message_element.textContent = message;
    log_parent.appendChild(log_message_element);
}

function update_enemy_image() {
    const local_username = localStorage.getItem("username");
    const enemy_img_obj = document.querySelector("#monster_image");
    const enemy_index = localStorage.getItem(enemy_index_access_string + local_username);
    const enemy_image = enemy_img_src[enemy_index];
    enemy_img_obj.src = enemy_image;
}

function update_display() {
    update_username_display();
    update_score_display();
    update_healing_display();
    update_health_display();
    update_run_display();
    update_enemy_image();
}

async function init_display() {
    await get_gamedata();
    update_display();
}

export { init_display, update_enemy_image, update_health_display, update_healing_display, update_score_display, update_log_display };