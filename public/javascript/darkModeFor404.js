let darkmode = false;
if (localStorage.getItem("darkmode") == "true")
    darkmode = true;

const div = document.querySelector("#link");

let coloreaza = () => { /// aceasta functie imi coloreaza pagina din start in functie de dark mode
    div.style.transition = "0s";
    if (!darkmode){
        div.style.backgroundColor = "green";
    } else {
        div.style.backgroundColor = "grey";
    }
    const refaceInterfata = setTimeout(() =>{
        div.style.transition = "1s";
    }, 100);
};

coloreaza();


/// jocul nu il voi face orice ar fi dark mode, deoarece asa e gandit jocul
