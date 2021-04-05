class DoggyBoardGame {

    constructor(ctx, canvas, canvasSize) {
        this.canvasDom = canvas
        this.ctx = ctx
        this.canvasSize = canvasSize
        console.log(this.canvasSize);
        this.lines = []
        this.timeLine = 105
        this.framesCounter = 0
        this.lives = []

        this.boardGameInit()
    }

    boardGameInit() {
        //this.boardGameStart()
        this.drawBoard()
        this.drawLines()
    }

    // setCanvasSize() {
    //     this.canvasSize = {
    //         w: 600,
    //         h: 700
    //     }
    //     this.canvasDOM.setAttribute('width', this.canvasSize.w)
    //     this.canvasDOM.setAttribute('height', this.canvasSize.h)

    // }

    boardGameStart() {

        this.framesCounter++
        this.clearScreen()
        this.drawAll()

        this.moveTime()

        this.drawLives()

        // this.drawTime.moveTime()

    }

    drawAll() {
        this.drawBoard()
        this.lines.forEach(elm => elm.draw())
        this.drawGrass()
        this.drawLava()
        this.drawStones()
        this.drawText()
        this.drawTime()

    }


    drawLines() {
        const line1 = new Line(this.ctx, 599, 50, 5, 50, 0, 0, 'black', 90)
        const line2 = new Line(this.ctx, 599, 100, 5, 100, 0, 0, 'green', 20)
        const line3 = new Line(this.ctx, 599, 189, 5, 189, 40, 60, 'white', 5)
        const line4 = new Line(this.ctx, 599, 236, 5, 236, 0, 0, 'white', 5)
        const line5 = new Line(this.ctx, 599, 245, 5, 245, 0, 0, 'white', 5)
        const line6 = new Line(this.ctx, 599, 289, 5, 289, 40, 60, 'white', 5)
        const line7 = new Line(this.ctx, 599, 390, 5, 390, 0, 0, 'white', 5)
        const line8 = new Line(this.ctx, 599, 434, 5, 434, 40, 60, 'white', 5)
        const line9 = new Line(this.ctx, 599, 480, 5, 480, 0, 0, 'white', 5)
        const line10 = new Line(this.ctx, 599, 489, 5, 489, 0, 0, 'white', 5)
        const line11 = new Line(this.ctx, 599, 530, 5, 530, 40, 60, 'white', 5)
        this.lines.push(line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11)
    }

    drawBoard() {

        doggyApp.ctx.fillRect(5, 5, doggyApp.canvasSize.w, doggyApp.canvasSize.h,)
        doggyApp.ctx.fillStyle = 'black'

        doggyApp.ctx.fillRect(5, 600, doggyApp.canvasSize.w, doggyApp.canvasSize.h / 2 - 100)
        doggyApp.ctx.fillStyle = 'grey'

    }

    drawStones() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/stones.png'
        this.ctx.drawImage(this.imageInstance, 5, 90, 600, 30)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/stones.png'
        this.ctx.drawImage(this.imageInstance, 5, 355, 600, 30)

    }

    drawGrass() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/grass3.jpg'
        this.ctx.drawImage(this.imageInstance, 5, 330, 600, 40)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/grass3.jpg'
        this.ctx.drawImage(this.imageInstance, 5, 570, 600, 40)

    }
    drawLava() {

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 5, 110, 60, 35, 5, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 5, 110, 60, 35, 110, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 5, 110, 60, 35, 220, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 5, 110, 60, 35, 330, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 5, 110, 60, 35, 440, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 5, 110, 60, 35, 550, 110, 60, 35)
    }


    drawText() {

        this.ctx.font = "20px Monaco"
        this.ctx.fillText("SCORE: 00001 ", 40, 60)

        this.ctx.font = "20px Monaco"
        this.ctx.fillText("LIVES:", 250, 60)

    }

    drawTime() {

        this.ctx.font = "20px Monaco"
        this.ctx.fillText("TIME: ", 40, 675)

        this.ctx.strokeStyle = 'blue'
        this.ctx.lineWidth = 30
        this.ctx.beginPath()
        this.ctx.setLineDash([])
        this.ctx.moveTo(100, 670)
        this.ctx.lineTo(this.timeLine, 670)
        this.ctx.stroke()
        this.ctx.closePath()

        this.moveTime()

    }


    moveTime() {

        if (this.timeLine >= this.canvasSize.w - 10) {

            return false

        } else if (this.framesCounter % 10) {
            this.timeLine += .1

        }


    }

    drawLives() {

        const live1 = new Live(this.ctx, 'img/dog-bone.jpg', 400, 60, 40, 40)
        this.lives.push(live1)

    }
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }

}


class Line {

    constructor(ctx, linetoX, linetoY, movestoX, movestoY, segment1, segment2, strokesStyles, linesWidth) {

        this.ctx = ctx
        this.linesTo = { x: linetoX, y: linetoY }
        this.movesTo = { x: movestoX, y: movestoY }
        this.setLinesDash = [segment1, segment2]
        this.strokesStyles = strokesStyles
        this.linesWidth = linesWidth

        this.draw()

    }
    draw() {


        this.ctx.strokeStyle = this.strokesStyles
        this.ctx.lineWidth = this.linesWidth
        this.ctx.beginPath()
        this.ctx.setLineDash([this.setLinesDash[0], this.setLinesDash[1]])
        this.ctx.moveTo(this.movesTo.x, this.movesTo.y)
        this.ctx.lineTo(this.linesTo.x, this.linesTo.y)
        this.ctx.stroke()
        this.ctx.closePath()

    }


}

class Live {
    constructor(ctx, bonesImage, bonesX, bonesY, bonesW, bonesH) {
        this.ctx = ctx
        this.bonesPosition = { x: bonesX, y: bonesY }
        this.bonesSize = { w: bonesW, h: bonesH }
        this.bonesImages = bonesImage
        this.init()
        this.draw()



    }
    init() {

        this.imageInstance = new Image()
        this.imageInstance.src = this.bonesImages

    }
    draw() {

        this.ctx.drawImage(this.imageInstance, this.bonesPosition.x, this.bonesPosition.y, this.bonesSize.w, this.bonesSize.h)

    }

}