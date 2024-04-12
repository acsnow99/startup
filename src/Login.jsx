function Login() {
    async function submit_login_and_advance_to_play(event) {
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
    

    return (<main>
        <div id="login_form" className="login_form">
          <h1>Welcome, brave adventurer. Provide your Guild credentials:</h1>
          <div className="login_form_internal">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="username" className="form-control" id="username" placeholder="Username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" placeholder="Password" required />
            </div>
            <button id="btn_submit_login" className="btn btn-primary btn-login" onClick={submit_login_and_advance_to_play}>Login</button>
          </div>
          <div>New to the Guild? Register your hero <a href="register.html">here.</a></div>
        </div>
      </main>);
}


export { Login };