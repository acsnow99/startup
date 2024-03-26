
const socket = new WebSocket(`ws://${window.location.host}`);

socket.onmessage = async (event) => {
    const message = await event.data.text();
    update_log_display(message);
}
