
hero.avatar.style.left = Math.random() * (dim*0.9)  + "px"; /// setez mereu random pozitia eroului

hero.lifeBar = () => {

    win_screen.removeChild(hero.viata); /// prima data scoate div - ul de pe ecran dar in readauga dupa ce il reconstruieste
    hero.viata = document.createElement("div");

    for (let i = 0; i < hero.life; i += 10){
        let imagine = document.createElement("img");
        imagine.style.width = dim * 0.05 + "px";
        imagine.style.height =  dim1 * 0.05 + "px"
        imagine.src = "../public/foto/viataMea.png";
        hero.viata.appendChild(imagine); /// aici adaug numarul  de inimioare div-ului ca fiind hero.life/10,desigur partea intreaga
    }
    win_screen.appendChild(hero.viata); /// acum readaug ecranului lifebarul
};

hero.deseneazaViata = () => {
    hero.lifeBar(); 
    hero.viata.style.zIndex = "1";
    hero.viata.style.position = "absolute";
    hero.viata.style.top = dim1*0.1 + "px";
    hero.viata.style.left = dim*0.1 + "px";
    /// ii reatribui mereu propietatiile, din acelasi motiv ca la celelalte, ca am evenimentul la resize
};

hero.deseneazaViata(); 

hero.constructor = () => {
    hero.lefta.push("../public/foto/L1.png");
    hero.lefta.push("../public/foto/L2.png");
    hero.lefta.push("../public/foto/L3.png");
    hero.lefta.push("../public/foto/L4.png");
    hero.lefta.push( "../public/foto/L5.png");
    hero.lefta.push("../public/foto/L6.png");
    hero.lefta.push("../public/foto/L7.png");
    hero.lefta.push("../public/foto/L8.png");
    hero.lefta.push("../public/foto/L9.png");
    hero.righta.push("../public/foto/R1.png");
    hero.righta.push("../public/foto/R2.png");
    hero.righta.push("../public/foto/R3.png");
    hero.righta.push("../public/foto/R4.png");
    hero.righta.push("../public/foto/R5.png");
    hero.righta.push("../public/foto/R6.png");
    hero.righta.push("../public/foto/R7.png");
    hero.righta.push("../public/foto/R8.png");
    hero.righta.push("../public/foto/R9.png");
    /// am construit arrayurile pentru miscarea stanga prin lefta si dreapta prin righta, fiecare miscare avand cate 9 poze, pentru a mima mersul pas cu pas
}

hero.constructor(); /// apelez constructorul
hero.avatar.src = hero.righta[0]; /// asta e pozitia de start, uitandu - se catre dreapta

hero.startJump = () => { /// functia de start jump, ce imi aduce prima data caracterul in pozitia de nemiscat ce se afla la indexul 0 al fiecarui array de miscare
    if (hero.merg_stanga)
        hero.avatar.src = hero.lefta[0]; /// daca mergea spre stanga
    else
        hero.avatar.src = hero.righta[0]; /// daca mergea spre dreapta
    hero.left_movement = 0;
    hero.right_movment = 0;
    hero.conutJumping = 20; /// imi face count ul de 20, deoarece se ridica de 10 ori si scade de 10 ori cu 20 de px
    hero.saritura = setInterval(hero.Sarind, 25); /// creez o animatie ce se va executa pana va ajunge in poztia initial, am ales 25 pentru a fi o saritura cu cat mai putin lag
};

hero.Sarind = () => { 
    if (!pauza){ /// continua aceasta saritura doar daca nu este pauza, daca este nu are rost sa o continue
        if (hero.conutJumping){ /// daca mai are count continua animatia, daca nu setez isJamping la false, adica nu sare si opresc animatia
            if (hero.conutJumping > 10){
                hero.conutJumping --;
                hero.topAvatar -= 20;
                hero.avatar.style.top = hero.topAvatar + "px";
            } else {
                hero.conutJumping --;
                hero.topAvatar += 20;
                hero.avatar.style.top = hero.topAvatar + "px";
            }
        } else {
            hero.isJumping = false;
            clearInterval(hero.saritura);
        }
    }
};

hero.attack = () =>{ /// functia ce imi creaza atacul eroului
    hero.isAttacking = true; /// prima data fac isAttacking true, deoarece am inceput sa atac, si firstShoot true, deoarece vreau sa am posibilitatea de a omori un inamic
    hero.firstShoot = true;
    if (hero.merg_stanga){ /// daca merg spre stanga, la fel ca la saritura readuc personajul in pozitie de nesimscat si dupa incep sa atac
        hero.avatar.src = hero.lefta[0];
        hero.left_movement = 1;
        src = "../public/foto/myAttackD.png";  /// acesta este numele pentru poza ce are bila care ataca spre stanga
        let imagine = document.createElement("img");
        imagine.src = src;
        imagine.style.width = parseInt(dim*0.08*0.4) + "px";
        imagine.style.height = parseInt(dim1*0.08*0.3) + "px";
        imagine.style.position = "absolute";
        imagine.style.display = "initial";
        imagine.style.top = hero.topAvatar + dim*0.08*0.5 + "px";
        imagine.style.left = parseInt(hero.avatar.style.left) + 40 + "px";
        imagine.style.zIndex = "0.5"; /// fac un zIndex mai mic decat al eroului sa se vada sub poza cu el
        let partial = {
            element : imagine,
            directie: hero.merg_stanga
        }; /// aici crez un obiect ce are doua campuri, merg_stanga ce verifica directia de atac si iamginea propiu zis
        hero.atacuri.push(partial);
        win_screen.appendChild(hero.atacuri[hero.atacuri.length - 1].element); /// o adaug pe ecran cat si in array - ul meu

    } else {/// in cazul atacului spre dreapta se intampla fix aceleasi lucruri ca la cel spre stanga
        hero.avatar.src = hero.righta[0];
        hero.right_movment = 1;
        src = "../public/foto/myAttackS.png";
        let imagine = document.createElement("img");
        imagine.src = src;
        imagine.style.width = parseInt(dim*0.08*0.4) + "px";
        imagine.style.height = parseInt(dim1*0.08*0.3) + "px"
        imagine.style.position = "absolute";
        imagine.style.display = "initial";
        imagine.style.top = hero.topAvatar + dim*0.08*0.5 + "px";
        imagine.style.left = parseInt(hero.avatar.style.left) + 70 + "px";
        imagine.style.zIndex = "0.5";
        hero.atacuri.push(imagine);
        let partial = {
            element : imagine,
            directie: hero.merg_stanga
        };
        hero.atacuri.push(partial);
        win_screen.appendChild(imagine);
        win_screen.appendChild(hero.atacuri[hero.atacuri.length - 1].element);
    }
    /// aici am creat un timmer ce ma va duce dupa 100ms la functia initiatAttack pentru a incepe atacul
    setTimeout(hero.initiatAttack, 100);
};

hero.initiatAttack = () => { /// daca intru in functie cu true, atac spre stanga, altfel spre dreapta
        if (hero.atacuri[hero.atacuri.length - 1].directie){
            hero.looping = setInterval(hero.lovituraStanga, 10); /// aici am creat animatile corespunzatoare fiecarei directii de atac, prin cele doua metode specifice
        } else {
            hero.looping =setInterval(hero.lovitraDreapta, 10);
        }
};

hero.disparitie = () => { /// vad daca a lovit pe cineva, daca da inseamna ca s - a mai aplicat functia odata, daca nu inseamna ca este prima data
    if (hero.firstShoot && hero.isAttacking){
        scoreBar.textContent = String(score);
        clearInterval(hero.looping); /// opresc animatia prima data
        win_screen.removeChild(hero.atacuri[hero.atacuri.length - 1].element); /// elimin bila de foc de pe ecran
        hero.atacuri.pop(); /// scot atacul din array
        hero.isAttacking = false; /// zic ca isAttacking este false
    }
    hero.firstShoot = false;
};

hero.clearAttack = () => {
    hero.disparitie();
};

hero.lovitraDreapta = () => {
    if (!pauza){ /// daca nu este pauza atunci se executa
        let pozitie = parseInt(hero.atacuri[hero.atacuri.length - 1].element.style.left); /// aici am pozitia bilei de foc
        if (pozitie + 19 + parseInt(dim*0.08*0.4) <=  dim){ /// daca inca mai pot inainte fara sa ies din pagina atunci execut
            const stanga = parseInt(hero.atacuri[hero.atacuri.length - 1].element.style.left); ///aici am memorat pozitia inainte de a se modifica sub forma unei constante
            hero.atacuri[hero.atacuri.length - 1].element.style.left = pozitie + 9 + "px"; 
            for (let i = 0; i < listaInamici.length && hero.firstShoot; i ++){ /// parcurg lista de inamici sa vad daca pot sterge vreun inamic, o parcurg pana cand am sters deja primul inamic
                const stanga1 = parseInt(listaInamici[i].elementul.style.left); /// pozitia inamicului
                if (stanga >= stanga1  + 10 && stanga <= stanga1 + 70){ /// daca bila de foc atinge un inamic, atunci acesta va fi eliminat de pe harta
                    swamp(i,listaInamici.length - 1); /// am facut asta printr - un swamp cu ultimul inamic, urmat de stergera acestuia
                    if (hard_of_level > 100)  /// aici cresc dificultatea prin timpul de aparitie al inamicilor
                        hard_of_level -= 100;
                    else if (hard_of_level > 10)
                        hard_of_level -= 10;     /// la fiecare inamic mort se va face mai greu nivelul
                    win_screen.removeChild(listaInamici[listaInamici.length - 1].elementul);
                    listaInamici.pop();
                    score ++;
                    hero.deseneazaViata(); /// redesnez viata
                    hero.disparitie();  /// in momentul acesta opresc animatia
                }  
            }
        }
        else 
        hero.disparitie(); /// caz in care nu mai pot inainta opresc animatia
    }
};

hero.lovituraStanga = () => { /// aceasta metoda a fost gandita exact ca cealalata de dinainte, cand atacam spre dreapta, doar ca a schimbat verificarea deplasari, deoarece merge invers
    if (!pauza){ /// si am schimbat si atingerea bilei a inamicilor
        let pozitie = parseInt(hero.atacuri[hero.atacuri.length - 1].element.style.left);
        if (pozitie - 9 >= 0){
            const stanga = parseInt(hero.atacuri[hero.atacuri.length - 1].element.style.left);
            hero.atacuri[hero.atacuri.length - 1].element.style.left = pozitie - 9 + "px";
            for (let i = 0; i < listaInamici.length && hero.firstShoot; i ++){
                const stanga1 = parseInt(listaInamici[i].elementul.style.left);
                if (stanga -20 >= stanga1  + 10 && stanga - 20 <= stanga1 + 70){
                    if (hard_of_level > 100)
                        hard_of_level -= 100;
                    else if (hard_of_level > 10)
                        hard_of_level -= 10;     /// la fiecare inamic mort se va face mai greu nivelul
                    swamp(i,listaInamici.length - 1);
                    win_screen.removeChild(listaInamici[listaInamici.length - 1].elementul);
                    listaInamici.pop();
                    score ++;
                    hero.deseneazaViata();  
                    hero.disparitie(); 
                }  
            }
        }
        else 
        hero.disparitie();
    }
}

hero.goLeft = () => { /// functia de mers spre stanga, ea imi deplaseaza peronajul spre stanga
    const stanga1 = parseInt(hero.avatar.style.left); /// pozitia actuala stanga
    const latime1= parseInt(hero.avatar.clientWidth); /// latimea caracterului, le - am facut constante, deoarece nu se pot modifica
    if (stanga1 - 9 >= 0) /// daca pot sa inaintez, atunci modific atat leftul, cat si poz in functie de indicele pentru multimea de poze stanga, left_movment, care mereu va fi mod 9, deoarece sunt 9 poze doar
        {
            hero.merg_stanga = true; /// am facut true deoarece am mers spre stanga
            hero.right_movment = 0; /// mereu fac indicele pentru miscarea opusa 0 pentru a ma asigura ca daca schimb directia de mers, tot va merge corect
            hero.avatar.src = hero.lefta[hero.left_movement]; /// cum am is schimb poza corespunzator
            hero.left_movement ++;
            hero.left_movement %= 9;
            hero.avatar.style.left = stanga1 - 9 + "px";
            hero.avatar.style.transition = "0s";
        } else { /// daca mu pot inainte, atunci ii pun poza de stat pe loc, adica lefta[0] si fac si indicele de miscare corespunzator 0
            hero.merg_stanga = true;
            hero.right_movment = 0;
            hero.left_movement = 0;
            hero.avatar.src = hero.lefta[0];
        }
};

hero.goRight = () => { /// functia go_right are fix acelasi rationament in spate ca functia go_left, difrenta fiind facuta ca acum lucrez cu indicele right_movment, iar pe left_movment il fac mereu 0
    const stanga1 = parseInt(hero.avatar.style.left); // si lucrez cu multimea de poze righta, iar la verificare tin cont si de latimea caracterului
    const latime1= parseInt(hero.avatar.clientWidth);
    if (stanga1 + latime1 + 9 <=  dim)
        {
            hero.merg_stanga = false;
            hero.left_movement = 0;
            hero.avatar.src = hero.righta[hero.right_movment];
            hero.right_movment ++;
            hero.right_movment%= 9;
            hero.avatar.style.left = stanga1 + 9 + "px";
            hero.avatar.style.transition = "0s";
        } else {
            hero.merg_stanga = false;
            hero.right_movment = 0;
            hero.left_movement = 0;
            hero.avatar.src = hero.righta[0];
        }
};

hero.removeAvatar = () => { /// aceasta functie verifica daca am sters avatarul de pe harta, si daca nu ,il sterge
    if (!hero.wasRemoved){
        win_screen.removeChild(hero.avatar);
        hero.wasRemoved = true;
    }
}