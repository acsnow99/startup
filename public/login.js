console.log("Form submit script loaded")
submit_login_and_advance_to_play = async function(event) {
    const input_username = document.querySelector("#username").value;
    const input_password = document.querySelector("#password").value;

    localStorage.setItem("username", input_username);
    
    try {
        let query_url = "/api/login?name=" + input_username + "&password=" + input_password;
        const response = await fetch(query_url, { method : "POST" });
        if (response.status == 401) {
            throw new Error("Error: incorrect password");
        }
        let body = await response.json();
        console.log("Sent username to server");
        window.location.href = "play.html";
    } catch (error) {
        let username_parent = document.querySelector("#login_form");
        let existing_username_taken_element = document.querySelector("#username_taken_message");
        let username_taken_element = document.createElement("p");
        username_taken_element.className = "username_taken_message";
        username_taken_element.id = "username_taken_message";
        username_taken_element.innerText = "Password incorrect...";
        if (existing_username_taken_element != undefined) {
            username_parent.removeChild(existing_username_taken_element);
        }
        username_parent.appendChild(username_taken_element);

        console.log(error.message);
    }
}
