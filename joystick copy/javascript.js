var canvas, ctx;

window.addEventListener('load', () => {

    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');          
    resize(); 

    document.addEventListener('mousedown', startDrawing);
    document.addEventListener('mouseup', stopDrawing);
    document.addEventListener('mousemove', Draw);

    document.addEventListener('touchstart', startDrawing);
    document.addEventListener('touchend', stopDrawing);
    document.addEventListener('touchcancel', stopDrawing);
    document.addEventListener('touchmove', Draw);
    window.addEventListener('resize', resize);

    document.getElementById("x_coordinate").innerText = 0;
    document.getElementById("y_coordinate").innerText = 0;
    document.getElementById("speed").innerText = 0;
    document.getElementById("angle").innerText = 0;
});


var width, height, radius, x_orig, y_orig;
var x_upArrow, y_upArrow, upRadius, x_downArrow, y_downArrow, downRadius;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    radius = 130;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    background();
    joystick(width / 4, height / 2);
    upArrow(false);
    downArrow(false);
}

function background() {
    x_orig = width / 4;
    y_orig = height / 2;

    ctx.beginPath();
    ctx.arc(x_orig, y_orig, radius + 20, 0, Math.PI * 2, true);
    ctx.fillStyle = '#ECE5E5';
    ctx.fill();
}

function joystick(width, height) {
    ctx.beginPath();
    ctx.arc(width, height, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = '#F08080';
    ctx.fill();
    ctx.strokeStyle = '#F6ABAB';
    ctx.lineWidth = 8;
    ctx.stroke();
}

function upArrow(pushUp) {
    x_upArrow = (3*width) / 4;
    y_upArrow = height/2 - 80;
    upRadius = 65;
    var tall = 40;
    ctx.beginPath();
    ctx.arc(x_upArrow, y_upArrow, upRadius, 0, Math.PI * 2, true);

    // ctx.beginPath();
    // ctx.moveTo(x_upArrow - 55, y_upArrow);
    // ctx.lineTo(x_upArrow + 55, y_upArrow);
    // ctx.lineTo(x_upArrow, y_upArrow - 75);
    // ctx.closePath();

    // ctx.fillStyle = '#F08080';
    // ctx.fill();

    // ctx.strokeStyle = '#ECE5E5';
    // ctx.lineWidth = 8;
    // ctx.stroke();
    
    if (pushUp == false) {
        ctx.fillStyle = '#ECE5E5';
        ctx.fill();
    } else {
        ctx.fillStyle = '#F08080';
        ctx.fill();  
    }

    ctx.moveTo(x_upArrow - tall/2, y_upArrow + tall/2);
    ctx.lineTo(x_upArrow + tall/2, y_upArrow + tall/2);
    ctx.lineTo(x_upArrow, y_upArrow - 2*tall/3);
    ctx.closePath();
    ctx.stroke();
}

function downArrow(pushDown) {
    x_downArrow = (3*width) / 4;
    y_downArrow = height/2 + 80;
    downRadius = 65;
    ctx.beginPath();
    ctx.arc(x_downArrow, y_downArrow, downRadius, 0, Math.PI * 2, true);
    var tall = 40;

    // ctx.beginPath();
    // ctx.moveTo(x_downArrow - 55, y_downArrow);
    // ctx.lineTo(x_downArrow + 55, y_downArrow);
    // ctx.lineTo(x_downArrow, y_downArrow + 75);
    // ctx.closePath();

    // ctx.fillStyle = '#F08080';
    // ctx.fill();

    // ctx.strokeStyle = '#ECE5E5';
    // ctx.lineWidth = 8;
    // ctx.stroke();

    if (pushDown == false) {
        ctx.fillStyle = '#ECE5E5';
        ctx.fill();
    } else {
        ctx.fillStyle = '#F08080';
        ctx.fill(); 
    }

    ctx.moveTo(x_downArrow - tall/2, y_downArrow - 2*tall/3);
    ctx.lineTo(x_downArrow + tall/2, y_downArrow - 2*tall/3);
    ctx.lineTo(x_downArrow, y_downArrow + tall/2);
    ctx.closePath();
    ctx.stroke();
}

let coord = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
    var mouse_x = event.clientX || event.touches[0].clientX;
    var mouse_y = event.clientY || event.touches[0].clientY;
    coord.x = mouse_x - canvas.offsetLeft;
    coord.y = mouse_y - canvas.offsetTop;
}

function is_it_in_the_circle() {
    var current_radius = Math.sqrt(Math.pow(coord.x - x_orig, 2) + Math.pow(coord.y - y_orig, 2));
    if (radius >= current_radius) return true
    else return false
}

function inReach() {
    var current_radius = Math.sqrt(Math.pow(coord.x - x_orig, 2) + Math.pow(coord.y - y_orig, 2));
    if (current_radius <= radius + 225) return true
    else return false
}

function is_it_in_upArrow() {
    var current_radius = Math.sqrt(Math.pow(coord.x - x_upArrow, 2) + Math.pow(coord.y - y_upArrow, 2));
    if (upRadius >= current_radius) return true
    else return false
}

function is_it_in_downArrow() {
    var current_radius = Math.sqrt(Math.pow(coord.x - x_downArrow, 2) + Math.pow(coord.y - y_downArrow, 2));
    if (downRadius >= current_radius) return true
    else return false
}


function startDrawing(event) {
    paint = true;
    getPosition(event);
    if (is_it_in_the_circle()) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        joystick(coord.x, coord.y);
        Draw();
    }

    if (is_it_in_upArrow()) {
        upArrow(true);
    }

    if (is_it_in_downArrow()) {
        downArrow(true);
    }
}


function stopDrawing() {
    paint = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();
    joystick(width / 4, height / 2);
    upArrow(false);
    downArrow(false);
    document.getElementById("x_coordinate").innerText = 0;
    document.getElementById("y_coordinate").innerText = 0;
    document.getElementById("speed").innerText = 0;
    document.getElementById("angle").innerText = 0;

}

function Draw(event) {

    if (paint) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        upArrow(false);
        downArrow(false);
        var angle_in_degrees, x, y, speed;
        var angle = Math.atan2((coord.y - y_orig), (coord.x - x_orig));

        if (inReach()) {

            if (Math.sign(angle) == -1) {
                angle_in_degrees = Math.round(-angle * 180 / Math.PI);
            }
            else {
                angle_in_degrees =Math.round( 360 - angle * 180 / Math.PI);
            }

            if (is_it_in_the_circle()) {
                joystick(coord.x, coord.y);
                x = coord.x;
                y = coord.y;
            }
            else {
                x = radius * Math.cos(angle) + x_orig;
                y = radius * Math.sin(angle) + y_orig;
                joystick(x, y);
            }

            getPosition(event);

            var speed =  Math.round(100 * Math.sqrt(Math.pow(x - x_orig, 2) + Math.pow(y - y_orig, 2)) / radius);

            var x_relative = Math.round(x - x_orig);
            var y_relative = Math.round(y - y_orig);
            

            document.getElementById("x_coordinate").innerText =  x_relative;
            document.getElementById("y_coordinate").innerText =-y_relative ;
            document.getElementById("speed").innerText = speed;
            document.getElementById("angle").innerText = angle_in_degrees;

            send(x_relative,y_relative,speed,angle_in_degrees);
        } else {
            joystick(x_orig, y_orig)
        }

    }
} 