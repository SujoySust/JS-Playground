const http = require("http");
const WebSocketServer = require("websocket").server;
let connections = [];

const httpserver = http.createServer();

const websocket = new WebSocketServer({"httpServer": httpserver});

httpserver.listen(3000, ()=> console.log("My server is listening on port 3000"));

websocket.on("request", request => {
    const connection = request.accept(null, request.origin);
    connection.on("message", message => {
        connections.forEach(c => c.send(`User${connection.socket.remotePort} says ${message.utf8Data}`));
    });

    connections.push(connection);
    connections.forEach(c=> c.send(`User${connection.socket.remotePort} just connected`));
})