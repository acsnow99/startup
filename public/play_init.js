async function getGamedata() {
    let username = localStorage.getItem("username");
    let gamedata = {};
    try {
        let query_url = "/api/gamedata?name=" + username;
        const response = await fetch(query_url);
        gamedata = await response.json();
        console.log(gamedata);
    } catch {
        console.log("Error: could not fetch gamedata for " + username);
    }
}

getGamedata();
