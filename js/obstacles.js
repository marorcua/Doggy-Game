
class Obstacles {
    constructor(ctx, canvasSize, vehiclePosX, vehiclePosY, vehicleWidth, vehicleHeight, imageSrc, speed, isLog) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.vehiclePosX = vehiclePosX
        this.vehiclePosY = vehiclePosY
        this.vehicleWidth = vehicleWidth
        this.vehicleHeight = vehicleHeight
        this.imageSrc = imageSrc
        this.speed = speed

        this.isLog = isLog
        this.obstacleImageInstance = undefined
        this.scale = 0.5


        this.init()
    }

    init() {
        this.obstacleImageInstance = new Image()
        this.obstacleImageInstance.src = this.imageSrc
        this.draw()
    }

    draw() {
        if (this.isLog) {

            this.ctx.drawImage(this.obstacleImageInstance, 0, 0, 600, 100, this.vehiclePosX, this.vehiclePosY, this.vehicleWidth, this.vehicleHeight)

        } else {
            this.ctx.drawImage(this.obstacleImageInstance, this.vehiclePosX, this.vehiclePosY, this.vehicleWidth, this.vehicleHeight)
        }

        //Rotation method:
        //this.ctx.save()
        //this.ctx.translate(this.carPosX, this.carPosY)
        //this.ctx.rotate(Math.PI / 2)
        //this.ctx.drawImage(this.obstacleImageInstance, this.vehiclePosX, this.vehiclePosY, this.vehicleWidth, this.vehicleHeight)
        // this.ctx.rotate(-Math.PI / 2)
        //this.ctx.restore()

    }

    move() {
        this.vehiclePosX += this.speed
        this.draw()

    }
}

const carObstacle = {
    imageSrc: './Images/car-truck1.png',
    imageSrcRev: './Images/car-truck1-reverse.png',
    vehicleHeight: 28,
    vehicleWidth: 54,
    speed: 2.5,
    vehDown: .76,
    vehUp: .42,

}

const truckObstacle = {
    imageSrc: './Images/car-truck5.png',
    vehicleHeight: 32,
    vehicleWidth: 109,
    speed: 1,
    vehDown: .55,
    vehUp: .35,
}

const sTruckObstacle = {
    imageSrc: './Images/car-truck3.png',
    imageSrcRev: './Images/car-truck3-reverse.png',
    vehicleHeight: 28,
    vehicleWidth: 69,
    speed: 1.6,
    vehDown: .63,
    vehUp: .22,
}

const racingObstacle = {
    imageSrc: './Images/GalardB.png',
    imageSrcRev: './Images/GalardB-reverse.png',
    vehicleHeight: 35,
    vehicleWidth: 63,
    speed: 5,
    vehDown: .70,
    vehUp: .28,
}

const logBigObstacle = {
    imageSrc: './Images/logImage.png',
    imageSrcRev: './Images/logImage.png',
    vehicleHeight: 30,
    vehicleWidth: 100,
    speed: 1.1,
    vehDown: .42,
    vehDown2: .35,
    vehUp: .28,
    vehUp2: .22,
}



