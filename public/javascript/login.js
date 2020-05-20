let mail = document.querySelector("#mail");
let parola = document.querySelector("#parola");
let submit = document.querySelector("#submit");

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

    if (logat){ /// daca a existat atunci afisez primii 3 gmaeri dupa scorul lor, altfel afisez alerta ca nu exista cont 
        gameri.sort(
            function(a,b){
                return a.highscore < b.highscore;
            }
        );
        let numar = 3;
        if (gameri.length < 3)
            numar = gameri.length;
        for (let i = 0; i < numar; i ++){
            let p = document.createElement("div");
            p.textContent = `${gameri[i].nickname} : ${gameri[i].highscore}`;
            p.style = "border: 1px solid black; background-color: white; color : green; border-radius: 20%; text-align: center; text-decoration: strong";
            formular.appendChild(p);
        }
    } else {
        Swal.fire('Cont inexistent!');
        pauseFunction();
    }
});