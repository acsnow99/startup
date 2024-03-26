
const socket = new WebSocket(`ws://${window.location.host}`);

socket.onmessage = async (event) => {
    (console.log("Message received"));
}
