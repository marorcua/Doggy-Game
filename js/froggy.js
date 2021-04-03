let img = new Image()
img.src = "./Images/dog_scottie.png"
img.onload = function () {
    init()
    drawCar()
}

let carImg = new Image()
carImg.src = "./Images/car-truck1.png"

let keyPresses = {}
const MOVEMENT_SPEED = 2.8
let positionX = 0
let positionY = 0

const FACING_DOWN = 0
const FACING_UP = 3
const FACING_LEFT = 1
const FACING_RIGHT = 2
let currentDirection = FACING_DOWN

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true
    console.log(keyPresses)
}

window.addEventListener('keyup', keyUpListener, false)
function keyUpListener(event) {
    keyPresses[event.key] = false
    console.log(keyPresses)
}



let canvas = document.querySelector('canvas')

let ctx = canvas.getContext('2d')
let scale = 1.5
const doggyWidth = 48
const doggyHeight = 50
const scaledWidth = doggyWidth * scale
const scaledHeight = doggyHeight * scale
const cycleLoop = [0, 1, 0, 2]
let frameCount = 0
let currentLoopIndex = 0
const frameLimit = 6
let carPosX = 0
let carPosY = 0

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * doggyWidth, frameY * doggyHeight, doggyWidth, doggyHeight,
        canvasX, canvasY, scaledWidth, scaledHeight);
    ctx.save()
    ctx.translate(250, 250)
    ctx.rotate(Math.PI / 2)
    ctx.drawImage(carImg, carPosX, carPosY, carWidth, carHeight)
    //ctx.rotate(-Math.PI / 2)
    ctx.restore();
}

function init() {
    // future animation code goes here
    // drawFrame(0, 0, 0, 0);
    // drawFrame(1, 0, scaledWidth, 0);
    // drawFrame(0, 0, scaledWidth * 2, 0);
    // drawFrame(2, 0, scaledWidth * 3, 0);
    //window.requestAnimationFrame(step);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let doggyMovement = false

    if (keyPresses.ArrowUp) {
        positionY -= MOVEMENT_SPEED;
        currentDirection = FACING_UP;
        doggyMovement = true

    } else if (keyPresses.ArrowDown) {
        positionY += MOVEMENT_SPEED;
        currentDirection = FACING_DOWN;
        doggyMovement = true
    }
    if (keyPresses.ArrowLeft) {
        positionX -= MOVEMENT_SPEED;
        currentDirection = FACING_LEFT;
        doggyMovement = true

    } else if (keyPresses.ArrowRight) {
        positionX += MOVEMENT_SPEED;
        currentDirection = FACING_RIGHT;
        doggyMovement = true

    }
    //drawFrame(0, currentDirection, positionX, positionY);
    //window.requestAnimationFrame(init);

    if (doggyMovement) {
        frameCount++
        if (frameCount >= frameLimit) {
            frameCount = 0
            currentLoopIndex++
            if (currentLoopIndex >= cycleLoop.length) {
                currentLoopIndex = 0
            }
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // ctx.fillRect(250, 250, 50, 30)

    drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);
    //move()    //car moves
    window.requestAnimationFrame(init);
}
//window.requestAnimationFrame(step);




function step() {
    // do something
    frameCount++

    if (frameCount < 20) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);

    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
        currentDirection++
    }
    if (currentDirection >= 4) {
        currentDirection = 0
    }
    window.requestAnimationFrame(step);
}



const carWidth = 28
const carHeight = 54
const scaledCarWidth = doggyWidth * scale
const scaledCarHeight = doggyHeight * scale


function drawCar() {
    console.log("aqui")

    //requestAnimationFrame(draw)
    //this.move()
}

function move() {
    console.log("moves");
    carPosY--
}
