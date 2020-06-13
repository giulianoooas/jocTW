const quizLst = [ /// aici am creat lista de obiecte in cu care voi face chestionarul
    {
        "intrebare" : "Pe ce buton mergi nu spre stanga?",
        "raspunsuri":[
            [
                "Pe tasta A;",
                false
            ],
            [
                "Pe tasta D;",
                true
            ],
            [
                "Pe tasta W;",
                true
            ],
            [
                "Pe tasta S;",
                true
            ]
        ]
    },
    {
        "intrebare" : "Pe ce buton mergi spre dreapta?",
        "raspunsuri":[
            [
                "Pe tasta A;",
                false
            ],
            [
                "Pe tasta D;",
                true
            ],
            [
                "Pe tasta W;",
                false
            ],
            [
                "Pe tasta S;",
                false
            ]
        ]
    },
    {
        "intrebare" : "cum pui pauza?",
        "raspunsuri":[
            [
                "Pe tasta P;",
                true
            ],
            [
                "Pe iconita de pauza;",
                true
            ],
            [
                "Pe tasta R;",
                false
            ],
            [
                "Pe tasta F;",
                false
            ]
        ]
    },
    {
        "intrebare" : "Care din numerele de mai jos sunt posibile pentru generarea monstrilor?",
        "raspunsuri":[
            [
                "1;",
                true
            ],
            [
                "2;",
                true
            ],
            [
                "10;",
                false
            ],
            [
                "5;",
                true
            ]
        ]
    },
    {
        "intrebare" : "Este relevant timer-ul jocului pentru player?",
        "raspunsuri":[
            [
                "Da, sa vada cat timp a supravietuit in joc;",
                true
            ],
            [
                "Nu;",
                false
            ],
            [
                "Da, cu cat faci scorul mai mare, ai si un timer mai mare in joc;",
                true
            ],
            [
                "Pentru self-improvement;",
                false
            ]
        ]
    },
    {
        "intrebare" : "Cand nu se salveaza scorul?",
        "raspunsuri":[
            [
                "Cand iesi de pe site fara sa fii murit;",
                true
            ],
            [
                "Dupa ce mori;",
                false
            ],
            [
                "Cand nu esti logat;",
                true
            ],
            [
                "Cand dai refresh paginii;",
                true
            ]
        ]
    }
];

const chestionar = document.querySelector("#chestionar");

class obiect{
    constructor(obj){
        this.intrebare = obj.intrebare;
        this.raspunsuri = obj.raspunsuri;
    }

    creat(){
        return (`<p style = "font-weight: bold;"> ${this.intrebare}</p>
                <label><input type = "checkbox">${this.raspunsuri[0][0]} </label><br>
                <label><input type = "checkbox">${this.raspunsuri[1][0]} </label><br>
                <label><input type = "checkbox">${this.raspunsuri[2][0]} </label><br>
                <label><input type = "checkbox">${this.raspunsuri[3][0]} </label>`);
    } /// pe modlul react, am construit o clasa ce im creaza automat un nou element al listei

}

for (let i of quizLst){ /// aici formez lista
    const element = new obiect(i);
    const li = document.createElement('li');
    li.innerHTML = element.creat();
    chestionar.appendChild(li);
}

let first = true; /// daca nu s - a mai apasat pe buton
const submit = document.createElement("button")
submit.textContent = "Salveaza raspunsurile";
document.querySelector("#score").appendChild(submit);

submit.addEventListener("click", () => {
    if (first){
        first = false;
        let score = 0;
        const raspunsuri = document.querySelectorAll("input");
        for (let i = 0; i < 6; i ++){
            let ok = true;
            for (let j = 0; j < 4; j ++){
                if (raspunsuri[4*i + j].checked != quizLst[i].raspunsuri[j][1])
                    ok = false;
                raspunsuri[4*i + j].disabled="true";
            }
            if (ok)
                score ++;
        }
        const div = document.createElement('div');
        div.innerHTML = `<p>${score}</p>`;
        div.className = "titlu"; 
        div.id = "scorul";
        document.querySelector("#score").appendChild(div);
    }
});