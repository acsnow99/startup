function Login() {
    return (<main>
        <form action="javascript:submit_login_and_advance_to_play()" id="login_form" className="login_form">
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
            <button id="btn_submit_login" className="btn btn-primary btn-login">Login</button>
          </div>
          <div>New to the Guild? Register your hero <a href="register.html">here.</a></div>
        </form>
        <script src="login.js"></script>
      </main>);
}


export { Login };