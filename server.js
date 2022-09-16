const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' }});
const PORT = 3000;

// Middleware
app.use(express.static('public'));

server.listen(PORT, ()=>{
    console.log(`App runninig on: http://localhost:${PORT}`);
});

const plr = { //player data
    "x": 250,
    "y": 250,
    "w": 20,
    "h": 20,
    "speedx": 0,
    "speedy": 0,
    "color": "red"
};
const bg = { //canvas data
    "x": 0,
    "y": 0,
    "w": 500,
    "h": 500,
    "color": "black"
};
function move_player() {
    if((plr.x+ plr.speedx) > 0 && (plr.x + plr.w + plr.speedx) < bg.w){
        plr.x += plr.speedx
    };
    if((plr.y + plr.speedy) > 0 && (plr.y + plr.h + plr.speedy) < bg.h){
        plr.y += plr.speedy
    }
};

io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);
    socket.on("update game", () => {
        move_player();
        io.sockets.emit("update game", plr, bg);
    });

    socket.on("moveX", (data) => {
        plr.speedx = data;   
    });
    socket.on("moveY", (data) => {
        plr.speedy = data;  
    });
});
