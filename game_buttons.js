console.log("Game buttons script loaded");

monster_image_index = 0;
const local_username = localStorage.getItem("username");
const score_access_string = "score" + local_username;
const healing_access_string = "healing" + local_username;
const health_access_string = "health" + local_username;
const enemy_health_access_string = "enemy_health" + local_username;
const monster_img_src = ["images/monster.jpg", "images/monster1.jpeg"];
const run_cost = -200;
const base_win_score = 200;
const win_score_multiplier = 52;
const lose_cost = -2000;

document.querySelector("#game_button_run")?.addEventListener('click', function(event) { 
    console.log("run button clicked");
    update_monster_image();
    update_score_count(run_cost);
    update_healing_count(1);
});

document.querySelector("#game_button_heal")?.addEventListener('click', function(event) {
    console.log("heal button clicked");
    if (!health_is_at_max()) {
        update_healing_count(-1);
        update_health_count(1);
    }
});

document.querySelector("#game_button_fight")?.addEventListener('click', function(event) {
    console.log("fight button clicked");
    const random_seed = Math.random();
    update_enemy_health_count(-1);
    if (random_seed < 0.3) {
        update_health_count(-1);
    }
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
    localStorage.setItem(health_access_string, new_health);
    update_health_display();
}
function update_health_count(count) {
    const local_health = localStorage.getItem(health_access_string);
    let new_health = Number(local_health) + count;
    if (new_health <= 0) {
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
            update_score_count(base_win_score + win_score_multiplier * local_enemy_health_max);
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
    const monster_img_obj = document.querySelector("#monster_image");
    monster_image_index = (monster_image_index + 1) % 2;
    monster_img_obj.src = monster_img_src[monster_image_index];
}

