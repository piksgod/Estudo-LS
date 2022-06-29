'use strict';
 
const message = document.querySelector('#message');
const panelControl = document.querySelector('#panel-control');
const panelGame = document.getElementById("panel-game");
const btLevel = document.querySelector('#btLevel');
const btPlay = document.querySelector('#btPlay');
const gameStarted = document.querySelectorAll(".gameStarted");
const cards= document.querySelectorAll(".card");
let cardsLogos =['angular','bootstrap','html','javascript','vue','svelte','react','css','backbone','ember'];



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
   
    //showCards(cards);
    //console.table(cardsLogos);
    shuffleArray(cardsLogos);
    console.table(cardsLogos);
   
    let numero= 0;
    let flag = cards.length / 2;
    for (let j of cards) {
        
        if(flag == numero){
            numero = 0;
        }
        const randomNumber = Math.floor(Math.random() * cards.length) + 1;
        let img = j.querySelector('.card-front')
        let logotipo = j.dataset.logo;
        j.style =`Order: ${randomNumber}`;
        console.log(randomNumber);
        logotipo = `${cardsLogos[numero]}`;
        console.log(logotipo);
        img.src = `images/${cardsLogos[numero]}.png`
        console.log(img);
        numero++;
        j.addEventListener('click',flipcard);
        
       
    }
     
   
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
    for (let i of cards){
        i.classList.add('flipped');
    }
}

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;  
    }
}

function flipcard(){
    this.classList.add('flipped');
}


//btPlay.addEventListener('click',(start)=>{btPlay.textContent="Terminar Jogo",gameStarted.forEach((mostrar)=>mostrar.classList.remove("hide"))});