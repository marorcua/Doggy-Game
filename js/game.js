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

    doggy: undefined,

    init() {
        this.canvas = document.getElementById("myCanvas")
        this.ctx = this.canvas.getContext("2d")
        this.setDimensions()
        this.createBoardGame()
        this.setEventListeners()
        this.start()

    },

    setDimensions() {
        this.canvasSize.w = 500
        this.canvasSize.h = 600
        //this.doggyPositionX = this.canvasSize.w / 2
        //this.doggyPositionY = this.canvasSize.h - 100
    },

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

    },

    start() {
        this.reset()

        this.interval = setInterval(() => {

            this.clear()
            //this.movement()
            //this.drawDoggy()
            this.doggyBoardGame.boardGameStart()

            if (this.doggyMovement) {
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
        this.doggy = new Doggy(this.ctx, this.canvas, this.canvasSize, this.currentLoopIndex)
        this.boardGame = new DoggyBoardGame(this.ctx, this.canvas, this.canvasSize)
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    movement() {

        this.doggyMovement = false

        if (doggyApp.keyPresses.ArrowUp) {
            this.doggyPositionY -= this.MOVEMENT_SPEED;
            this.currentDirection = this.doggyUp;
            this.doggyMovement = true

        } else if (doggyApp.keyPresses.ArrowDown) {
            this.doggyPositionY += this.MOVEMENT_SPEED;
            this.currentDirection = this.doggyDown;
            this.doggyMovement = true
        }
        if (doggyApp.keyPresses.ArrowLeft) {
            this.doggyPositionX -= this.MOVEMENT_SPEED;
            this.currentDirection = this.doggyLeft;
            this.doggyMovement = true

        } else if (doggyApp.keyPresses.ArrowRight) {
            this.doggyPositionX += this.MOVEMENT_SPEED;
            this.currentDirection = this.doggyRight;
            this.doggyMovement = true

        }

    },

    createBoardGame() {
        this.doggyBoardGame = new DoggyBoardGame(this.ctx, this.canvas, this.canvasSize)
    },

    createDoggy() {
        this.doggy = new Doggy(this.ctx, this.canvas, this.canvasSize, this.currentLoopIndex)
    },

    drawDoggy() {
        this.doggy.drawDoggyFrame(this.doggy.cycleLoop[this.currentLoopIndex], this.currentDirection, this.doggyPositionX, this.doggyPositionY);
    }


}
