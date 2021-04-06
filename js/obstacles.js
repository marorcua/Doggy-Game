
class Obstacles {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.vel = 10
        this.carImageInstance = undefined
        this.carPosX = 480
        this.carPosY = 300
        this.carWidth = 40
        this.carHeight = 100

        this.init()
    }

    init() {
        this.carImageInstance = new Image()
        this.carImageInstance.src = './Images/car-truck1.png'
        this.draw()
    }

    draw() {
        this.ctx.save()
        //this.ctx.translate(this.carPosX, this.carPosY)
        this.ctx.rotate(Math.PI / 2)
        this.ctx.drawImage(this.carImageInstance, this.carPosX, this.carPosY, this.carWidth, this.carHeight)
        // this.ctx.rotate(-Math.PI / 2)
        this.ctx.restore()

    }

    move() {

        this.carPosY -= 3
        this.draw()

    }


}

// let carImg = new Image()
// carImg.src = "./Images/car-truck1.png"
// carImg.onload = function () {
//     draw()
// }






// //canvas = document.querySelector('canvas')
// //ctx = canvas.getContext('2d')


// function draw() {
//     console.log("aqui")

//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     ctx.fillRect(250, 250, 50, 30)

//     //requestAnimationFrame(draw)
//     //this.move()
// }