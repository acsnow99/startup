console.log("Game buttons script loaded");

monster_image_index = 0;
const local_username = localStorage.getItem("username");
const score_access_string = "score" + local_username;
const healing_access_string = "healing" + local_username;
const health_access_string = "health" + local_username;
const enemy_health_access_string = "enemy_health" + local_username;
const run_cost = -200;

document.querySelector("#game_button_run")?.addEventListener('click', function(event) { 
    console.log("run button clicked");
    monster_img_obj = document.querySelector("#monster_image");
    monster_img_src = ["images/monster.jpg", "images/monster1.jpeg"];
    monster_image_index = (monster_image_index + 1) % 2;
    monster_img_obj.src = monster_img_src[monster_image_index];

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
    if (random_seed < 0.3) {
        update_health_count(-1);
    }
    update_enemy_health_count(-1);
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
    localStorage.setItem(health_access_string, new_health);
    update_health_display();
}
function update_enemy_health_count(count) {
    const local_enemy_health = localStorage.getItem(enemy_health_access_string);
    let new_enemy_health = Number(local_enemy_health) + count;
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

