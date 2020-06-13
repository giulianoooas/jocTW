const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

var bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

const port = 800;

// Import
const uid = require('uid');

/// regex

const mailValid = /([a-z]+(.|-|_)?[a-z]*)+@[a-z]+\.[a-z]*/; /// mail-ul are structura standard de mail
const parolaValid = /(([a-z]|[A-Z])*([0-9]|(!|@|#|$|%|^|&|\.|_|-|\+))+([a-z]|[A-Z])+)+/; //// parolele pot fi ceva de genul litere de oricare tip - urmate de cifre sau simboluri deosebite
const parolaValid1 = /(([a-z]|[A-Z])+([0-9]|(!|@|#|$|%|^|&|\.|_|-|\+))+([a-z]|[A-Z])*)+/; /// apoi urmate iar de cifre


/// stop regex

let gameri = []; /// array ul meu de playeri
let comentariile = []; /// array ul de comentarii
///
class CitireScriere{ /// am facut aici doua functii, una care citeste fisierul cand pornesc server-ul si alta care il scrie de fiecare data cand apar schimbari
    constructor(fisier){
        if (!fisier)
            throw new Error("");
        this.fisier = fisier;
        try {
            fs.accessSync(this.fisier);
        } catch(err){
            fs.writeFileSync(this.fisier);
        }
    }

    async read (){ /// citire
        gameri =  JSON.parse(
            await fs.promises.readFile(
                this.fisier, {
                    encoding:'utf8'
                }
            )
        );
    }

    async write () { /// scirere
        await fs.promises.writeFile(
            this.fisier, JSON.stringify(gameri, null, 2)
        );
    }
}

const iostream = new  CitireScriere("database.json");
iostream.read();

let verificareMail = (val) => { /// verific daca mailul are structura corespunzatoare, acest lucru il fac si pentru parola si nickname
    for (let i = 0; i < gameri.length; i ++) //// in plus la nickname si mail verific si daca - s neluate
        if (val === gameri[i].mail)
            return false;

    let aprob = false;
    if (mailValid.test(val))
        for (let vari of mailValid.exec(val)){
            if (vari === val)
                aprob = true;
        }
    return aprob;
};

let verificareNickname = (val) => {
    for (let i = 0; i < gameri.length; i ++)
        if (val === gameri[i].nickname)
            return false;
    if (val !== "")
        return true;
    return false;
};

let verificareParola = (val) => {
    let aprob = false;
    if (parolaValid.test(val))
        for (let vari of parolaValid.exec(val)){
            if (vari === val)
                aprob = true;
        }
    if (parolaValid1.test(val))
        for (let vari of parolaValid1.exec(val)){
            if (vari === val)
                aprob = true;
        }
    if (val.length < 8)
        aprob = false;
    return aprob;
}

app.get('/gameri', (req, res) => {
    res.send(gameri);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/com' , (req,res) => {
    res.send(comentariile);
});

app.post('/addCom', (req,res) => {
    const raspuns = req.body;
    const obiect = {
        "content" : raspuns.content,
        "id" : uid(10),
        "dislake" : 0
    }
    comentariile.push(obiect);
    res.send(comentariile);
});

app.get('/comentarii.html' , (req,res) => {
    res.sendFile(__dirname + "/views/comentarii.html");
});

app.get('/game.html' , (req,res) => {
    res.sendFile(__dirname + "/views/game.html");
});

app.get('/login.html' , (req,res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get('/index.html' , (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/singup.html', (req,res) => {
    res.sendFile(__dirname + "/views/singup.html");
});

app.get('/quiz.html', (req,res) => {
    res.sendFile(__dirname + '/views/quiz.html')
});

app.get('*', (req,res) => {
    res.status(404).sendFile(__dirname + "/views/404.html");
});

app.put('/schimba',(req,res) =>{
    const raspuns = req.body;
    for (let i = 0; i < gameri.length; i ++)
    {
        if (gameri[i].id == raspuns.id){
            if (gameri[i].highscore < raspuns.score){
                gameri[i].highscore = raspuns.score;
            }
            break;
        }
    }
    iostream.write();
    res.send(gameri);
});

app.put('/update', (req,res) => {
    const raspuns = req.body;
    if (verificareParola(raspuns.parola) && verificareNickname(raspuns.nickname) && verificareMail(raspuns.mail))
    for (let i = 0; i < gameri.length; i ++)
        {
            if (gameri[i].id == raspuns.id){
                if (raspuns.mail != "")
                    gameri[i].mail = raspuns.mail;
                if (raspuns.parola != "")
                    gameri[i].parola = raspuns.parola;
                if (raspuns.nickname != "")
                    gameri[i].nickname = raspuns.nickname;
                break;
            }
        }
    iostream.write();
    res.send(gameri);
});

app.post('/adauga-gamer',  (req, res) => {
    const gamer = {
        "nickname": req.body.nickname,
        "mail": req.body.mail,
        "highscore": 0,
        "parola": req.body.parola,
        "id" : uid(20)
    }
    if (verificareMail(gamer.mail) && verificareNickname(gamer.nickname) && verificareParola(gamer.parola)){ 
        gameri.push(gamer);
        iostream.write();
    }
    res.send(gameri);
});

//// pentru a adauga un nou user sau a schimba datele, trebuie ca user-ul sa nu completeze nimic gresit

app.delete('/sterge-com/:id', (req, res) => {
    comentariile = comentariile.filter(user => user.id !== req.params.id);
    res.send(comentariile);
});

app.delete('/sterge-gamer/:id', (req, res) => {
    gameri = gameri.filter(user => user.id !== req.params.id);
    iostream.write();
    res.send(gameri);
});

app.put('/dis', (req,res) =>{
    let merge = true;
    const raspuns =  req.body;
    for (let i of comentariile)
        if (i.id === raspuns.id){
            i.dislake ++;
            if (i.dislake == 5) /// la 5 dislike uri scot comentariul de pe pagina
                merge = false;
        }
    res.send({merge});
});

app.put('/dis1', (req,res) =>{
    const raspuns =  req.body;
    for (let i of comentariile)
        if (i.id === raspuns.id){
            if (i.dislake > 0) /// sscad cu 1 dislikurile
                i.dislake --;
        }
    res.send(comentariile);
});

app.listen(port, () => console.log(`http://localhost:${port}`));