/// aici voi face posibilitatea playerului de a se loga si a se deloga de pe site

const button  = document.createElement("button"); /// butonul cu care voi lucra pentru singout
let logat = (localStorage.getItem("name") !== null); /// am facut o verificare simpla ce vede daca sunt sau nu logat

/// stilizez butonul
button.style = "border-radius: 20%; border : 1px solid black; color : green; position: absolute; left : 10px;top : 10px;font-size : 150%;";
button.textContent = "Sing out"
const corp = document.getElementById("corp");


/// acum urmeaza sa creez formularul meu de logare
const form = document.createElement("div");
const input1 = document.createElement("input");
input1.type = "email";
input1.placeholder = "mail";
input1.style = "border:1px solid black; border-radius: 20%; color:green;";
form.appendChild(input1);
const input2 = document.createElement("input");
form.appendChild(document.createElement("br"));
input2.type = "password";
input2.style = "border:1px solid black; border-radius: 20%; color:green;";
input2.placeholder = "parola";
form.appendChild(input2);
form.style = "border:1px solid black; border-radius: 20%; background-color:green;position: absolute; left : 10px;top : 10px;text-align:center;"
form.appendChild(document.createElement("br"));
const button1 = document.createElement("button");
button1.style = "border-radius: 20%; border : 1px solid black; color : green;";
button1.textContent = "login";
form.appendChild(button1);


/// aici afisez interfata prima si prima data
corp.appendChild(button);
corp.appendChild(form);

if (logat){
    form.style.display = "none";
} else {
    button.style.display = "none";
}


/// urmeaza sa sciu acelasi cod atat pentru evenimentele ce se vor petrece daca apesi pe butoanele de login sau sing out
/// practic vad daca exista contul pe care il caut si daca da, atunci ma conectez, altfel n- o fac, pastrand datele in local storage
/// si daca- s deja conectat, atunci tot ce fac este sa ma deloghez, scotand datele din local storage

button.addEventListener("click",async () => {
    if (logat){
        button.style.display = "none";
        form.style.display = "initial";
        localStorage.clear();
        logat = false;
    } else {
        const raspuns = await fetch("http://localhost:800/gameri");
        const gameri = await raspuns.json();

        for (let i of gameri){
            if (i.mail === input1.value && i.parola === input2.value){
                logat = true;
                localStorage.setItem("name", i.nickname);
                form.style.display = "none";
                button.style.display = "initial";
                break;
            }
        }

    }
});


button1.addEventListener("click",async () => {
    if (logat){
        button.style.display = "none";
        form.style.display = "initial";
        localStorage.clear();
        logat = false;
    } else {
        const raspuns = await fetch("http://localhost:800/gameri");
        const gameri = await raspuns.json();

        for (let i of gameri){
            if (i.mail === input1.value && i.parola === input2.value){
                logat = true;
                localStorage.setItem("name", i.nickname);
                form.style.display = "none";
                button.style.display = "initial";
                break;
            }
        }

    }
});