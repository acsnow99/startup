
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}`);

function activate_receive_websocket() {
    
    socket.onmessage = async (event) => {
        const message = await event.data.text();
        update_log_display(message);
    }
}


async function send_websocket_message(message) {
    var ready = false;
    var attempts = 0;
    while (!ready && attempts < 1000) {
        attempts += 1;
        ready = socket.readyState == WebSocket.OPEN;
    }
    socket.send(message);
}

export {activate_receive_websocket, send_websocket_message};
