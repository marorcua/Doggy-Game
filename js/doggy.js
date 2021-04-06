class Doggy {
    constructor(ctx, canvas, canvasSize, frameCount, currentLoopIndex) {
        this.ctx = ctx
        this.canvas = canvas
        this.canvasSize = canvasSize
        this.frameCount = frameCount
        this.currentLoopIndex = currentLoopIndex

        this.scale = 1.0
        this.doggyWidth = 48
        this.doggyHeight = 50

        this.scaledWidth = this.doggyWidth * this.scale
        this.scaledHeight = this.doggyHeight * this.scale

        this.doggyImage = undefined

        this.keyPresses = {}
        this.gameKeys = ["ArrowRight", "ArrowUp", "ArrowDown", "ArrowLeft"]

        this.frameLimit = 8
        this.currentDirection = 0
        this.MOVEMENT_SPEED = 1.4
        this.doggyPositionX = this.canvasSize.w / 2
        this.doggyPositionY = this.canvasSize.h - this.doggyHeight * 3
        this.doggyDown = 0
        this.doggyLeft = 1
        this.doggyRight = 2
        this.doggyUp = 3
        this.doggyIni = this.doggyDown
        this.doggyMovement = false


        this.cycleLoop = [0, 1, 0, 2]
        this.frameCount = 0
        this.frameLimit = 6

        this.init()
    }

    init() {
        this.doggyImage = new Image()
        this.doggyImage.src = "./Images/dog_scottie.png"
        this.setEventListeners()
        this.drawDoggyFrame()
    }

    drawDoggyFrame(frameX, frameY, canvasX, canvasY) {

        this.ctx.drawImage(this.doggyImage,
            frameX * this.doggyWidth, frameY * this.doggyHeight, this.doggyWidth, this.doggyHeight,
            canvasX, canvasY, this.scaledWidth, this.scaledHeight);

    }

    setEventListeners() {

        document.onkeydown = e => {
            this.gameKeys.forEach(elm => {
                if (e.key === elm) {
                    this.keyPresses[e.key] = true
                }
            });
        }

        document.onkeyup = e => {
            this.gameKeys.forEach(elm => {
                if (e.key === elm) {
                    this.keyPresses[e.key] = false
                }
            });
        }

    }

    movement(currentLoopIndex) {

        this.doggyMovement = false

        if (this.keyPresses.ArrowUp) {
            this.doggyPositionY -= this.MOVEMENT_SPEED;
            this.currentDirection = this.doggyUp;
            this.doggyMovement = true

        } else if (this.keyPresses.ArrowDown) {
            this.doggyPositionY += this.MOVEMENT_SPEED;
            this.currentDirection = this.doggyDown;
            this.doggyMovement = true
        }
        if (this.keyPresses.ArrowLeft) {
            this.doggyPositionX -= this.MOVEMENT_SPEED;
            this.currentDirection = this.doggyLeft;
            this.doggyMovement = true

        } else if (this.keyPresses.ArrowRight) {
            this.doggyPositionX += this.MOVEMENT_SPEED;
            this.currentDirection = this.doggyRight;
            this.doggyMovement = true

        }

        this.drawDoggyFrame(this.cycleLoop[currentLoopIndex], this.currentDirection, this.doggyPositionX, this.doggyPositionY)

    }

    step() {

        this.frameCount = 0

        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
        this.drawDoggyFrame(0, 0, 0, 0)
    }



}



// let img = new Image()
// img.src = "./Images/dog_scottie.png"
// img.onload = function () {
//     init()
//     drawCar()
// }

// let carImg = new Image()
// carImg.src = "./Images/car-truck1.png"

// let keyPresses = {}
// const MOVEMENT_SPEED = 2.8
// let positionX = 0
// let positionY = 0

// const FACING_DOWN = 0
// const FACING_UP = 3
// const FACING_LEFT = 1
// const FACING_RIGHT = 2
// let currentDirection = FACING_DOWN

// window.addEventListener('keydown', keyDownListener, false);
// function keyDownListener(event) {
//     keyPresses[event.key] = true
//     console.log(keyPresses)
// }

// window.addEventListener('keyup', keyUpListener, false)
// function keyUpListener(event) {
//     keyPresses[event.key] = false
//     console.log(keyPresses)
// }



// let canvas = document.querySelector('canvas')

// let ctx = canvas.getContext('2d')
// let scale = 1.5
// const doggyWidth = 48
// const doggyHeight = 50
// const scaledWidth = doggyWidth * scale
// const scaledHeight = doggyHeight * scale
// const cycleLoop = [0, 1, 0, 2]
// let frameCount = 0
// let currentLoopIndex = 0
// const frameLimit = 6
// let carPosX = 0
// let carPosY = 0

// function drawFrame(frameX, frameY, canvasX, canvasY) {
//     ctx.drawImage(img,
//         frameX * doggyWidth, frameY * doggyHeight, doggyWidth, doggyHeight,
//         canvasX, canvasY, scaledWidth, scaledHeight);
//     ctx.save()
//     ctx.translate(250, 250)
//     ctx.rotate(Math.PI / 2)
//     ctx.drawImage(carImg, carPosX, carPosY, carWidth, carHeight)
//     //ctx.rotate(-Math.PI / 2)
//     ctx.restore();
// }

// function init() {
//     // future animation code goes here
//     // drawFrame(0, 0, 0, 0);
//     // drawFrame(1, 0, scaledWidth, 0);
//     // drawFrame(0, 0, scaledWidth * 2, 0);
//     // drawFrame(2, 0, scaledWidth * 3, 0);
//     //window.requestAnimationFrame(step);

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     let doggyMovement = false

//     if (keyPresses.ArrowUp) {
//         positionY -= MOVEMENT_SPEED;
//         currentDirection = FACING_UP;
//         doggyMovement = true

//     } else if (keyPresses.ArrowDown) {
//         positionY += MOVEMENT_SPEED;
//         currentDirection = FACING_DOWN;
//         doggyMovement = true
//     }
//     if (keyPresses.ArrowLeft) {
//         positionX -= MOVEMENT_SPEED;
//         currentDirection = FACING_LEFT;
//         doggyMovement = true

//     } else if (keyPresses.ArrowRight) {
//         positionX += MOVEMENT_SPEED;
//         currentDirection = FACING_RIGHT;
//         doggyMovement = true

//     }
//     //drawFrame(0, currentDirection, positionX, positionY);
//     //window.requestAnimationFrame(init);

//     if (doggyMovement) {
//         frameCount++
//         if (frameCount >= frameLimit) {
//             frameCount = 0
//             currentLoopIndex++
//             if (currentLoopIndex >= cycleLoop.length) {
//                 currentLoopIndex = 0
//             }
//         }
//     }

//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     // ctx.fillRect(250, 250, 50, 30)

//     drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);
//     //move()    //car moves
//     window.requestAnimationFrame(init);
// }
// //window.requestAnimationFrame(step);




// function step() {
//     // do something
//     frameCount++

//     if (frameCount < 20) {
//         window.requestAnimationFrame(step);
//         return;
//     }
//     frameCount = 0

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);

//     currentLoopIndex++;
//     if (currentLoopIndex >= cycleLoop.length) {
//         currentLoopIndex = 0;
//         currentDirection++
//     }
//     if (currentDirection >= 4) {
//         currentDirection = 0
//     }
//     window.requestAnimationFrame(step);
// }



// const carWidth = 28
// const carHeight = 54
// const scaledCarWidth = doggyWidth * scale
// const scaledCarHeight = doggyHeight * scale


// function drawCar() {
//     console.log("aqui")

//     //requestAnimationFrame(draw)
//     //this.move()
// }

// function move() {
//     console.log("moves");
//     carPosY--
// }
