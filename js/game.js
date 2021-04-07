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

    init() {
        this.canvas = document.getElementById("myCanvas")
        this.ctx = this.canvas.getContext("2d")

        this.setDimensions()
        this.createBoardGame()
        this.createDoggy()
        this.createObstacle()
        this.createObstacleTruck()
        this.drawSuccess()
        this.start()
        this.canvasLimits()
        this.drawLives2()

    },

    setDimensions() {
        this.canvasSize.w = 600
        this.canvasSize.h = 700
        this.canvas.setAttribute('width', this.canvasSize.w)
        this.canvas.setAttribute('height', this.canvasSize.h)

    },

    // setEventListeners() {

    //     document.onkeydown = e => {
    //         this.gameKeys.forEach(elm => {
    //             if (e.key === elm) {
    //                 this.keyPresses[e.key] = true
    //             }
    //         });
    //     }

    //     document.onkeyup = e => {
    //         this.gameKeys.forEach(elm => {
    //             if (e.key === elm) {
    //                 this.keyPresses[e.key] = false
    //             }
    //         });
    //     }

    // },

    start() {
        //this.reset()
        const puppy1 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 0, 70, 105)
        const puppy2 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 200, 180, 105)
        const puppy3 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 420, 200, 270, 105)
        const puppy4 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 280, 200, 380, 105)
        this.puppiesArray = [puppy1, puppy2, puppy3, puppy4]
        this.interval = setInterval(() => {

            this.gameFramesCount > 5000 ? this.gameFramesCount = 0 : this.gameFramesCount++

            this.clear()


            if (this.gameFramesCount % 110 === 0) {
                this.createObstacle()
                this.createObstacleReverse()
            }

            if (this.gameFramesCount % 300 === 0) {
                this.createObstacleTruck()
            }

            this.doggyBoardGame.boardGameStart()
            this.doggy.movement(this.currentLoopIndex)
            this.obstacle.forEach(elm => {
                elm.move()
            });
            this.obstacleTruck.forEach(elm => {
                elm.move()
            });
            this.collision()
            this.success()
            //this.successPosition()
            this.drawSuccess()
            this.canvasLimits()
            this.drawLives2()

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
        this.doggyBoardGame = new DoggyBoardGame(this.ctx, this.canvas, this.canvasSize)
    },

    createDoggy() {

        this.doggy = new Doggy(this.ctx, this.canvas, this.canvasSize, this.currentLoopIndex, this.currentLoopIndex)
        this.doggyPositionX = this.canvasSize.w / 2
        this.doggyPositionY = this.canvasSize.h - this.doggy.doggyHeight * 3
    },

    createObstacle() {
        this.throwCar()
        //normal car
        const obstacle2 = new Obstacles(this.ctx, this.canvasSize, -10, carObstacle.vehDown * this.canvasSize.h, carObstacle.vehicleWidth, carObstacle.vehicleHeight, carObstacle.imageSrc, carObstacle.speed, false)

        //racing car
        const obstacle7 = new Obstacles(this.ctx, this.canvasSize, -10, racingObstacle.vehUp * this.canvasSize.h, racingObstacle.vehicleWidth, racingObstacle.vehicleHeight, racingObstacle.imageSrc, racingObstacle.speed, false)

        this.obstacle.push(obstacle2, obstacle7)

    },
    createObstacleTruck() {
        // truck and small truck
        const obstacle3 = new Obstacles(this.ctx, this.canvasSize, -10, truckObstacle.vehUp * this.canvasSize.h, truckObstacle.vehicleWidth, truckObstacle.vehicleHeight, truckObstacle.imageSrc, truckObstacle.speed, false)
        const obstacle4 = new Obstacles(this.ctx, this.canvasSize, -10, truckObstacle.vehDown * this.canvasSize.h, truckObstacle.vehicleWidth, truckObstacle.vehicleHeight, truckObstacle.imageSrc, truckObstacle.speed, false)
        const obstacle5 = new Obstacles(this.ctx, this.canvasSize, -10, sTruckObstacle.vehUp * this.canvasSize.h, sTruckObstacle.vehicleWidth, sTruckObstacle.vehicleHeight, sTruckObstacle.imageSrc, sTruckObstacle.speed, false)
        //small truck car
        const obstacle6R = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, sTruckObstacle.vehDown * this.canvasSize.h, sTruckObstacle.vehicleWidth, sTruckObstacle.vehicleHeight, sTruckObstacle.imageSrcRev, -sTruckObstacle.speed, false)

        this.obstacle.push(obstacle5)
        this.obstacleTruck.push(obstacle3, obstacle4, obstacle6R)

    },
    createObstacleReverse() {
        //normal car
        const obstacle1R = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, carObstacle.vehUp * this.canvasSize.h, carObstacle.vehicleWidth, carObstacle.vehicleHeight, carObstacle.imageSrcRev, -carObstacle.speed, false)
        //racing car
        const obstacle8R = new Obstacles(this.ctx, this.canvasSize, this.canvasSize.w, racingObstacle.vehDown * this.canvasSize.h, racingObstacle.vehicleWidth, racingObstacle.vehicleHeight, racingObstacle.imageSrcRev, -racingObstacle.speed, false)

        this.obstacle.push(obstacle1R, obstacle8R)

    },

    throwCar() {
        this.obstacle.forEach(elm => {
            if (elm.vehiclePosX >= 1000 ||
                elm.vehiclePosX <= -100) {
                this.obstacle.shift()
            }
        });
        this.obstacleTruck.forEach(elm => {
            if (elm.vehiclePosX >= 1000 ||
                elm.vehiclePosX <= -300) {
                this.obstacleTruck.shift()
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
            this.gameRestart()
        }

    },

    loseLives() {
        this.livesCounter++
        this.livesCounter === 7 ? this.gameOver() : this.gameOver()


    },
    drawLives2() {
        this.doggyBoardGame.lives = this.doggyBoardGame.livesArray.filter((elm) => {
            let counter = this.livesCounter
            let lifes = 6 - counter
            return (this.doggyBoardGame.livesArray.indexOf(elm) <= lifes)
        })
        this.doggyBoardGame.lives.forEach(elm => elm.draw())
    },

    collision() {

        this.obstacle.forEach(elm => {
            if ((elm.vehiclePosY + elm.vehicleHeight) > (this.doggy.doggyPositionY + 15)
                && (elm.vehiclePosY) < (this.doggy.doggyPositionY - 15 + this.doggy.scaledHeight)
                && (elm.vehiclePosX) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                && (elm.vehiclePosX + elm.vehicleWidth) > (this.doggy.doggyPositionX + 20)) {
                this.loseLives()
            }
        });

        this.obstacleTruck.forEach(elm => {
            if ((elm.vehiclePosY + elm.vehicleHeight) > (this.doggy.doggyPositionY + 15)
                && (elm.vehiclePosY) < (this.doggy.doggyPositionY - 15 + this.doggy.scaledHeight)
                && (elm.vehiclePosX) < (this.doggy.doggyPositionX - 20 + this.doggy.scaledWidth)
                && (elm.vehiclePosX + elm.vehicleWidth) > (this.doggy.doggyPositionX + 20)) {
                this.loseLives()
            }
        });

        if ((110 + 35) > (this.doggy.doggyPositionY + 15)
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
            this.loseLives()
        }


    },
    success() {
        const puppy1 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 0, 70, 105)
        const puppy2 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 200, 180, 105)
        const puppy3 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 420, 200, 270, 105)
        const puppy4 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 280, 200, 380, 105)
        const puppy5 = new Puppy(this.ctx, this.canvas, this.canvasSize, this.frameCount, this.currentLoopIndex, 150, 200, 510, 105)

        if ((90 + 20) > (this.doggy.doggyPositionY + 10)) {
            if (55 < (this.doggy.doggyPositionX) &&
                90 > (this.doggy.doggyPositionX)) {
                if (this.puppiesArray[0] === 0) {
                    //ctx, canvas, canvasSize, frameCount, currentLoopIndex, spriteRow, spriteColumn, puppyPosX, puppyPosY
                    this.puppiesArray[0] = puppy1
                    console.log(this.puppiesArray);

                }

            } else if (150 < (this.doggy.doggyPositionX) &&
                220 > (this.doggy.doggyPositionX + 30)) {
                if (this.puppiesArray[1] === 0) {
                    this.puppiesArray[1] = puppy2
                    console.log(this.puppiesArray);
                }

            } else if (270 < (this.doggy.doggyPositionX) &&
                330 > (this.doggy.doggyPositionX + 30)) {
                if (this.puppiesArray[2] === 0) {
                    this.puppiesArray[2] = puppy3
                    console.log(this.puppiesArray);

                }

            } else if (390 < (this.doggy.doggyPositionX) &&
                440 > (this.doggy.doggyPositionX + 30)) {
                if (this.puppiesArray[3] === 0) {
                    this.puppiesArray[3] = puppy4
                    console.log(this.puppiesArray);

                }

            } else if (500 < (this.doggy.doggyPositionX) &&
                550 > (this.doggy.doggyPositionX + 30)) {
                if (this.puppiesArray[4] === 0) {
                    this.puppiesArray[4] = puppy5
                    console.log(this.puppiesArray);

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
        this.start()

    },


    gameOver() {

        // clearInterval(this.interval)
        // this.gameOverScreen()
    },

    gameOverScreen() {
        let counter = 0

        while (counter <= (1000 / this.FPS * 6)) {
            console.log(counter);

            this.ctx.fillStyle = "black"
            this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

            this.ctx.font = "50px 'Fixedsys Excelsior 3.01'"
            this.ctx.fillStyle = "white"
            this.ctx.fillText("Game Over", this.canvasSize.w / 2 - 120, this.canvasSize.h / 2)

            counter++
        }

    },

    startNewLevel() {
        this.levelCounter++
        this.reset()

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

        this.ctx.font = "50px 'Fixedsys Excelsior 3.01'"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("LEVEL 2", this.canvasSize.w / 2 - 120, this.canvasSize.h / 2)

        setTimeout(() => {
            this.doggyBoardGame = new levelTwo(this.ctx, this.canvas, this.canvasSize)
            this.createDoggy()
            
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
    }





}
