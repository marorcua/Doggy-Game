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

    doggy: undefined,

    init() {
        this.canvas = document.getElementById("myCanvas")
        this.ctx = this.canvas.getContext("2d")

        this.setDimensions()
        this.createBoardGame()
        //this.setEventListeners()
        this.createDoggy()
        this.createObstacle()
        this.createObstacleTruck()
        this.start()

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

        this.interval = setInterval(() => {

            this.gameFramesCount > 5000 ? this.gameFramesCount = 0 : this.gameFramesCount++

            this.clear()

            if (this.gameFramesCount % 110 === 0) {
                this.createObstacle()
                this.createObstacleReverse()
                //console.log(this.obstacle);
            }

            if (this.gameFramesCount % 300 === 0) {
                this.createObstacleTruck()
                console.log(this.obstacleTruck);
            }

            this.doggyBoardGame.boardGameStart()
            this.doggy.movement(this.currentLoopIndex)
            this.obstacle.forEach(elm => {
                elm.move()
            });
            this.obstacleTruck.forEach(elm => {
                elm.move()
            });


            if (this.doggy.doggyMovement) {
                console.log(this.doggy.doggyMovement);
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

    // movement() {

    //     this.doggyMovement = false

    //     if (doggyApp.keyPresses.ArrowUp) {
    //         this.doggyPositionY -= this.MOVEMENT_SPEED;
    //         this.currentDirection = this.doggyUp;
    //         this.doggyMovement = true

    //     } else if (doggyApp.keyPresses.ArrowDown) {
    //         this.doggyPositionY += this.MOVEMENT_SPEED;
    //         this.currentDirection = this.doggyDown;
    //         this.doggyMovement = true
    //     }
    //     if (doggyApp.keyPresses.ArrowLeft) {
    //         this.doggyPositionX -= this.MOVEMENT_SPEED;
    //         this.currentDirection = this.doggyLeft;
    //         this.doggyMovement = true

    //     } else if (doggyApp.keyPresses.ArrowRight) {
    //         this.doggyPositionX += this.MOVEMENT_SPEED;
    //         this.currentDirection = this.doggyRight;
    //         this.doggyMovement = true

    //     }

    // },

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

        //WTF:
        // this.obstacle = this.obstacle.filter(elm => {
        //     console.log(elm.carPosY);
        //     -elm.carPosY >= 500
        // })
        //console.log(this.obstacle);
    },

    // drawDoggy() {
    //     this.doggy.drawDoggyFrame(this.doggy.cycleLoop[this.currentLoopIndex], this.currentDirection, this.doggyPositionX, this.doggyPositionY);
    // },

}
