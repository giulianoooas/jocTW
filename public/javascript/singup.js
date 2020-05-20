const mail = document.querySelector("#mail");
const nickname = document.querySelector("#nickname");
const parola = document.querySelector("#parola");
const age = document.querySelector("#age");
const input = document.querySelectorAll("input");
const reset = document.querySelector("#reset");
const submit = document.querySelector("#submit");

/// inputurile de tip checkbox si radio le voi folosi pentru a afisa un mesaj personalizat

/// daca apas pe butonul de reset golesc continutul butoanelor
reset.addEventListener("click", () => {
    age.value = "";
    mail.value = "";
    nickname.value = "";
    parola.value = "";
    for (let i = 0; i < input.length; i ++){
        if (input[i].type == "radio" || input[i].type == "checkbox")
            input[i].checked = false;
    }
});

/// daca apas pe butonul de submit, trimit toate informatiile pe care le am in primele inputuri catre serverul meu 
submit.addEventListener("click", async () =>{

    const obiect = {
        "mail" : mail.value,
        "parola" : parola.value,
        "nickname" : nickname.value
    }
    if (age.value > 5 && +age.value != NaN){ /// daca are mai mult de 5 ani
        const req = await fetch("http://localhost:800/adauga-gamer", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obiect)
    });

    let numaratoare = 0; /// vad al catelea input de tip radio este
    let marcate = 0; /// vad cate elemente de tip cheeeeeekbox sunt marcate 
    let perioadaDeJoc = "rar";
    for (let i of input){
        if (i.type == "radio"){
            numaratoare ++;
            if (i.checked){
                i.checked = false;  /// daca alege primul sau al doilea input inseamna ca se joaca rar, iar daca il alege pe al treilea sau al patrulea inseamna ca se joaca des
                break; 
            }
        }
    }

    if (numaratoare < 5){
        if (numaratoare < 2)  
            perioadaDeJoc = "rar";
        else 
            perioadaDeJoc = "des";
    }

    for (let i of input){
        if (i.type == "checkbox"){
            if (i.checked){
                i.checked = false;
                marcate ++; 
            }
        }
    }
    //// in functie de numarul de tipuri de jocuri pe care il selecteaza el va fi cadegorizat ca fiind pretentios sau nu
    if (marcate < 3)
        marcate = "pretentios";
    else 
        marcate = "gamer adevarat";


    const mesaj = `Te joci destul de ${perioadaDeJoc} si esti un ${marcate}.`;
    Swal.fire(mesaj);
    }
});


/// practic ultimile inputuri le am pentru a afisa un mesaj friendly pentru player, in functie de ce completeaza