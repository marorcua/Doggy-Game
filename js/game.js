const doggyApp = {
    name: 'HTML5 Canvas doggy app',
    description: 'Game for Ironhack first project',
    author: 'Guillermo Muñoz & Mario Ortiz',
    license: undefined,
    version: '1.0.0',
    canvas: undefined,
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    doggyBoardGame: undefined,

    FPS: 60,
    currentLoopIndex: 0,
    frameCount: 0,
    frameLimit: 8,
    gameFramesCount: 0,

    currentDirection: 0,
    MOVEMENT_SPEED: 1,
    doggyPositionX: undefined,
    doggyPositionY: undefined,
    doggyDown: 0,
    doggyLeft: 1,
    doggyRight: 2,
    doggyUp: 3,
    doggyIni: this.doggyDown,
    doggyMovement: false,

    keyPresses: {},
    gameKeys: ["ArrowRight", "ArrowUp", "ArrowDown", "ArrowLeft"],

    obstacle: [],
    obstacleTruck: [],
    puppiesArray: [0, 0, 0, 0, 0],

    doggy: undefined,
    livesCounter: 0,
    levelCounter: 0,
    puppyPointsCounter: [0],
    pointsCount: 450,


    init() {

        this.canvas = document.getElementById("myCanvas")
        this.ctx = this.canvas.getContext("2d")

        this.setDimensions()
        this.createBoardGame()
        this.drawLives2()
        this.createObstacle()
        this.addAudio()
        this.createObstacleTruck()
        this.createDoggy()
        this.drawSuccess()
        this.canvasLimits()
        this.start()

    },


    setDimensions() {
        this.canvasSize.w = 600
        this.canvasSize.h = 700
        this.canvas.setAttribute('width', this.canvasSize.w)
        this.canvas.setAttribute('height', this.canvasSize.h)

    },

    start() {
        const puppy1 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 0, 70, 98)
        const puppy2 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 200, 180, 105)
        const puppy3 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 420, 200, 270, 105)
        const puppy4 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 280, 200, 380, 105)
        //this.puppiesArray = [puppy1, puppy2, puppy3, 0, 0]

        this.interval = setInterval(() => {

            this.gameFramesCount > 10000 ? this.gameFramesCount = 0 : this.gameFramesCount++

            this.clear()

            if (this.gameFramesCount % 4 === 0) {
                this.pointsCounter()
            }

            if (this.gameFramesCount % 110 === 0) {
                this.createObstacle()
                this.createObstacleReverse()
            }

            if (this.gameFramesCount % 300 === 0) {
                this.createObstacleTruck()
            }

            this.doggyBoardGame.boardGameStart()
            this.doggyBoardGame.points = this.pointsCount

            this.obstacle.forEach(elm => {
                if (elm !== undefined) {
                    elm.move()
                }
            });
            this.obstacleTruck.forEach(elm => {
                if (elm !== undefined) {
                    elm.move()
                }
            });
            this.drawLives2()
            this.success()
            //this.successPosition()
            this.drawSuccess()

            this.collision()
            this.doggy.movement(this.currentLoopIndex)
            this.canvasLimits()

            if (this.doggy.doggyMovement) {
                this.frameCount++

                if (this.frameCount % 8 === 0) {
                    this.currentLoopIndex++

                    if (this.currentLoopIndex >= this.doggy.cycleLoop.length) {
                        this.currentLoopIndex = 0;
                    }
                }
            }

        }, 1000 / this.FPS)
    },

    reset() {
        this.boardGame = new DoggyBoardGame(this.ctx, this.canvas, this.canvasSize)
        this.doggy = new Doggy(this.ctx, this.canvas, this.canvasSize, this.fram, this.current)
        //this.obstacle = new Obstacles(this.ctx)
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createBoardGame() {
        this.doggyBoardGame = new DoggyBoardGame(this.ctx, this.canvas, this.canvasSize, this.pointsCount)
    },

    createDoggy() {

        this.doggy = new Doggy(this.ctx, this.canvas, this.canvasSize, this.currentLoopIndex, this.currentLoopIndex)
        this.doggyPositionX = this.canvasSize.w / 2
        this.doggyPositionY = this.canvasSize.h - this.doggy.doggyHeight * 3
    },

    createObstacle() {
        this.throwCar()
        //normal car
        let obstacle7

        const obstacle2 = new Obstacles(this.ctx, this.canvasSize, -10, carObstacle.vehDown * this.canvasSize.h,
            carObstacle.vehicleWidth, carObstacle.vehicleHeight, carObstacle.imageSrc, carObstacle.speed, false)
        this.obstacle.push(obstacle2)

        if (this.levelCounter === 0) {
            //racing car
            obstacle7 = new Obstacles(this.ctx, this.canvasSize, -10, racingObstacle.vehUp * this.canvasSize.h,
                racingObstacle.vehicleWidth, racingObstacle.vehicleHeight, racingObstacle.imageSrc, racingObstacle.speed, false)
            this.obstacle.push(obstacle7)
        } else {
            obstacle7 = new Obstacles(this.ctx, this.canvasSize, -80, logBigObstacle.vehUp * this.canvasSize.h,
                logBigObstacle.vehicleWidth, logBigObstacle.vehicleHeight, logBigObstacle.imageSrc, logBigObstacle.speed, true)

            //this.obstacle.push(obstacle7)
        }

    },
    createObstacleTruck() {
        // truck and small truck
        let obstacle3, obstacle5

        if (this.levelCounter === 0) {
            obstacle3 = new Obstacles(this.ctx, this.canvasSize, -30, truckObstacle.vehUp * this.canvasSize.h,
                truckObstacle.vehicleWidth, truckObstacle.vehicleHeight, truckObstacle.imageSrc, truckObstacle.speed, false)
            obstacle5 = new Obstacles(this.ctx, this.canvasSize, -30, sTruckObstacle.vehUp * this.canvasSize.h,
                sTruckObstacle.vehicleWidth, sTruckObstacle.vehicleHeight, sTruckObstacle.imageSrc, sTruckObstacle.speed, false)

            this.obstacleTruck.push(obstacle3)
            this.obstacle.push(obstacle5)

        } else {
            obstacle3 = new Obstacles(this.ctx, this.canvasSize, -30, logBigObstacle.vehDown * this.canvasSize.h,
                logBigObstacle.vehicleWidth * 1.2, logBigObstacle.vehicleHeight, logBigObstacle.imageSrc, logBigObstacle.speed, true)
            obstacle5 = new Obstacles(this.ctx, this.canvasSize, -80, logBigObstacle.vehUp * this.canvasSize.h,
                logBigObstacle.vehicleWidth, logBigObstacle.vehicleHeight, logBigObstacle.imageSrc, logBigObstacle.speed, true)

            this.obstacleTruck.push(obstacle3, obstacle5)
            //this.obstacle.push(obstacle5)
        }

        const obstacle4 = new Obstacles(this.ctx, this.canvasSize, -30, truckObstacle.vehDown * this.canvasSize.h,
            truckObstacle.vehicleWidth, truckObstacle.vehicleHeight, truckObstacle.imageSrc, truckObstacle.speed, false)
        //small truck car
        const obstacle6R = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, sTruckObstacle.vehDown * this.canvasSize.h,
            sTruckObstacle.vehicleWidth, sTruckObstacle.vehicleHeight, sTruckObstacle.imageSrcRev, -sTruckObstacle.speed, false)

        this.obstacleTruck.push(obstacle4, obstacle6R)
    },

    createObstacleReverse() {
        let obstacle1R

        if (this.levelCounter === 0) {
            //normal car
            obstacle1R = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, carObstacle.vehUp * this.canvasSize.h,
                carObstacle.vehicleWidth, carObstacle.vehicleHeight, carObstacle.imageSrcRev, -carObstacle.speed, false)
            this.obstacle.push(obstacle1R)
        } else {

            obstacle5R = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, logBigObstacle.vehDown2 * this.canvasSize.h,
                logBigObstacle.vehicleWidth * .8, logBigObstacle.vehicleHeight, logBigObstacle.imageSrc, -logBigObstacle.speed * 1.5, true)

            obstacle6R = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, logBigObstacle.vehUp2 * this.canvasSize.h,
                logBigObstacle.vehicleWidth * .5, logBigObstacle.vehicleHeight, logBigObstacle.imageSrc, -logBigObstacle.speed, true)

            this.obstacle.push(obstacle5R, obstacle6R)
        }

        //racing car
        const obstacle8R = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, racingObstacle.vehDown * this.canvasSize.h,
            racingObstacle.vehicleWidth, racingObstacle.vehicleHeight, racingObstacle.imageSrcRev, -racingObstacle.speed, false)

        this.obstacle.push(obstacle8R)

    },

    throwCar() {
        this.obstacle.forEach((elm, ind) => {
            if (elm.vehiclePosX >= 1000 ||
                elm.vehiclePosX <= -100) {
                this.obstacle.splice(ind, 1)
            }
        });
        this.obstacleTruck.forEach((elm, ind) => {
            if (elm.vehiclePosX >= 1000 ||
                elm.vehiclePosX <= -300) {
                this.obstacleTruck.splice(ind, 1)
            }
        });


    },
    endGame() {
        this.canvasLimits()
        this.success()


    },
    canvasLimits() {

        if (this.doggy.doggyPositionX + this.doggy.scaledWidth >= this.canvasSize.w || this.doggy.doggyPositionX <= 0) {
            this.loseLives()
        }
        if (this.doggyBoardGame.moveTime() === false) {
            this.loseLives()
        }

    },

    loseLives() {
        clearInterval(this.interval)

        dogCrying.play()

        setTimeout(() => {
            this.livesCounter++
            this.livesCounter === 7 ? this.gameOver() : this.gameRestart()

        }, 1000)

    },

    drawLives2() {
        this.doggyBoardGame.lives = this.doggyBoardGame.livesArray.filter((elm) => {
            let counter = this.livesCounter
            let lifes = 6 - counter
            return (this.doggyBoardGame.livesArray.indexOf(elm) <= lifes)
        })
        this.doggyBoardGame.lives.forEach(elm => elm.draw())
    },

    isCollisionLog() {
        return (this.isCollisionLog() || this.isCollisionLogTruck())
    },

    isCollisionLogTruck() {
        return this.obstacleTruck.some(elm => {
            return (elm.isLog && (elm.vehiclePosY + elm.vehicleHeight) > (this.doggy.doggyPositionY + 5)
                && (elm.vehiclePosY) < (this.doggy.doggyPositionY + this.doggy.scaledHeight - 5)
                && (elm.vehiclePosX) < (this.doggy.doggyPositionX + this.doggy.scaledWidth - 15)
                && (elm.vehiclePosX + elm.vehicleWidth) > (this.doggy.doggyPositionX + 15))
        })
    },

    isCollisionLog() {
        return this.obstacle.some(elm => {
            return (elm.isLog && (elm.vehiclePosY + elm.vehicleHeight) > (this.doggy.doggyPositionY + 5)
                && (elm.vehiclePosY - 5) < (this.doggy.doggyPositionY + this.doggy.scaledHeight - 5)
                && (elm.vehiclePosX) < (this.doggy.doggyPositionX + this.doggy.scaledWidth - 15)
                && (elm.vehiclePosX + elm.vehicleWidth) > (this.doggy.doggyPositionX + 15))
        })
    },

    isCollisionVehicle() {
        return this.obstacle.some(elm => {
            return (!elm.isLog && elm.vehiclePosY + elm.vehicleHeight) > (this.doggy.doggyPositionY + 15)
                && (elm.vehiclePosY) < (this.doggy.doggyPositionY - 15 + this.doggy.scaledHeight)
                && (elm.vehiclePosX) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                && (elm.vehiclePosX + elm.vehicleWidth) > (this.doggy.doggyPositionX + 20)

        }) || this.obstacleTruck.some(elm => {
            return (!elm.isLog && elm.vehiclePosY + elm.vehicleHeight) > (this.doggy.doggyPositionY + 15)
                && (elm.vehiclePosY) < (this.doggy.doggyPositionY - 15 + this.doggy.scaledHeight)
                && (elm.vehiclePosX) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                && (elm.vehiclePosX + elm.vehicleWidth) > (this.doggy.doggyPositionX + 20)
        })
    },

    isCollisionWater() {
        return (this.doggy.doggyPositionY + this.doggy.scaledHeight < 335 &&
            this.doggy.doggyPositionY + this.doggy.scaledHeight > 165)
    },

    collision() {
        //1: estas en zona agua o en zona carretera
        if (this.levelCounter > 0 && this.isCollisionWater()) {

            // estas en zona agua y en Log, estas en un Log Truc o normal?
            if (this.isCollisionLogTruck()) {
                console.log("carril truck")

                this.doggy.doggyPositionX += logBigObstacle.speed


            } else if (this.isCollisionLog()) {
                console.log("carril normal")

                this.doggy.doggyPositionX -= logBigObstacle.speed

            }

            else {
                dogCrying.play()
                this.loseLives()
                console.log("water");

            }

            //estas en zona carretera
        } else if (this.isCollisionVehicle()) {
            console.log("te mueres");
            carCrash.play()
            dogCrying.play()
            this.loseLives()

        }

        //Lava hitbox

        if ((110 + 35) > (this.doggy.doggyPositionY + 20)
            && (110) < (this.doggy.doggyPositionY - 15 + this.doggy.scaledHeight)
            &&
            (((5) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                && (5 + 60) > (this.doggy.doggyPositionX + 20)) ||
                ((110) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                    && (110 + 60) > (this.doggy.doggyPositionX + 20)) ||
                ((220) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                    && (220 + 60) > (this.doggy.doggyPositionX + 20)) ||
                ((330) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                    && (330 + 60) > (this.doggy.doggyPositionX + 20)) ||
                ((440) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                    && (440 + 60) > (this.doggy.doggyPositionX + 20)) ||
                ((550) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                    && (550 + 60) > (this.doggy.doggyPositionX + 20)))

        ) {
            dogCrying.play()
            this.loseLives()
        }


    },
    success() {
        const puppy1 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 0, 70, 98)
        const puppy2 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 200, 180, 105)
        const puppy3 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 420, 200, 270, 105)
        const puppy4 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 280, 200, 380, 105)
        const puppy5 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 200, 510, 105)

        if ((90 + 20) > (this.doggy.doggyPositionY + 10)) {
            if (50 < (this.doggy.doggyPositionX) &&
                90 > (this.doggy.doggyPositionX)) {
                if (this.puppiesArray[0] === 0) {
                    this.puppiesArray[0] = puppy1
                    this.puppyPointsCounter.push(this.pointsCount)
                    this.createPointer()
                    barkSound.play()
                }

            } else if (150 < (this.doggy.doggyPositionX) &&
                220 > (this.doggy.doggyPositionX + 30)) {
                if (this.puppiesArray[1] === 0) {
                    this.puppiesArray[1] = puppy2
                    this.puppyPointsCounter.push(this.pointsCount)
                    this.createPointer()
                    barkSound.play()

                }

            } else if (270 < (this.doggy.doggyPositionX) &&
                330 > (this.doggy.doggyPositionX + 30)) {
                if (this.puppiesArray[2] === 0) {
                    this.puppiesArray[2] = puppy3
                    this.puppyPointsCounter.push(this.pointsCount)
                    this.createPointer()
                    barkSound.play()
                }

            } else if (380 < (this.doggy.doggyPositionX) &&
                440 > (this.doggy.doggyPositionX + 30)) {
                if (this.puppiesArray[3] === 0) {
                    this.puppiesArray[3] = puppy4
                    this.puppyPointsCounter.push(this.pointsCount)
                    this.createPointer()
                    barkSound.play()
                }

            } else if (490 < (this.doggy.doggyPositionX) &&
                550 > (this.doggy.doggyPositionX + 30)) {
                if (this.puppiesArray[4] === 0) {
                    this.puppiesArray[4] = puppy5
                    this.puppyPointsCounter.push(this.pointsCount)
                    this.createPointer()
                    barkSound.play()
                }
            }

            this.puppiesArray.filter(elm => elm === 0).length === 0 ? this.startNewLevel() : this.gameRestart()
        }


    },


    drawSuccess() {
        this.puppiesArray.forEach(elm => {
            if (elm !== 0) {
                elm.draw()
            }
        });

    },

    gameRestart() {

        clearInterval(this.interval)

        this.obstacle = []
        this.obstacleTruck = []
        this.frameCount = 0
        this.currentLoopIndex = 0
        this.frameCount = 0
        this.gameFramesCount = 0
        this.doggyBoardGame.timeLine = 105
        this.pointsCount = 500

        this.createAll()
        this.start()

    },


    gameOver() {

        clearInterval(this.interval)
        this.gameOverScreen()

        setTimeout(() => {
            document.getElementById("game-board").classList.add("invisible")
            this.init
        }, 2000)
    },

    gameOverScreen() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

        this.ctx.font = "50px 'Fixedsys Excelsior 3.01'"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("Game Over", this.canvasSize.w / 2 - 120, this.canvasSize.h / 2)

        this.ctx.font = "35px 'Fixedsys Excelsior 3.01'"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(`Final Score: ${this.finalScore()}`, this.canvasSize.w / 2 - 130, this.canvasSize.h / 2 + 70)

    },

    startNewLevel() {
        this.levelCounter++
        this.reset()

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

        this.ctx.font = "50px 'Fixedsys Excelsior 3.01'"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(`LEVEL ${this.levelCounter + 1}`, this.canvasSize.w / 2 - 100, this.canvasSize.h / 2)

        setTimeout(() => {
            this.doggyBoardGame = new levelTwo(this.ctx, this.canvas, this.canvasSize)
            this.createAll()
            this.start()
        }, 3000)


    },

    reset() {
        clearInterval(this.interval)

        this.obstacle = []
        this.obstacleTruck = []
        this.frameCount = 0
        this.currentLoopIndex = 0
        this.frameCount = 0
        this.puppiesArray = [0, 0, 0, 0, 0]
        this.gameFramesCount = 0
        this.pointsCount = 450
        this.doggy = undefined

    },

    pointsCounter() {

        this.pointsCount >= 0 ? this.pointsCount-- : null
    },

    finalScore() {
        return this.puppyPointsCounter.reduce((accumulator, currentValue) => accumulator + currentValue)
    },

    createPointer() {
        //console.log(this.puppyPointsCounter);
        document.querySelector(".score").innerHTML = `Puppy Score: ${this.finalScore()}`
        console.log(this.puppyPointsCounter);
        let ind = this.puppyPointsCounter.length - 1
        let elm = this.puppyPointsCounter[ind]

        let newParagraph = document.createElement("p")
        let newText = document.createTextNode(`Puppy ${ind}: ${elm}`)

        newParagraph.appendChild(newText)

        let indexScore = document.getElementsByClassName("game-intro")[0]
        console.log(indexScore);
        indexScore.appendChild(newParagraph)

    },

    createAll() {
        this.createObstacle()
        this.createObstacleTruck()
        this.createDoggy()
    },

    addAudio() {
        barkSound = new Audio('audios/ladrido.mp3')
        dogCrying = new Audio('audios/perro-llorando2.mov')
        carCrash = new Audio('audios/car-crash2.mov')
    },
    preInit() {
        // clearInterval(this.interval)
        // this.init()
        // clearTimeout()
        clearInterval(this.interval)

    }
}
