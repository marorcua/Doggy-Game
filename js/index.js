window.onload = function () {
    doggyApp.init()
    setTimeout(function(){
        doggyApp.preInit()
    },50)
    const button = document.getElementById("start-button")
    console.log(button);
    button.onclick = () => {
        console.log("hola");
        document.querySelector(".invisible").classList.remove("invisible")
        
        doggyApp.init()
    }
}

//



