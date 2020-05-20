let screen = document.querySelector("#corp");
screen.style.width = window.innerWidth + "px";
screen.style.height = window.innerHeight + "px";

window.onresize = () => {
    screen.style.width = window.innerWidth + "px";
    screen.style.height = window.innerHeight + "px";
}

/// am facut acest cod pentru a ma asigura ca inaltimea si latimea ecranului sunt mereu maximale