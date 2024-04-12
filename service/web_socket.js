
const { WebSocketServer } = require('ws');
const UUID = require("uuid");
console.log("Websocket loaded");

function web_socket_server(http_server) {
    const wss = new WebSocketServer({ noServer: true });
    let connections = new Array();
    console.log("Init array");

    http_server.on("upgrade", (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit("connection", ws, request);
        });
    });

    wss.on("connection", (ws) => {
        const connection = { id: UUID.v4(), alive: true, ws: ws };
        connections.push(connection);

        ws.on("message", function message(message) {
            connections.forEach((conn) => {
                if (conn !== connection) {
                    conn.ws.send(message);
                }
            });
        });

        ws.on("pong", () => {
            connection.alive = true;
        });
    });


    setInterval(() => {
        connections.forEach((connection) => {
            if (!connection.alive) {
                connection.ws.terminate();
            } else {
                connection.alive = false;
                connection.ws.ping();
            }
        });
    }, 10000);
}

module.exports = { web_socket_server };
