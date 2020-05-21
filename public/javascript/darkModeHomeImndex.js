const butonDeDarkMode = document.createElement("button"); /// butonul cu care voi schimba in dark mode
let darkmode = false;
if (localStorage.getItem("darkmode") == "true")
    darkmode = true;
butonDeDarkMode.style = "border-radius: 20%; border : 1px solid black; color : green; position: absolute; left : 10px;top : 80px;font-size : 150%;";
butonDeDarkMode.textContent = "light mode";
document.querySelector("#corp").appendChild(butonDeDarkMode);

let darked =  () => { /// aici fac aspectul paginii de tip retro mode
    const men = document.querySelectorAll(".men");
    if (darkmode){
        darkmode = !darkmode;
        butonDeDarkMode.textContent = "light mode";
        butonDeDarkMode.style.color = "green";
        button.style.color = "green";
        input1.style.color = "green";
        input2.style.color = "green";
        button1.style.color = "green";
        form.style.backgroundColor = "green";
        corp.style.backgroundImage = "radial-gradient(white,green)";
        for (let i of men){
            i.style.transition = "0s";
            i.style.backgroundColor = "green";
        }
    } else {
        darkmode = !darkmode;
        butonDeDarkMode.textContent = "retro mode";
        butonDeDarkMode.style.color = "black";
        button.style.color  = "black";
        input1.style.color = "black";
        input2.style.color = "black";
        button1.style.color = "black";
        form.style.backgroundColor = "grey";
        corp.style.backgroundImage = "radial-gradient(white,grey)";
        for (let i of men){
            i.style.transition = "0s";
            i.style.backgroundColor = "grey";
        }
    }

    const refaceTranzitia = setTimeout(() => {
        const men = document.querySelectorAll(".men");
        for (let i of men){
            i.style.transition = "1s";
        }
    }, 100);
    localStorage.setItem("darkmode", darkmode);
}

let coloreaza = () => { /// aceasta functie imi coloreaza pagina din start in functie de dark mode
    const men = document.querySelectorAll(".men");
    if (!darkmode){
        butonDeDarkMode.textContent = "light mode";
        butonDeDarkMode.style.color = "green";
        button.style.color = "green";
        input1.style.color = "green";
        input2.style.color = "green";
        button1.style.color = "green";
        form.style.backgroundColor = "green";
        corp.style.backgroundImage = "radial-gradient(white,green)";
        for (let i of men){
            i.style.transition = "0s";
            i.style.backgroundColor = "green";
        }
    } else {
        butonDeDarkMode.textContent = "retro mode";
        butonDeDarkMode.style.color = "black";
        button.style.color  = "black";
        input1.style.color = "black";
        input2.style.color = "black";
        button1.style.color = "black";
        form.style.backgroundColor = "grey";
        corp.style.backgroundImage = "radial-gradient(white,grey)";
        for (let i of men){
            i.style.transition = "0s";
            i.style.backgroundColor = "grey";
        }
    }

    const refaceTranzitia = setTimeout(() => {
        const men = document.querySelectorAll(".men");
        for (let i of men){
            i.style.transition = "1s";
        }
    }, 100);
    localStorage.setItem("darkmode", darkmode);
};

coloreaza();

butonDeDarkMode.addEventListener("click",darked);