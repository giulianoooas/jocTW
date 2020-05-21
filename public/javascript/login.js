const  mail = document.querySelector("#mail");
const  parola = document.querySelector("#parola");
const  submit = document.querySelector("#submit");
const  span = document.querySelector("#fromular span");
const deDisparut = document.querySelectorAll(".deDisparut"); /// aceste hr le-am pus doar pentru a face pagina mai frumos decorata

submit.addEventListener("click" ,async () => {
    const response = await fetch("http://localhost:800/gameri"); /// intorc de pe server lista cu playeri si vad daca exista playerul cu acel mail si acea parola
    let gameri = await response.json();
    for (let i = 0; i < gameri.length; i ++){
        if (gameri[i].parola == parola.value && gameri[i].mail == mail.value)
            {
                logat = true;
                mail.style = "display:none";
                parola.style = "display:none";
                submit.style = "display:none";
                idGamer = gameri[i].id;
            }
    }

    if (logat && firstLogin){ /// daca a existat atunci afisez primii 3 gmaeri dupa scorul lor, altfel afisez alerta ca nu exista cont 
        firstLogin = false;
        for (let i of deDisparut)
            i.style.display = "none"; /// scot hr - urile in plus de pe pagina

        gameri.sort(
            function(a,b){
                return a.highscore < b.highscore;
            }
        );

        span.textContent = "TOP";
        let numar = 3;
        if (gameri.length < 3)
            numar = gameri.length;
        for (let i = 0; i < numar; i ++){
            let p = document.createElement("div");
            p.textContent = `${gameri[i].nickname} : ${gameri[i].highscore}`;
            p.style = "border: 1px solid black; background-color: white; color : green; border-radius: 20%; text-align: center; font-weight: bold";
            formular.appendChild(p);
            if (gameri[i].id === idGamer){
                localStorage.setItem("name", gameri[i].nickname); /// aici memorez in browser daca am fost sau nu logat
            }
                
        }
        formular.appendChild(document.createElement("hr"));
        for (let i = 0; i < gameri.length; i ++){
            if (gameri[i].id === idGamer){
                let p = document.createElement("div");
                p.textContent = `${gameri[i].nickname} : ${gameri[i].highscore}`;
                p.style = "border: 1px solid black; background-color: white; color : green; border-radius: 100%; text-align: center; font-weight: bold";
                formular.appendChild(p);     
            }               
        }
        
        formular.appendChild(document.createElement("hr"));
    } else {
        Swal.fire('Cont inexistent!');
        pauseFunction();
    }
});