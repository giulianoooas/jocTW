const butonDeDarkMode = document.createElement("button"); /// butonul cu care voi schimba in dark mode
let darkmode = false;
if (localStorage.getItem("darkmode") == "true")
    darkmode = true;
butonDeDarkMode.style = "border-radius: 20%; border : 1px solid black; color : green; position: absolute; left : 10px;top : 10px;font-size : 150%;";
butonDeDarkMode.textContent = "light mode";
document.querySelector("#corp").appendChild(butonDeDarkMode);

const span = document.querySelector("#textIntroductiv");
const img = document.querySelectorAll("img");
const catre = document.querySelectorAll(".catre");

let darked =  () => { /// aici fac aspectul paginii de tip retro mode
    input = document.querySelectorAll("input");
    if (darkmode){
        darkmode = !darkmode;
        butonDeDarkMode.textContent = "light mode";
        butonDeDarkMode.style.color = "green";
        screen.style.backgroundImage = "radial-gradient(white,green)";
        span.style.backgroundColor = "green";
        for (let i of input)
            i.style.color = "green";
        for (let i of img)
            i.style.opacity = "1";
        butonulSterge.style.color = "green";
        butonulSubmit.style.color = "green";
        for (let i of catre)
            i.style.backgroundColor = "green";
    } else {
        darkmode = !darkmode;
        span.style.backgroundColor = "grey";
        butonDeDarkMode.textContent = "retro mode";
        butonDeDarkMode.style.color = "black";
        screen.style.backgroundImage = "radial-gradient(white,grey)";
        for (let i of catre)
            i.style.backgroundColor = "grey";
        for (let i of input)
            i.style.color = "black";
        butonulSterge.style.color = "black";
        butonulSubmit.style.color = "black";
        for (let i of img)
            i.style.opacity = "0";

    }
    localStorage.setItem("darkmode", darkmode);
}

let coloreaza = () => { /// aceasta functie imi coloreaza pagina din start in functie de dark mode
    input = document.querySelectorAll("input");
    if (!darkmode){
        for (let i of catre)
            i.style.backgroundColor = "green";
        butonDeDarkMode.textContent = "light mode";
        butonDeDarkMode.style.color = "green";
        screen.style.backgroundImage = "radial-gradient(white,green)";
        span.style.backgroundColor = "green";
        for (let i of input)
            i.style.color = "green";
        for (let i of img)
            i.style.opacity = "1";
        butonulSterge.style.color = "green";
        butonulSubmit.style.color = "green";
       
    } else {
        for (let i of catre)
            i.style.backgroundColor = "grey";
        span.style.backgroundColor = "grey";
        butonDeDarkMode.textContent = "retro mode";
        butonDeDarkMode.style.color = "black";
        screen.style.backgroundImage = "radial-gradient(white,grey)";
        for (let i of input)
            i.style.color = "black";
        butonulSterge.style.color = "black";
        butonulSubmit.style.color = "black";
        for (let i of img)
            i.style.opacity = "0";
    }

    localStorage.setItem("darkmode", darkmode);
};

coloreaza();

butonDeDarkMode.addEventListener("click",darked);