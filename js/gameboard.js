class DoggyBoardGame {

    constructor(ctx, canvas, canvasSize, points) {
        this.canvas = canvas
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.points = points
        this.lines = []
        this.timeLine = 105
        this.framesCounter = 0
        this.lives = []
        this.livesArray = []


        this.boardGameInit()
    }

    boardGameInit() {
        //this.boardGameStart()
        this.drawBoard()
        this.drawLines()
        this.lines.forEach(elm => elm.draw())
        this.drawGrass()
        this.drawLava()
        this.drawStones()
        this.drawText()
        this.drawTime()
        this.drawLives()

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

        this.drawAll()
        this.moveTime()


        //this.lives.forEach(elm => elm.draw())

        // this.drawTime.moveTime()

    }

    drawAll() {
        this.drawBoard()
        this.lines.forEach(elm => elm.draw())
        this.drawGrass()
        this.drawLava()
        this.drawStones()
        this.drawArena()
        this.drawText()
        this.drawTime()
        this.drawLives()

    }


    drawLines() {
        const line1 = new Line(this.ctx, 599, 0, 0, 0, 0, 0, 'black', 178)
        const line2 = new Line(this.ctx, 599, 100, 0, 100, 0, 0, 'green', 20)
        const line3 = new Line(this.ctx, 599, 189, 0, 189, 40, 60, 'white', 5)
        const line4 = new Line(this.ctx, 599, 236, 0, 236, 0, 0, 'white', 5)
        const line5 = new Line(this.ctx, 599, 245, 0, 245, 0, 0, 'white', 5)
        const line6 = new Line(this.ctx, 599, 289, 0, 289, 40, 60, 'white', 5)
        const line7 = new Line(this.ctx, 599, 390, 0, 390, 0, 0, 'white', 5)
        const line8 = new Line(this.ctx, 599, 434, 0, 434, 40, 60, 'white', 5)
        const line9 = new Line(this.ctx, 599, 480, 0, 480, 0, 0, 'white', 5)
        const line10 = new Line(this.ctx, 599, 489, 0, 489, 0, 0, 'white', 5)
        const line11 = new Line(this.ctx, 599, 530, 0, 530, 40, 60, 'white', 5)
        this.lines.push(line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11)
    }

    drawBoard() {

        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 600, this.canvasSize.w, this.canvasSize.h / 2 - 100)

        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 5, this.canvasSize.w, this.canvasSize.h,)

        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 600, this.canvasSize.w, 200)

    }

    drawStones() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/stones.png'
        this.ctx.drawImage(this.imageInstance, 0, 90, 600, 30)
        // this.imageInstance = new Image()
        // this.imageInstance.src = 'img/stones.png'
        // this.ctx.drawImage(this.imageInstance, 0, 355, 600, 30)

    }

    drawArena() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'Images/sand_2d.jpg'
        let pat = this.ctx.createPattern(this.imageInstance, "repeat")
        this.ctx.fillStyle = pat;   // set the fill style
        this.ctx.rect(0, 355, 600, 30);  // create a rectangle
        this.ctx.fill();

    }

    drawGrass() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/grass3.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 330, 600, 40)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/grass3.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 570, 600, 40)

    }
    drawLava() {

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 110, 60, 35, 0, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 110, 60, 35, 110, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 110, 60, 35, 220, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 110, 60, 35, 330, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 110, 60, 35, 440, 110, 60, 35)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/lava2.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 110, 60, 35, 550, 110, 60, 35)
    }


    drawText() {

        this.ctx.fillStyle = "white"
        this.ctx.fillText(`SCORE: ${this.points}`, 20, 60)
        this.ctx.font = "30px 'Fixedsys Excelsior 3.01'"

        this.ctx.fillText("LIVES:", 230, 60)
        this.ctx.fillStyle = "white"
        this.ctx.font = "30px 'Fixedsys Excelsior 3.01'"

    }

    drawTime() {

        this.ctx.font = "30px 'Fixedsys Excelsior 3.01'"
        this.ctx.fillText("TIME: ", 25, 675)

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

        const live1 = new Live(this.ctx, 'Images/dog-live.png', 330, 40, 30, 20)
        const live2 = new Live(this.ctx, 'Images/dog-live.png', 360, 40, 30, 20)
        const live3 = new Live(this.ctx, 'Images/dog-live.png', 390, 40, 30, 20)
        const live4 = new Live(this.ctx, 'Images/dog-live.png', 420, 40, 30, 20)
        const live5 = new Live(this.ctx, 'Images/dog-live.png', 450, 40, 30, 20)
        const live6 = new Live(this.ctx, 'Images/dog-live.png', 480, 40, 30, 20)
        const live7 = new Live(this.ctx, 'Images/dog-live.png', 510, 40, 30, 20)

        this.livesArray = [live1, live2, live3, live4, live5, live6, live7]

        // this.lives = livesArray.filter((elm, ind) =>{
        //     let counter = 5
        //     let lifes = 6 - counter 
        //    return (livesArray.indexOf(elm) <= lifes)
        // })
        // console.log(this.lives);

        // this.lives.forEach(elm => elm.draw())


        // console.log(live1)

    }
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }

    successImage() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'Images/dog_recolor.png'
        const puppy = this.ctx.drawImage(this.imageInstance, 0, 0, 50, 50, 120, 100, 50, 50)
        this.puppiesArray.push(puppy)
        console.log(this.puppiesArray);
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
        //this.draw()


    }
    init() {

        this.imageInstance = new Image()
        this.imageInstance.src = this.bonesImages

    }
    draw() {

        this.ctx.drawImage(this.imageInstance, this.bonesPosition.x, this.bonesPosition.y, this.bonesSize.w, this.bonesSize.h)

    }

}

class Puppy {
    constructor(ctx, canvas, canvasSize, frameCount, currentLoopIndex, spriteRow, spriteColumn, puppyPosX, puppyPosY) {
        this.ctx = ctx
        this.canvas = canvas
        this.canvasSize = canvasSize
        this.frameCount = frameCount
        this.currentLoopIndex = currentLoopIndex

        this.puppyImageInstance = undefined
        this.spriteRow = spriteRow
        this.spriteColumn = spriteColumn
        this.puppyPosX = puppyPosX
        this.puppyPosY = puppyPosY

        this.init()
    }

    init() {
        this.puppyImageInstance = new Image()
        this.puppyImageInstance.src = 'Images/dog_recolor.png'
    }

    draw() {
        this.ctx.drawImage(this.puppyImageInstance, this.spriteRow, this.spriteColumn, 50, 50, this.puppyPosX, this.puppyPosY, 50, 50)
    }

}

class levelTwo extends DoggyBoardGame {
    constructor(ctx, canvas, canvasSize) {
        super(ctx, canvas, canvasSize)

    }

    boardGameInit() {
        //this.boardGameStart()
        this.drawBoard()
        this.drawLines()
        this.lines.forEach(elm => elm.draw())
        this.drawGrass()
        this.drawLava()
        this.drawStones()
        this.drawText()
        this.drawTime()
        this.drawLives()

    }
    drawAll() {
        this.drawBoard()
        this.lines.forEach(elm => elm.draw())
        this.drawGrass()
        this.drawWater()
        this.drawSand()
        this.drawLava()
        this.drawStones()
        this.drawText()
        this.drawTime()
        this.drawLives()

    }
    drawLines() {
        const line1 = new Line(this.ctx, 599, 0, 0, 0, 0, 0, 'black', 178)
        const line2 = new Line(this.ctx, 599, 100, 0, 100, 0, 0, 'green', 20)
        const line7 = new Line(this.ctx, 599, 390, 0, 390, 0, 0, 'white', 5)
        const line8 = new Line(this.ctx, 599, 434, 0, 434, 40, 60, 'white', 5)
        const line9 = new Line(this.ctx, 599, 480, 0, 480, 0, 0, 'white', 5)
        const line10 = new Line(this.ctx, 599, 489, 0, 489, 0, 0, 'white', 5)
        const line11 = new Line(this.ctx, 599, 530, 0, 530, 40, 60, 'white', 5)
        this.lines.push(line1, line2, line7, line8, line9, line10, line11)
    }
    drawBoard() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, this.canvasSize.h / 2, this.canvasSize.w, this.canvasSize.h * .35)

    }
    drawSand() {
        this.imageSand = new Image()
        this.imageSand.src = 'Images/sandDesert.jpg'
        this.ctx.drawImage(this.imageSand, 0, 110, this.canvasSize.w, 35)
    }
    drawWater() {
        this.imageWater = new Image()
        this.imageWater.src = 'Images/waterSprite.jpg'
        this.ctx.drawImage(this.imageWater, 0, 145, this.canvasSize.w, 190)
    }
    drawGrass() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'Images/sand_2d.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 330, 600, 40)

        this.imageInstance = new Image()
        this.imageInstance.src = 'img/grass3.jpg'
        this.ctx.drawImage(this.imageInstance, 0, 570, 600, 40)

    }



}