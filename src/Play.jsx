function Play() {
    return <Play>
        <form action="javascript:submit_login_and_advance_to_play()" id="login_form" class="login_form">
        <h1>Welcome, brave adventurer. Provide your Guild credentials:</h1>
        <div class="login_form_internal">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="username" class="form-control" id="username" placeholder="Username" required></input>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" placeholder="Password" required></input>
          </div>
          <button id="btn_submit_login" class="btn btn-primary btn-login">Login</button>
        </div>
        <div>New to the Guild? Register your hero <a href="register.html">here.</a></div>
      </form>
    </Play>
}


export { Play };