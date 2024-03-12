console.log("Form submit script loaded")
username = "";
submit_login_and_advance_to_play = async function(event) {
    const input_username = document.querySelector("#username").value;
    const input_password = document.querySelector("#password").value;
    const score_access_string = "score" + input_username;
    const local_score = localStorage.getItem(score_access_string);
    if (local_score == null) {
        localStorage.setItem(score_access_string, 500);
    }
    const healing_access_string = "healing" + input_username;
    const local_healing = localStorage.getItem(healing_access_string);
    if (local_healing == null) {
        localStorage.setItem(healing_access_string, 1);
    }
    const health_access_string = "health" + input_username;
    const local_health = localStorage.getItem(health_access_string);
    if (local_health == null) {
        localStorage.setItem(health_access_string, 2);
    }
    const enemy_health_access_string = "enemy_health" + input_username;
    const local_enemy_health = localStorage.getItem(enemy_health_access_string);
    if (local_enemy_health == null) {
        localStorage.setItem(enemy_health_access_string + "max", 2);
        localStorage.setItem(enemy_health_access_string, 2);
    }
    localStorage.setItem("username", input_username);
    
    try {
        let query_url = "/api/login?name=" + input_username + "&password=" + input_password;
        const response = await fetch(query_url, { method : "POST" });
        if (response.status == 409) {
            throw new Error("Error: username taken");
        }
        console.log("Sent username to server");
        window.location.href = "play.html";
    } catch (error) {
        let username_parent = document.querySelector("#login_form");
        let username_taken_element = document.createElement("p");
        username_taken_element.className = "username_taken_message";
        username_taken_element.id = "username_taken_message";
        username_taken_element.innerText = "Hero name already taken or password incorrect...";
        username_parent.appendChild(username_taken_element);

        console.log(error.message);
    }
}
