
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}`);

socket.onmessage = async (event) => {
    const message = await event.data.text();
    update_log_display(message);
}

console.log("Websocket ready");
