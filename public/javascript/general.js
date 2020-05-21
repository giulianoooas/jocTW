let corp = document.querySelector("#corp"); /// reprezinta corpul jocului meu
let score = 0; /// variabila ce memoreaza scorul
let beforeScore = 0; /// ma ajuta sa contorizez scorul, deoarece din 50 in 50 la score se poate genera un inamic in plus
let genereazaMonstriiCaDificultate = 2; /// creste din 50 in 50
let pauza = false; /// o variabila ce verifica daca este pauza sau nu
let RAN = true; /// variabila ce verifica daca se mai poate juca
let masuratoare = 0; // timerul meu, pentru a afisa de cat timp se joaca player- ul
let cutie_pentru_timp = document.createElement("div"); // in acest element voi afisa timer- ul
let hard_of_level = 2500; /// memmoreaza la ce interval de timp se va spauna un inamic nou
corp.style.height = window.clientHeight; /// fac corpul jocului cat tot ecranul
let win_screen = document.querySelector("#wingame"); /// imi selecteaza game screen, adica frame ul jocului
let spatele = document.querySelector("#spatele"); //// im selecteaza poza de fundal
let pauseButton = document.createElement("img"); /// butonul de pauza, ce poate fi apasat si are 2 aspecte, 1 de pauza cat jocul ruleaza si altul de resume cand nu ruleaza
let scoreBar = document.createElement("div"); /// o sa mi afiseze scorul 
let gameOver = 0; /// in aceasta variabila voi salva poza game over cand voi pierde jocul
let formular = document.querySelector("#fromular"); /// formularul de logare
let logat = false; /// daca esti conectat
let idGamer = "undifened"; /// momentan player- ul nu este logat
let firstLogin = true; //// verific daca n-a fost deja logat
const homeLink = document.getElementById("homeLink");/// div-ul ce memoreaza link-ul catre prima pagina

let hero = {
    "wasRemoved" : false,  /// verifica daca avatarul a fost sters de pe ecran
    "merg_stanga" : false, /// verifica daca merg spre stanga, daca da e true, altfel e false
    "removeAvatar" : () =>{}, /// o metoda ce imi sterge avatarul de pe win_game
    "lifeBar" : () => {}, // creaza bara de viata 
    "righta" : new Array(), // este multimea pozelor pe care o folosesc pentru a reproduce miscarea spre dreapta
    "lefta" : new Array (), // este multimea pozelor pe care o folosesc pentru a reproduce miscarea spre stanga
    "avatar" :  document.querySelector("#hero"), //// memorez din DOM poza caracterului meu
    "topAvatar" : 0, /// acest lucru este de fapt propietatea css avatar.style.top
    "life" :30, /// aceasta variabila reprezinta viata caracterului meu
    "left_movement" : 0, // contor ce tine minte la ce poza am ramas pe partea stanga
    "right_movment":0, // contor ce tine minte la ce poza am ramas pe partea dreapta
    "isJumping" : false, // pentru a sari, vede daca se poate
    "attack": () =>{}, /// functia care face atacul, in cazul fiecarei fuctii am declarat aici functiile ca fiind vide, dar le-am rescris inafara obiectului pentru a fi mai friendly codul
    "initiatAttack" : () => {}, /// functia care creaza animatie de atac, adica bila mea de foc ce va omori orci, si vede daca trebuie sa se duca spre stanga sau spre dreapta
    "atacuri" : new Array(), /// un array in care pun atacurile
    "disparitie" : () => {}, /// o functie care imi opreste animatia pentru atac
    "startJump" : () => {}, /// o metoda ce generaza saritura
    "constructor" : () => {}, /// imi introduce in arrayurile lefta si righta imaginile corespunzatoare miscarii eroului
    "clearAttack" : () => {}, /// apeleaza metoda disparitie
    "lovituraStanga" : () => {}, /// o functie ce muta cat se poate bila de foc spre stanga, fara a depasi ecranul
    "lovitraDreapta" : () => {}, /// o functie ce muta pe cat se poate bila de foc spre dreapta, fara a depasi ecranul
    "isAttacking" : false, /// verifica daca atac
    "conutJumping" : 0, /// ma ajuta pentru a contoriza saritura
    "Sarind" : () => {}, /// functia ce realizeaza saritura, face 10 ridicari de cate 20 px a topului, apoi 10 cobori si apoi se opreste animatia
    "saritura" : 0, /// varibila pentru care am setat intervalul la saritura
    "looping" : 0, /// variabila pentru care am setat intervalul la atac
    "goLeft" : () => {}, /// o metoda cu care ma deplasez in stanga
    "goRight" : () => {}, /// o metoda cu care ma deplasez in dreapta
    "deseneazaViata": () => {}, /// imi deseneaza inimioarele de viata
    "firstShoot" : true,  /// verifica daca a lovit un inamic si daca da nu-l mai poate lovi si pe al doilea
    "viata" : document.querySelector("#life") /// un div in care am pus inimioarele de viata
};


let enemy = {
    "righta" : new Array(), //// este multimea pozelor pe care o folosesc pentru a reproduce miscarea spre dreapta, dar in cazul inamicului
    "lefta" : new Array (), /// este multimea pozelor pe care o folosesc pentru a reproduce miscarea spre stanga, dar in cazul inamicului
    "constructor" : () => {} /// la fel ca in cazul eorului,am un constructor
}

let listaInamici = new Array(); /// am creat un array pentru a memora inamicii

function swamp (i,j){ /// functia ce interschima doua pozitii diferite din array listaInamici
    let d = listaInamici[i];
    listaInamici[i] = listaInamici[j];
    listaInamici[j] = d;
}

spatele.src = "../public/foto/background.png"; /// am pus ca background aceasta poza
let dim = parseInt(window.innerWidth); /// latimea ecranului
let dim1 = parseInt(window.innerHeight); /// inaltimea ecranului
corp.style.height = window.innerHeight+"px"; // fac corpul sa aiba aceasi inaltime ca ecranul
hero.avatar.style.top = dim1*0.8+ "px"; /// setez top ul eroului meu
hero.topAvatar = parseInt(hero.avatar.style.top); /// aici il dau variabilei topAvatar, deoarece asta este scopul ei
let originalTop = hero.topAvatar; /// memorez top- ul original al eroului in aceastavariabila, deoarece voi mai avea nevoie de el

/// crez o cutie pentru tim situata in dreapta ecranului pentru a ii arata playerului cat timp s-a jucat

cutie_pentru_timp.style.position = "absolute"; 
cutie_pentru_timp.style.left = dim *0.8 + "px";
cutie_pentru_timp.style.top = dim1 * 0.1 + "px";
cutie_pentru_timp.style.height = dim1 * 0.04 + "px";
cutie_pentru_timp.style.width =dim*0.05 +  "px";
cutie_pentru_timp.style.zIndex = "1"; /// amm setat asa zIndex pentru a se vedea deaspura backgrundului
cutie_pentru_timp.style.backgroundColor = "green";
cutie_pentru_timp.style.border = "1px solid black";
cutie_pentru_timp.style.textAlign = "center";
cutie_pentru_timp.style.borderRadius = "30%";
cutie_pentru_timp.style.fontSize = parseInt(dim *0.019) + "px";
cutie_pentru_timp.style.fontFamily = "Arial";
cutie_pentru_timp.style.color = "white";
win_screen.appendChild(cutie_pentru_timp); /// am adaugat cutia pentru timp ferestrei jocului

/// acelasi lucru pe care l-am facut creand o cutie de timp il voi face creand si un score bar,situat ub cutie, pe care de asemenea il voi adauga ferestrei jocului
scoreBar.style.position = "absolute";
scoreBar.style.left = dim *0.8 + "px";
scoreBar.style.top = dim1 * 0.2 + "px";
scoreBar.style.height = dim1 * 0.04 + "px";
scoreBar.style.width =dim*0.05 +  "px";
scoreBar.style.zIndex = "1";
scoreBar.style.backgroundColor = "green";
scoreBar.style.border = "1px solid black";
scoreBar.style.textAlign = "center";
scoreBar.style.borderRadius = "30%";
scoreBar.style.fontSize = parseInt(dim *0.019) + "px";
scoreBar.style.fontFamily = "Arial";
scoreBar.style.color = "white";
scoreBar.textContent = `${score}`;
win_screen.appendChild(scoreBar);

function deseneazaScore() { /// pentru a fi mai usor de desnat scorul in score bar, am creat aceasta functie ce schimba continutul div-ul cu scorul meu
    scoreBar.style.fontSize = parseInt(dim *0.019) + "px";
    scoreBar.style.left = dim *0.8 + "px";
    scoreBar.style.top = dim1 * 0.2 + "px";
    scoreBar.style.height = dim1 * 0.04 + "px";
    scoreBar.style.width =dim*0.05 +  "px";
    scoreBar.textContent = `${score}`;
}/// am reatribuit dimensiunile scoreBarului, deoarece mai incolo voi avea un event cand se modifica dimensiunile paginii, deci ar trebui sa se modifice si cele ale score barului meu

let prinTime = () => { /// aceasta functie imi tipareste in timp minute si secundele jucate de forma mm : ss, unde mm sunt minutele si ss secundele, iar aceastea trebuie sa aiba minimum 2 cifre
    if (!pauza){/// aceasta functie va afisa doar daca nu este pauza, altfel isi va lua freeze
        masuratoare ++;
        let minute, secunde, s;
        if (parseInt(masuratoare/ 60) < 10)
            minute = '0' + parseInt(masuratoare/60); /// in cazul in care minutele sau secundele sunt de o cifra, le adaug 0 la inceput
        else 
            minute = parseInt(masuratoare/60);
        if (parseInt(masuratoare% 60) < 10)
            secunde = '0' + parseInt(masuratoare%60);
        else 
            secunde = parseInt(masuratoare%60);
        s = minute + ":" + secunde;
        cutie_pentru_timp.textContent = s;
    }
};

prinTime();
let timp = setInterval(prinTime, 1000); /// am creat o animatie ce printeaza timpul, deci automat il creste, la fiecare secunda


async function  modificaHightscore () { /// modifica scorul playerilor logati daca este nevoie
    const req = await fetch("http://localhost:800/schimba", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : idGamer,
                score
            })
    });
    ///console.log("A mers");
}


/// fac o functie care verifica daca sunt deja logat pe site sau nu

let verificare = async ()  =>{
    const name = localStorage.getItem("name");
    if (name !== null){
        const raspuns = await fetch ("http://localhost:800/gameri");
        const gameri = await raspuns.json();
        for (let i of gameri){
            if (i.nickname === name)
                {
                    idGamer = i.id;
                    logat = true;
                }
        }

        if (logat && firstLogin){ /// daca a existat atunci afisez primii 3 gmaeri dupa scorul lor, altfel afisez alerta ca nu exista cont 
            firstLogin = false;
            mail.style = "display:none";
            parola.style = "display:none";
            submit.style = "display:none";
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
        }

    }
};

verificare();