const butonDeDarkMode = document.createElement("button"); /// butonul cu care voi schimba in dark mode
let darkmode = false;
if (localStorage.getItem("darkmode") == "true")
    darkmode = true;
butonDeDarkMode.style = "border-radius: 20%; border : 1px solid black; color : green; position: absolute; left : 10px;top : 10px;font-size : 150%;";
butonDeDarkMode.textContent = "light mode";
document.querySelector("#corp").appendChild(butonDeDarkMode);

const statement = document.querySelectorAll(".statement");
const screen = document.querySelector("#corp");
const img = document.querySelectorAll("img");
const a = document.querySelector("a");
const inputuri = document.querySelectorAll("#butoanele input");

let darked =  () => { /// aici fac aspectul paginii de tip retro mode, daca este cazul
    if (darkmode){
        darkmode = !darkmode;
        for (let i of inputuri)
            i.style.color = "green";
        mail.style.color = "green";
        parola.style.color = "green";
        nickname.style.color = "green";
        parola.style.color = "green";
        a.style.color = "green";
        for (let i of statement)
            i.style.color = "green";
        butonDeDarkMode.textContent = "light mode";
        butonDeDarkMode.style.color = "green";
        screen.style.backgroundImage = "radial-gradient(white,green)";
        for (let i of img)
            i.style.opacity = "1";
    } else {
        for (let i of inputuri)
            i.style.color = "black";
        a.style.color = "black";
        mail.style.color = "black";
        parola.style.color = "black";
        nickname.style.color = "black";
        parola.style.color = "black";
        darkmode = !darkmode;
        butonDeDarkMode.textContent = "retro mode";
        butonDeDarkMode.style.color = "black";
        screen.style.backgroundImage = "radial-gradient(white,grey)";
        for (let i of statement)
            i.style.color = "black";
        for (let i of img)
            i.style.opacity = "0";

    }
    localStorage.setItem("darkmode", darkmode);
}

let coloreaza = () => { /// aceasta functie imi coloreaza pagina din start in functie de dark mode
    if (!darkmode){
        for (let i of inputuri)
            i.style.color = "green";
        a.style.color = "green";
        mail.style.color = "green";
        parola.style.color = "green";
        nickname.style.color = "green";
        parola.style.color = "green";
        butonDeDarkMode.textContent = "light mode";
        butonDeDarkMode.style.color = "green";
        screen.style.backgroundImage = "radial-gradient(white,green)";
        for (let i of statement)
            i.style.color = "green";
        for (let i of img)
            i.style.opacity = "1";
       
    } else {
        for (let i of inputuri)
            i.style.color = "black";
        a.style.color = "black";
        mail.style.color = "black";
        parola.style.color = "black";
        nickname.style.color = "black";
        parola.style.color = "black";
        butonDeDarkMode.textContent = "retro mode";
        butonDeDarkMode.style.color = "black";
        screen.style.backgroundImage = "radial-gradient(white,grey)";
        for (let i of statement)
            i.style.color = "black";
        for (let i of img)
            i.style.opacity = "0";
    }

    localStorage.setItem("darkmode", darkmode);
};

coloreaza();

butonDeDarkMode.addEventListener("click",darked);