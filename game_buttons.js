console.log("Game buttons script loaded");

monster_image_index = 0;

document.querySelector("#game_button_run")?.addEventListener('click', function(event) { 
    console.log("run button clicked");
    monster_img_obj = document.querySelector("#monster_image");
    monster_img_src = ["images/monster.jpg", "images/monster1.jpeg"];
    monster_image_index = (monster_image_index + 1) % 2;
    monster_img_obj.src = monster_img_src[monster_image_index];


    const run_cost = 200;

    const local_username = localStorage.getItem("username");
    const score_access_string = "score" + local_username;
    const local_score = localStorage.getItem(score_access_string);
    let new_score = local_score - run_cost;
    localStorage.setItem(score_access_string, new_score);

    update_score_display();
});


