const socket = io();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const speed = 5;

// Main game loop
function update() {
    window.requestAnimationFrame(update);
    socket.emit("update game");
};

socket.on("update game", (plr, bg) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bg.color;
    ctx.fillRect(bg.x, bg.y, bg.w, bg.h); 
    ctx.fillStyle = plr.color;
    ctx.fillRect(plr.x, plr.y, plr.w, plr.h);
});

// Move Player
window.addEventListener('keydown', function (e) {
    if (e.defaultPrevented) {
        return;
    }
    switch (e.key) {
        case "ArrowLeft":
            socket.emit("moveX", -speed);
            break;
        case "ArrowUp":
            socket.emit("moveY", -speed);
            break;
        case "ArrowRight":
            socket.emit("moveX", speed);
            break;
        case "ArrowDown":
            socket.emit("moveY", speed);
            break;
    }
});


// Stop Player
window.addEventListener('keyup', function (e) {
    if (e.defaultPrevented) {
        return;
    }
    switch (e.key) {
        case "ArrowLeft":
            socket.emit("moveX", 0);
            break;
        case "ArrowUp":
            socket.emit("moveY", 0);
            break;
        case "ArrowRight":
            socket.emit("moveX", 0);
            break;
        case "ArrowDown":
            socket.emit("moveY", 0);
            break;
    }
});

window.requestAnimationFrame(update);
