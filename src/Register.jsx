import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    async function submit_register_and_advance_to_play() {
        const input_username = document.querySelector("#username").value;
        const input_password = document.querySelector("#password").value;
    
        localStorage.setItem("username", input_username);
        
        try {
            let query_url = "/api/register?name=" + input_username + "&password=" + input_password;
            const response = await fetch(query_url, { method : "POST" });
            if (response.status == 409) {
                throw new Error("Error: username taken");
            }
            console.log("Sent username to server");
        } catch (error) {
            let username_parent = document.querySelector("#login_form");
            let username_taken_element = document.createElement("p");
            username_taken_element.className = "username_taken_message";
            username_taken_element.id = "username_taken_message";
            username_taken_element.innerText = "Hero name taken...";
            username_parent.appendChild(username_taken_element);
            console.log(error.message);
        }
    }

    return (
        <main>
            <div id="login_form" className="login_form">
                <h1>Welcome, brave adventurer. Create a Guild account:</h1>
                <div className="login_form_internal">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="username" className="form-control" id="username" placeholder="Username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required />
                </div>
                <button id="btn_submit_login" className="btn btn-primary btn-login" onClick={async () => {await submit_register_and_advance_to_play(); navigate("/play")}}>Register</button>
                </div>
                <div>Already have a Guild account? Login <NavLink to="/">here.</NavLink></div>
            </div>
        </main>
    );
}

export {Register};
