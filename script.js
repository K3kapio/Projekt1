let punktyX=0;
let punktyO=0;

let ktogra="X";
let ktograwyniki="wyniki_X";
let x=0;
let licznik=0;
let jakieid=0;

let zablokowane = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let komputer = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
function losujTablice(){
    let counts = new Array(8).fill(0); 
    let nums = []; 

    while (nums.length < 16) {
    let randNum = Math.floor(Math.random() * 8) + 1; 
    if (counts[randNum - 1] < 2) { 
        counts[randNum - 1]++; 
        nums.push(randNum); 
    }
    }
    return nums;
}

function przypiszWartosci(){
    let tablica = losujTablice();
    for(let i = 0; i<16; i++){
        
        let a = document.getElementById(i);
        a.value=tablica[i];
        a.disabled = false;
    }
    document.getElementById(ktograwyniki).style.backgroundColor = "yellow";
    document.getElementById("player_vs_player").disabled=true;
    document.getElementById("player_vs_computer").disabled=true;

}



function usuwanie(a, tab){
    let x = tab.indexOf(a);
    if(x>-1){
        tab.splice(x, 1);
    }
}

function kto(a, id){
    if(licznik==0){
        x=a;
        if(document.getElementById("OC").innerHTML=="O"){
            licznik+=1;
        }else{
            licznik+=2;
            if(ktogra=="C"){
                losujC();
            }
        }
        document.getElementById(id).disabled=true;
        jakieid=id;
    }
    else{
        if(licznik==1){
            if(x==a){
                
                licznik=0;
                x=0;
                a=0;
                document.getElementById(id).disabled = true;
                usuwanie(parseInt(id), zablokowane);
                document.getElementById(jakieid).disabled = true;
                usuwanie(parseInt(jakieid), zablokowane);
                console.log("to jest id "+ id+" a to jest tablica "+zablokowane);
                if(ktogra=="X"){
                    punktyX++;
                    document.getElementById(ktogra).innerHTML=punktyX;
                    document.getElementById(ktograwyniki).style.backgroundColor="";
                    ktogra="O";
                    ktograwyniki="wyniki_O";
                    document.getElementById(ktograwyniki).style.background="yellow";
                }
                else{
                    punktyO++;
                    document.getElementById(ktogra).innerHTML=punktyO;
                    document.getElementById(ktograwyniki).style.backgroundColor="";
                    ktogra="X";
                    ktograwyniki="wyniki_X";
                    document.getElementById(ktograwyniki).style.backgroundColor="yellow";
                }
                wygrana();
            }
            else{
                for(let i = 0; i<16; i++){
                    document.getElementById(i).disabled=true;
                }
                setTimeout(function(){
                    document.getElementById(id).style.removeProperty("background");
                    document.getElementById(jakieid).style.removeProperty("background");
                    for(let i = 0; i<zablokowane.length; i++){
                        document.getElementById(zablokowane[i]).disabled=false;
                    }
                }, 1000)
                licznik=0;
                if(ktogra=="X"){
                    document.getElementById(ktograwyniki).style.backgroundColor="";
                    ktogra="O";
                    ktograwyniki="wyniki_O";
                    document.getElementById(ktograwyniki).style.backgroundColor="yellow";
                }
                else{
                    document.getElementById(ktograwyniki).style.backgroundColor="";
                    ktogra="X";
                    ktograwyniki="wyniki_X";
                    document.getElementById(ktograwyniki).style.backgroundColor="yellow";
                }
                wygrana();
            }
        
            
        }
        else{

            if(x==a){
                
                licznik=0;
                x=0;
                a=0;
                usuwanie(parseInt(id), zablokowane);
                console.log("to jest id "+ id+" a " + jakieid +" to jest tablica "+zablokowane);
                usuwanie(parseInt(jakieid), zablokowane);
                tabpom=zablokowane.slice();
                document.getElementById(id).disabled = true;
                document.getElementById(jakieid).disabled = true;
                if(ktogra=="X"){
                    punktyX++;
                    document.getElementById(ktogra).innerHTML=punktyX;
                    document.getElementById(ktograwyniki).style.backgroundColor="";
                    ktogra="C";
                    ktograwyniki="wyniki_C";
                    document.getElementById(ktograwyniki).style.background="yellow";
                    if(ktogra=="C"){
                        losujC();
                    }
                }
                else{
                    punktyO++;
                    document.getElementById(ktogra).innerHTML=punktyO;
                    document.getElementById(ktograwyniki).style.backgroundColor="";
                    ktogra="X";
                    ktograwyniki="wyniki_X";
                    document.getElementById(ktograwyniki).style.backgroundColor="yellow";
                }
                wygrana();
            }
            else{
                for(let i = 0; i<16; i++){
                    document.getElementById(i).disabled=true;
                }
                setTimeout(function(){
                    document.getElementById(id).style.removeProperty("background");
                    document.getElementById(jakieid).style.removeProperty("background");
                    for(let i = 0; i<zablokowane.length; i++){
                        document.getElementById(zablokowane[i]).disabled=false;
                    }
                }, 1000)
                licznik=0;
                if(ktogra=="X"){
                    document.getElementById(ktograwyniki).style.backgroundColor="";
                    ktogra="C";
                    ktograwyniki="wyniki_C";
                    document.getElementById(ktograwyniki).style.backgroundColor="yellow";
                    if(ktogra=="C"){
                        losujC();
                    }

                }
                else{
                    document.getElementById(ktograwyniki).style.backgroundColor="";
                    ktogra="X";
                    ktograwyniki="wyniki_X";
                    document.getElementById(ktograwyniki).style.backgroundColor="yellow";
                }
                wygrana(); 
            }
        }
    }
    
}
function press(id) {
    let a = document.getElementById(id);
    
    a.style.background = "url('jpg/" + a.value + ".jpg')";
    a.style.backgroundSize="cover";
    kto(a.value, id);
  }
  
function unpress(id) {
}

function restart(){
    punktyO=0;
    punktyX=0;
}


function computerr(){
    przypiszWartosci();
    document.getElementById("wyniki_O").innerHTML="Komputer <span id='C'>0</span>";
    document.getElementById("wyniki_O").id = "wyniki_C";
    document.getElementById("OC").innerHTML="C";
}
let licznik2=0
let tabpom = zablokowane.slice();
let sprawdzenie = -1;
function losujC(){
    setTimeout(function(){
        let losowaWar = 0;
        
        if(licznik2==0){
            licznik2++;
            losowaWar = tabpom[Math.floor(Math.random()*zablokowane.length)];
            
            usuwanie(losowaWar, tabpom);
            press(losowaWar);
        }else{
            licznik2=0;
            losowaWar = tabpom[Math.floor(Math.random()*zablokowane.length)];
            
            tabpom=zablokowane.slice();
            press(losowaWar);
        }
        
    }, 1000)
    
}

function wygrana(){
    if(punktyO>punktyX){
        if(document.getElementById("OC").innerHTML === "O"){
            document.getElementById("main_win").innerHTML="Wygrywa gracz O";
        }else{
            document.getElementById("main_win").innerHTML="Wygrywa komputer";
        }
    }
    else{
        if(punktyO<punktyX){
            document.getElementById("main_win").innerHTML="Wygrywa gracz X";
        }
        else{
            document.getElementById("main_win").innerHTML="remis";
        }
    }
}
