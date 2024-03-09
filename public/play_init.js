async function getGamedata() {
    let gamedata = {};
    try {
        const response = await fetch("/api/gamedata?Alex");
        gamedata = await response.json();
        console.log(gamedata);
    } catch {
        console.log("Error: could not fetch gamedata for Alex");
    }
}

getGamedata();
