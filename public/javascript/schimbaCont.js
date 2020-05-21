let mail = document.querySelector("#mail");
let mail1 = document.querySelector("#mail1");
let parola = document.querySelector("#parola");
let parola1 = document.querySelector("#parola1");
let parola2 = document.querySelector("#parola2");
let nickname = document.querySelector("#nickname");
let butonulSubmit = document.querySelector("#butonulSubmit");
let butonulSterge = document.querySelector("#butonulSterge");

/*
    Aici mamorez in diferite vairabile valorile ce se vor gasi in inputuri.
*/

butonulSubmit.addEventListener("click", async () => { /// in functia asta verific daca parola si parola confirmata coincid, daca da atunci pot sa modific contul daca e valid, printr o metoda de tip put
    if (parola1.value !== parola.value){
        parola.value = "";
        parola1.value = "";
    } 
    else {
    const raspuns = await fetch("http://localhost:800/gameri");
    const gameri = await raspuns.json();
    let id = "nedefinit"; //// prima data setez id-ul ca fiind nedefinit, si il schimb doar daca gasesc un player cu atributele pe care le caut eu
    const len = gameri.length;
    for (let i = 0; i < len; i ++){
        if (gameri[i].mail === mail.value && gameri[i].parola === parola.value){
            id = gameri[i].id;
            break;
        }
    }
    //// caut id-ul playerului cu acele date si dupa ce il gasesc il modific
    const req =await fetch("http://localhost:800/update", {
        method: "put",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id"  : id,
            "mail" : mail1.value, 
            "parola" : parola2.value,
            "nickname" : nickname.value
        })
    });

    localStorage.clear();

    mail1.value = "";
    parola1.value = "";
    parola2.value = "";
    parola.value = "";
    mail.value = "";
    nickname.value = ""; /// dupa ce modific valorile, fac elementele nule in casute
    }
});

butonulSterge.addEventListener("click" , async () => { /// sterg cu ajutorul url - ului 
    if (parola1.value !== parola.value){
        parola.value = "";
        parola1.value = "";
    } 
    else 
    {
    const raspuns = await fetch("http://localhost:800/gameri");
    const gameri = await raspuns.json();
    let id = "nedefinit";
    const len = gameri.length;
    for (let i = 0; i < len; i ++){
        if (gameri[i].mail === mail.value && gameri[i].parola === parola.value){
            id = gameri[i].id; /// caut id-ul playerului cu acele date, iar dupa ce il gasesc il sterg
            break;
        }
    }     

    if (id != "nedefinit"){
        localStorage.clear();
        const req =await fetch("http://localhost:800/sterge-gamer/" + id, {
            method: "delete",
        });
    }

    mail1.value = "";
    parola1.value = "";
    parola2.value = "";
    parola.value = "";
    mail.value = "";
    nickname.value = ""; /// dupa ce sterg  gamerul, fac elementele nule in casute
    }
});