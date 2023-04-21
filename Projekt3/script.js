let punktyX=0;
let punktyO=0;
let ktoGra="X";
let ktoGraWyniki="wyniki_X";
let licznikPodejsc=0;
let licznikPodejscComputera=0;
let idPomocnicze=0;
let tablicaZablokowanych=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let tablicaComputera = tablicaZablokowanych.slice();
let zapisanaWartosc = -1;
let ktoGra2="O";
let ktoGra1="X";
let ktoGraWyniki2="wyniki_O";
let ktoGraWyniki1="wyniki_X";

function dezaktywacjaPrzycisku(id){
    document.getElementById(id).disabled=true;
}

function aktywacjaPrzycisku(id){
    document.getElementById(id).disabled=false;
}

function doliczaniePunktow(ktoGra, punkty){
    document.getElementById(ktoGra).innerHTML=punkty;
}

function zmianaPrzeciwnika(ktoGraP){
    document.getElementById(ktoGraWyniki).style.backgroundColor="";
    if(ktoGraP =="X"){
        ktoGra = ktoGra2;
        ktoGraWyniki = ktoGraWyniki2;
        if(ktoGra2=="C"){
            losujC();
        }
    }
    else if (ktoGraP =="O" || ktoGraP == "C"){
        ktoGraWyniki=ktoGraWyniki1;
        ktoGra = ktoGra1;
    }
    document.getElementById(ktoGraWyniki).style.backgroundColor="#f3ff4e";
}

function odkrycieObrazkow(id, idPomocnicze, ktoGra){
    dezaktywacjaPrzycisku(id);
    dezaktywacjaPrzycisku(idPomocnicze);
    kasowanie(parseInt(id), tablicaZablokowanych);
    kasowanie(parseInt(idPomocnicze), tablicaZablokowanych);
    ktoTerazGra(ktoGra);
}

function ktoTerazGra(ktoGraXX){
    let punkty =0;
    if(ktoGraXX=="X"){
        punkty = ++punktyX;
    }
    else{
        punkty = ++punktyO;
    }
    doliczaniePunktow(ktoGraXX, punkty);
    zmianaPrzeciwnika(ktoGraXX);

}

function zleDobraneObrazki(id, idPomocnicze){
    setTimeout(function(){
        document.getElementById(id).style.background="url(jpg/tlo.jpg)";
        document.getElementById(idPomocnicze).style.background="url(jpg/tlo.jpg)";
        for(let i = 0; i<tablicaZablokowanych.length; i++){
            aktywacjaPrzycisku(tablicaZablokowanych[i]);
        }
    }, 1000);
}

function kto(wartosc, id){
    if(licznikPodejsc==0){
        zapisanaWartosc=wartosc;
        if(ktoGra=="C"){
            losujC();
        }
        licznikPodejsc++;
        dezaktywacjaPrzycisku(id);
        idPomocnicze=id;
    }
    else{
        if(zapisanaWartosc==wartosc){
            odkrycieObrazkow(id, idPomocnicze, ktoGra);     
        }
        else{
            for(let i = 0; i<16; i++){
                dezaktywacjaPrzycisku(i);
            }
            zleDobraneObrazki(id, idPomocnicze);
            zmianaPrzeciwnika(ktoGra);
        }
        zapisanaWartosc=-1;
        licznikPodejsc=0;
    }
    wygrana();
}

function press(id){
    if(tablicaZablokowanych.length!=0){
        let identyfikator = document.getElementById(id);
        identyfikator.style.background = "url('jpg/" + identyfikator.value + ".jpg')";
        identyfikator.style.backgroundSize="cover";
        kto(identyfikator.value, id);        
    }
    else{
        document.getElementById("main_win").innerHTML+= "   Koniec gry";
    }
}

function kasowanie(index, tab){
    let indeks =  tab.indexOf(index);
    indeks>-1 ? tab.splice(indeks,1): console.log("Koniec gry, wszystkie elemnty usuniete");
}

function losowanieTablicy(){
    let tab1 = new Array(8).fill(0); 
    let num = []; 

    while (num.length < 16) {
    let randNum = Math.floor(Math.random() * 8) + 1; 
    if (tab1[randNum - 1] < 2) { 
        tab1[randNum - 1]++; 
        num.push(randNum); 
    }
    }
    return num;
}

function przypiszWartosci(){
    let tablica = losowanieTablicy();
    for(let i =0; i<16; i++){
        let przypisywanie = document.getElementById(i);
        przypisywanie.value=tablica[i];
        przypisywanie.disabled = false;
        document.getElementById(i).style.background = "url(jpg/tlo.jpg)";
    }
    document.getElementById(ktoGraWyniki).style.backgroundColor = "#f3ff4e";
    dezaktywacjaPrzycisku("player_vs_player");
    dezaktywacjaPrzycisku("player_vs_computer");
    aktywacjaPrzycisku("restart");
    document.getElementById("main_win").innerHTML="Graj";

}

function losujC(){
    setTimeout(function(){
        let losowaWar = 0;
        if(licznikPodejscComputera==0){
            tablicaComputera=tablicaZablokowanych.slice();
            licznikPodejscComputera++;
            losowaWar = tablicaComputera[Math.floor(Math.random()*tablicaZablokowanych.length)];
            kasowanie(losowaWar, tablicaComputera);
            press(losowaWar);
            for(let i = 0; i<16; i++){
                dezaktywacjaPrzycisku(i);
            }
        }
        else{
            licznikPodejscComputera=0;
            losowaWar = tablicaComputera[Math.floor(Math.random()*tablicaComputera.length)];
            tablicaComputera=tablicaZablokowanych.slice();
            press(losowaWar);
            for(let i = 0; i<tablicaZablokowanych.length; i++){
                aktywacjaPrzycisku(tablicaZablokowanych[i]);
            }
        }
    },1000)
}

function computerr(){
    przypiszWartosci();
    document.getElementById("wyniki_O").innerHTML="Komputer <span id='C'>0</span>";
    document.getElementById("wyniki_O").id = "wyniki_C";
    ktoGra2="C";
    ktoGraWyniki2="wyniki_C"
}

function wygrana(){
    let pomoc = document.getElementById("main_win");

    if(punktyO>punktyX){
        if(ktoGra2=="O"){
            pomoc.innerHTML="Wygyrwa gracz O";
        }
        else{
            pomoc.innerHTML="Wygrywa komputer";
        }
    }
    else if (punktyO<punktyX){
        pomoc.innerHTML="Wygrywa gracz X";
    }
    else{
        pomoc.innerHTML="Remis";
    }
    if(tablicaZablokowanych.length==0){
        press("3");
    }
}

function restart(){
    punktyO=0;
    punktyX=0;
    aktywacjaPrzycisku("player_vs_player");
    aktywacjaPrzycisku("player_vs_computer");
    dezaktywacjaPrzycisku("restart");
    ktoGra=ktoGra1;
    if(ktoGra2=="C"){
        document.getElementById("wyniki_C").innerHTML="Gracz O <span id='O'>0</span>";
        document.getElementById("wyniki_C").id = "wyniki_O";
        ktoGra2="O";
        ktoGraWyniki2="wyniki_O";
    }
    ktoGraWyniki=ktoGraWyniki1;
    
    doliczaniePunktow(ktoGra, punktyX);
    doliczaniePunktow(ktoGra2, punktyO);
    for(let i = 0; i<16; i++){
        dezaktywacjaPrzycisku(i);
        document.getElementById(i).style.removeProperty("background");
    }
    tablicaZablokowanych=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    licznikPodejsc=0;
    document.getElementById(ktoGraWyniki).style.backgroundColor="";
    document.getElementById(ktoGraWyniki2).style.backgroundColor="";
    document.getElementById("main_win").innerHTML="Rozpocznij klikając PVP lub PVC";
}