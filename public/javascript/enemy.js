enemy.constructor = () => { // retin pozele din fisierul meu corespunztoare inamicului
    enemy.lefta.push("../public/foto/L1E.png");
    enemy.lefta.push("../public/foto/L2E.png");
    enemy.lefta.push("../public/foto/L3E.png");
    enemy.lefta.push("../public/foto/L4E.png");
    enemy.lefta.push( "../public/foto/L5E.png");
    enemy.lefta.push("../public/foto/L6E.png");
    enemy.lefta.push("../public/foto/L7E.png");
    enemy.lefta.push("../public/foto/L8E.png");
    enemy.righta.push("../public/foto/R1E.png");
    enemy.righta.push("../public/foto/R2E.png");
    enemy.righta.push("../public/foto/R3E.png");
    enemy.righta.push("../public/foto/R4E.png");
    enemy.righta.push("../public/foto/R5E.png");
    enemy.righta.push("../public/foto/R6E.png");
    enemy.righta.push("../public/foto/R7E.png");
    enemy.righta.push("../public/foto/R8E.png");
}

/* 
acest constructor functioneaza similar cu cel de la hero, adica creaza 2 array cu poze, righta pentru miscarile drepta
si lefta pentru cele din stanga, doar ca acum sunt doar 8 poze
*/
enemy.constructor();

let creatPozitie = () => { /// aceasta creaza pozita pe care va fi random generat urmatorul monstru
    let poz = Math.random()*(dim*0.9);
    while (poz >= parseInt(hero.avatar.style.left) - dim*0.1  && poz < parseInt(hero.avatar.style.left) + dim*0.1) /// acest lucru se va intampla pana cand exista o oarecare distanta fata de player
        poz = Math.random()*(dim*0.9);  /// pentru a nu face imposibil jocul
    return poz;
};

let createMonster = () => {
    if (hero.life > 0 && listaInamici.length < 20 && !pauza){ /// aceasta functie functioneaza doar daca nu este pauza sau eroul nostru mai are viata
        let element = { /// acesta este un inamic ce va fi adaugat in lista me de inamici
            "left_movement": 0, // contor ce tine minte la ce poza am ramas pe partea stanga
            "right_movment":0, // contor ce tine minte la ce poza am ramas pe partea dreapta
            "merg_stanga" : true, /// aceasta este miscarea catre stanga ca la erou, true = stanga, false = dreapta
            "elementul" : document.createElement("img"), /// asta un element actual, adica poza inamicului
            "firstShoot": true, /// o variabila first shoot ce ne ajua sa facem jocul echilibrat astfel ca eroul sa nu - si ia de 2 ori demage de la un inmaic
            "position" : creatPozitie() /// pozitia pe care va fi generat
        };

        element.elementul.style.position = "absolute"; 
        element.elementul.style.left = element.position + "px";
        element.elementul.style.top = originalTop + 10 + "px";
        element.elementul.style.zIndex = "1"; /// ii fac z indexul 1, deoarce vreau sa se vada deasupra pozei de background
        element.elementul.style.width = "8%"; /// are latimea ca eroul
        
        if (parseInt(hero.avatar.style.left) < element.position)
            element.elementul.src = enemy.lefta[0]; /// in functie de pozitia eroului vad daca inamicul meu o va lua spre stanga sau dreapta
        else{
            element.elementul.src = enemy.righta[0];
            element.merg_stanga = false;
        }

        listaInamici.push(element); //// il adaug atat pe ecran cat si in lista de inamici
        win_screen.appendChild(listaInamici[listaInamici.length - 1].elementul);
    }
};

let randomBetwennumber = () => { /// aici e o functie care imi genereaza un numar random de inamici, la inceput pot fi cel mult 2, apoi 3, apoi 4 si la final 5, dupa ce atingem 150 de puncte
    if (beforeScore + 50 === score){
        beforeScore += 50;
        if (genereazaMonstriiCaDificultate < 5)
            genereazaMonstriiCaDificultate ++;
    }
    let numarGenerat = Math.random()*1000 + 1;
    numarGenerat = parseInt(numarGenerat);
    return (numarGenerat%genereazaMonstriiCaDificultate + 1); 
};

let generator = setInterval(() =>{ /// am creat o animatie ce imi va genera random un numar random de inamici la un timp in functie de inamicii omorati
    let numarMonstrii = randomBetwennumber();
    while(numarMonstrii --)
        createMonster();
}, hard_of_level);

let sterg = new Array(); /// acesta este un array in care adaug inamicii ce trebuie sa fie stersi dupa ce fac functia de miscare

function verification(i){ /// aceasta functie doar verifica daca un inamic se suprapune cu eroul, daca da,ii va lua o viata eroului, dar si el va disparea
    if (listaInamici[i].position >= parseInt(hero.avatar.style.left) - 50 && listaInamici[i].position <= parseInt(hero.avatar.style.left) + 50){
        if (listaInamici[i].firstShoot){
            sterg.push(i);
            hero.life -= 10; 
            hero.deseneazaViata(); /// redesenez viata pentru a arata cum s-a dus acea viata
            listaInamici[i].firstShoot = false; /// desigur ca tin cont si daca e prima lovitura pentru anu lua mai mult din viata persoajului
        }
    }
}

let walking = () => { /// aici este functia mea ce imi  va misca antagonistii stanga - dreapta
    if (!pauza){ /// aceasta se va executa doar daca nu este pauza
        for (let i = 0; i < listaInamici.length; i ++){ /// parcurg vecrtorul de inamici
            verification(i); /// prima data verific daca as putea ataca eroul cu unul dintre antagonistii mei
            if (listaInamici[i].merg_stanga){ /// prima data verific directia in care merg
                if (listaInamici[i].position - 9 >= 0){ /// daca pot sa inaintez, atunci o fac la fel ca la eoru, in functie de indicele corespunzator directiei de deplasare
                    listaInamici[i].position -= 9; /// si vectorul de deplasre, adica lefta pentru cele 8 poze din stanga si rghta pentru cele 8 poze din dreapta
                    listaInamici[i].elementul.style.left = listaInamici[i].position + "px"; 
                    listaInamici[i].elementul.src = enemy.lefta[listaInamici[i].left_movement];
                    listaInamici[i].left_movement ++;
                    listaInamici[i].left_movement %= 8; /// in cazul acesta fac mod 8 si nu mod 9, deoarcere am doar 8 poze
            } else {
                listaInamici[i].left_movement = 0; /// in cazul in care nu ma pot deplasa tot imi pun caracterul in pozitia de nemiscat de pe partea corespunzatoare cu miscarea
                listaInamici[i].merg_stanga = false;
                listaInamici[i].elementul.src = enemy.righta[0];
                listaInamici[i].right_movment = 1;
            }
        } else {
            if (listaInamici[i].position + 130 <= dim){
                listaInamici[i].position += 9;
                listaInamici[i].elementul.style.left = listaInamici[i].position + "px";
                listaInamici[i].elementul.src = enemy.righta[listaInamici[i].right_movment];
                listaInamici[i].right_movment ++;
                listaInamici[i].right_movment %= 8;
        } else {
            listaInamici[i].right_movment = 0;
            listaInamici[i].merg_stanga = true;
            listaInamici[i].elementul.src = enemy.lefta[0];
            listaInamici[i].left_movement = 1;
                }
            }
        } /// in ambele cazuri, adica si pentru enemy dar si pentru hero, am verficat la miscarea cate dreapta daca mai pot inaite luand in calcul si latimea personajului
        let lungime = listaInamici.length; /// aceasta variabila retine numarul de inamici
        for (let i = 0; i < sterg.length; i ++){ /// dupa parcurg vectorul de sterse unde am memorat indicii inamicilor ce vor fi stersi
            swamp(sterg[i],lungime - 1); /// fac swamp cu ultima pozitie pentru a sterge in O(1) cu functia pop
            win_screen.removeChild(listaInamici[lungime - 1].elementul); /// dupa ce am facut swamp ul doar elimin ultima pozitie atat de pe ecran cat si din lista de inamici
            listaInamici.pop();
            lungime --; // decrementez lungimea 
        }
        sterg = new Array(); // fac array ul sterg iar gol
    }
}

let timer = setInterval(walking, 100); /// am creat o animatia ce va executa miscarea stanga dreapta a apersonajelor negative la un interval de 100ms