const comentariile = document.querySelector("#comentariile"); /// acesta imi va memora div-ul cu comentarii, unde sunt acestea puse
const text = document.querySelector("#text"); /// acesta va fi caseta unde las comenentarii
const ascundCom = document.querySelector("#ascundCom"); /// butonul ce ascunde comentarile
const afisezCom = document.querySelector("#afisezCom");/// butonul ce afiseaza comentarile
let comentarii = [];
let ascuns = false; /// vede daca-s ascunse
let ok = true; /// cu aceasta variabila verific daca s-au mai adaugat sau nu elemente in lista de somentarii, si daca da atunci fac un request nou la server

const sterge = async (id) =>{ /// sterg comentul prin ID
    ok = true;
    const req = await fetch ('http://localhost:800/sterge-com/' + id.explicitOriginalTarget.id, {method : "DELETE"});
    scrie();
};

let scrie = async () => { /// aici scriu comentarile
    comentariile.textContent = "";
    if (ok){
        const response = await fetch('http://localhost:800/com');// aici iau de pe server lista cu comentarile
        comentarii = await response.json(); /// aici le convertesc in json
    }
    let h = 0;
    if (comentarii.length) {/// daca exista comentarii, atunci le afisesz, altfel afisez mesajul niciun comentariu
        comentarii.map((key) => {
            const div = document.createElement("div");
            div.style.height = "70px";
            div.style.width = "100%";
            div.style.border = "1px solid black";
            const editare = document.createElement("div");
            editare.className = "mij";
            const b1 = document.createElement("button");
            const b2 = document.createElement("button");
            b1.textContent = "+";
            b2.textContent = "-";
            b2.id = key.id;
            b1.id = key.id;
            const p = document.createElement("p");
            p.textContent = `${key.content}`;
            p.className = "pentruEditare";
            editare.appendChild(p);
            div.appendChild(editare);
            div.appendChild(b1);
            div.appendChild(b2);
            comentariile.appendChild(div);
            b2.addEventListener("click", async (id =b2.id) => { /// in momentul in care apas pe dislike, creste numarul de dislikeuri, dar pentru fiecare like oferit scade pana redevine null
                if (localStorage.getItem("name")){
                    const req =  await fetch('http://localhost:800/dis' , {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "id" : id.explicitOriginalTarget.id
                        })
                    })
                    const raspuns = await req.json();
                    if (!raspuns.merge)
                        sterge(id);
            }
            });    
            b1.addEventListener("click", async (id =b2.id) => { /// acesta este butonul de like
                if (localStorage.getItem("name")){
                    const req =  await fetch('http://localhost:800/dis1' , {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "id" : id.explicitOriginalTarget.id
                        })
                    })
            }
            });        
        })
    }else 
    {
        const b = document.createElement('b');
        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        comentariile.appendChild(br1);
        comentariile.appendChild(br2);
        b.textContent = "Niciun comentaiu!";
        comentariile.appendChild(b);
    }
    ok = false;
};

const incarca = document.querySelector("#incarca");

incarca.addEventListener("click",async () => { /// aici fac actiunea de submit a com-ul, lucru ce se intampla doar daca sunt logat 
    if (localStorage.getItem("name")){
        if (text.value)
            {
                ok = true;
                const req = await fetch('http://localhost:800/addCom' , {
                    method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "content" : text.value
            })
                })

                const res = await req.json();
                text.value = "";
                if (!ascuns)
                    scrie();

            }
    }
});

afisezCom.addEventListener("click" , () =>{
    if (ascuns)
        scrie();
    ascuns = false;
});
ascundCom.addEventListener("click", () =>{
    if (!ascuns){
        comentariile.textContent = "";
        ascuns = true;
        const br1 = document.createElement("br");
        const br2 = document.createElement("br");
        comentariile.appendChild(br1);
        comentariile.appendChild(br2);
        const b = document.createElement('b');
        b.textContent = "Sunt ascunse!";
        comentariile.appendChild(b);
    }
});

scrie();