window.addEventListener("keydown", (tasta)=>{ /// mersul stanga - dreapta le-am facut prin keydown, deoarece vreau sa continue sa mearga si daca tin apasat
    if (hero.life && !pauza)
    switch (tasta.code){
        case "KeyA":
            hero.goLeft(); /// mersul l- am facut simplu, doar apeland metoda goLeft, iar mersul dreapta apeland metoda goRight
            break; 
        case "KeyD":
            hero.goRight();
            break;
    }
});

window.addEventListener("keyup", (tasta)=>{ /// aici am folosit keyup, deoarece o saritura vreau sa se execute doar dupa ce ridic degetul de pe tasta
    if (hero.life && !pauza) /// acestea, ca si in cazul mersului se pot executa doar daca nu e pauza si mai mult doar cate odata, adica eroul nu poate face 2 atacuri sau sarituri sincron
    switch (tasta.code){ /// aceasta fiind o motivatie in plus de a face cu keyup
        case "KeyW":
            if (!hero.isJumping){
                hero.isJumping = true; /// saritura si atacul le - am facut cu metodele specifice
                hero.startJump();
            }
            break;
        case "KeyS":
            if (!hero.isJumping){
                hero.clearAttack(); /// inainte de a ataca golesc atacul actual, deoarce luptatorul nostru nu se poate focaliza pe doua atacuri sincron
                hero.attack();
            }
            break;
        }
    if (tasta.code == "KeyP"){  /// tasta p pune pauza la joc, putem sa mai facem asta si apasand direct pe imaginea cu butonul de pauza
        if (pauza)
            pauseButton.src = "../public/foto/pauza.png";
        else 
            pauseButton.src = "../public/foto/resume.png";
        pauza = !pauza; /// pauza are 2 valori: true -> deci e pauza si false -> deci nu e
    }
});

let Qame_over = () => {
    if (hero.life <= 0 && RAN){ /// in momentul cand am ramas fara viata se termina jocul
        homeLink.style.transition = "0s";
        audio.style.display = "none";
        audio.pause();
        RAN = false;  /// variabila care verifica daca se poate juca devina false
        clearInterval(generator); /// opresc generarea de monstrii/orci
        clearInterval(timer);   /// opresc mersul personajelor rele
        hero.removeAvatar();  /// sterg caracterul
        hero.isJumping = true; /// am pus - o de siguranta sa nu mai poata merge stanga  sau dreapta
        clearInterval(verificareObligatorie); /// opresc verificarea care se face daca jocul mai ruleaza
        cutie_pentru_timp.style.transition = "1s";
        win_screen.removeChild(cutie_pentru_timp); /// scot timer - ul de pe ecran
        clearInterval(timp); ///  opresc incrementarea timpului
        hero.clearAttack(); /// sterg bila de foc daca exista
        gameOver = document.createElement("img"); /// adaug o imagine cu mesajul "game over"
        gameOver.src = "../public/foto/gameOver.png"; 
        gameOver.style.position = "absolute";
        gameOver.style.left  = dim * 0.3 + "px";
        gameOver.style.top = dim1 *0.4 + "px";
        gameOver.style.width = dim * 0.3 + "px";
        gameOver.style.height = dim1 *0.3 + "px";
        scoreBar.style.left = dim*0.45 + "px";
        homeLink.style.left = dim*0.43 + "px";
        win_screen.removeChild(pauseButton); /// scot butonul de pauza
        win_screen.appendChild(gameOver); /// adaug poza de game over
        if (logat)
            modificaHightscore();
        formular.style.display = "none";
    }

};

pauseButton.src = "../public/foto/pauza.png"; 
pauseButton.style.position = "absolute";
pauseButton.style.width = dim*0.03 + "px";
pauseButton.style.height = dim1 * 0.02* "px";
pauseButton.style.left = dim * 0.5 +"px";
pauseButton.style.top = dim1 * 0.1 + "px";
pauseButton.style.zIndex = "1";
win_screen.appendChild(pauseButton);
pauseButton.addEventListener("click", ()=>{
    if (pauza)
            pauseButton.src = "../public/foto/pauza.png";
        else 
            pauseButton.src = "../public/foto/resume.png";
    pauza = !pauza;
});


/*
    aici am creat butonul de pauza si i-am adaugat un event ca in momentul in care il apesi sa se schimbe cu unul resume si invers.
*/
let verificareObligatorie = setInterval(Qame_over, 20); //// am creat o animatie care doar verifica daca jocul mai poate rula constant

window.addEventListener("resize", () => {
    corp.style.height = window.innerHeight + "px"; /// fac corpul jocului cat tot ecranul ca inaltime
    corp.style.width = window.innerWidth + "px"; /// aici fac acest lucru si ca latime
    dim = parseInt(window.innerWidth); ///reatribui valori pentru dim si dim1, deoarece s-au modificat dimensiunile ecranului
    dim1 = parseInt(window.innerHeight);
    cutie_pentru_timp.style.left = dim *0.8 + "px";
    cutie_pentru_timp.style.top = dim1 * 0.1 + "px";
    cutie_pentru_timp.style.height = dim1 * 0.04 + "px";
    cutie_pentru_timp.style.width =dim*0.05 +  "px";
    cutie_pentru_timp.style.fontSize = parseInt(dim *0.019) + "px";
    deseneazaScore();
    hero.deseneazaViata();
    pauseButton.style.width = dim*0.03 + "px";
    pauseButton.style.height = dim1 * 0.02* "px";
    pauseButton.style.left = dim * 0.5 +"px";
    pauseButton.style.top = dim1 * 0.1 + "px";
    if (parseInt(hero.avatar.style.left) > dim - dim*0.8)
        hero.avatar.style.left = dim - dim*0.8 + "px";
    spatele.style.width = dim + "px";
    spatele.style.height = dim1 + "px";
    hero.avatar.style.top = dim1*0.8+ "px";
    hero.topAvatar = parseInt(hero.avatar.style.top);
    originalTop = hero.topAvatar;
    for (let i = 0 ; i < listaInamici.length;  i ++){
        listaInamici[i].elementul.style.top = originalTop + "px";
        listaInamici[i].elementul.style.width = dim*0.08 + "px";
    }
    if (gameOver !== 0){
        gameOver.style.left  = dim * 0.3 + "px";
        gameOver.style.top = dim1 *0.4 + "px";
        gameOver.style.width = dim * 0.3 + "px";
        gameOver.style.height = dim1 *0.3 + "px";
        scoreBar.style.left = dim*0.45 + "px";   
    }

    /// in aceasta functie tot ce fac este sa reincadrez tot, deoarece cand fac resize, anumite elemente vor avea o pozitie aiurea si de asta repar
    /// pe erou daca depaseste latime ecranului il dau la maxim de dreapta cat sa fie inca in ecran, iar pe inamici ii las, deoarece oricum se vor intoarce singuri

});

let pauseFunction = () => { /// functia asta face sa fie pauza
    pauza = true;
    pauseButton.src = "../public/foto/resume.png";
};