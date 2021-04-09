window.onload = function () {
    doggyApp.init()
    setTimeout(function () {
        doggyApp.preInit()
    }, 60)
    const button = document.getElementById("start-button")
    console.log(button);
    button.onclick = () => {

        document.getElementById("game-board").classList.remove("invisible")

        doggyApp.reset()
        doggyApp.init()
    }
}

//



