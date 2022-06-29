'use strict';
 
const message = document.querySelector('#message');
const panelControl = document.querySelector('#panel-control');
const panelGame = document.getElementById("panel-game");
const btLevel = document.querySelector('#btLevel');
const btPlay = document.querySelector('#btPlay');
const gameStarted = document.querySelectorAll(".gameStarted");
let cards= document.querySelectorAll('.cards');



function reset(){

panelGame.style.display ='none';

message.textContent="";
message.classList.remove('hide');

gameStarted.forEach((esconder)=>esconder.classList.add('hide'))


if (btLevel.value == '0'){
    btPlay.disable=true;
    panelGame.style.display='none';
}
else {  
    btPlay.disable=false;
    panelGame.style.display='grid';
}
btLevel.addEventListener('change', () =>{
    reset();
});


}


reset();



function startGame(){
    btPlay.textContent="Terminar Jogo";
    btLevel.disable=true;
    gameStarted.forEach((mostrar)=>mostrar.classList.remove('hide'));
    message.classList.add("hide");
    cards.forEach((card) =>{
        const randomNumber = Math.floor(Math.random() * cards.length) + 1;
        card.style.order = `${randomNumber}`;
    })
    showCards(cards);
}

function stopGame(){
    btPlay.textContent="Iniciar Jogo";
    btLevel.disable="false";
    reset();
}
btPlay.addEventListener('click', () => {
    if(btPlay.textContent == 'Terminar Jogo')
        stopGame();
    else{
        startGame();
        
    }
});

panelGame.addEventListener('click', function(){
    if(message.textContent === "")
        message.textContent = "Click in Start Game!";
    else
        message.textContent = "";
}) 

function showCards(cards){

cards.forEach((card)=>card.classlist.add('flipped'));
}


//btPlay.addEventListener('click',(start)=>{btPlay.textContent="Terminar Jogo",gameStarted.forEach((mostrar)=>mostrar.classList.remove("hide"))});