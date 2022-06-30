'use strict';
 
const message = document.querySelector('#message');
const panelControl = document.querySelector('#panel-control');
const panelGame = document.getElementById("panel-game");
const btLevel = document.querySelector('#btLevel');
const btPlay = document.querySelector('#btPlay');
const gameStarted = document.querySelectorAll(".gameStarted");
const cards= document.querySelectorAll(".card");
let cardsLogos =['angular','bootstrap','html','javascript','vue','svelte','react','css','backbone','ember'];
let flippedCards;
let totalFlippedCards;
let totalPoints;

cards.forEach(card =>{
    card.addEventListener('mouseover' ,()=>{
        card.classList.add("cardHover")
    })
    card.addEventListener('mouseout',()=>{  
        card.classList.remove("cardHover")
    })
})

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

function startGame() {
    btLevel.disabled = true;
    btPlay.textContent = 'Terminar Jogo';
    gameStarted.forEach((mostrar)=>mostrar.classList.remove('hide'));
    message.classList.add("hide");
    flippedCards = [];
    totalFlippedCards = 0;
    totalPoints = 0;
    shuffleArray(cardsLogos);
    let [indice, newCardLogos] = [0, cardsLogos.slice(0, cards.length / 2)];
    newCardLogos = [...newCardLogos, ...newCardLogos];


    cards.forEach(card => {
        const randomNumber = Math.floor(Math.random() * newCardLogos.length) + 1;
        card.style.order = randomNumber;
        card.querySelector('.card-front').src = `images/${newCardLogos[indice]}.png`;
        card.dataset.logo = newCardLogos[indice++];
        card.addEventListener('click', function () {
            flipCard(this);
        }, {once: true});
    });
    
}
/*
function startGame(){
    

    flippedCards=[];
    btPlay.textContent="Terminar Jogo";
    btLevel.disable=true;
    gameStarted.forEach((mostrar)=>mostrar.classList.remove('hide'));
    message.classList.add("hide");
    cards.forEach((card) =>{
        const randomNumber = Math.floor(Math.random() * cards.length) + 1;
        card.style.order = `${randomNumber}`;
      
    })
   
    //showCards(cards);
    //console.table(cardsLogos);f
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
        j.addEventListener('click',flipCard);
        
       
    }
     
   
}*/

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

function flipCard(c) {
    c.classList.add('flipped');
    flippedCards.push(c);
    if (flippedCards.length == 2){
        checkPair();
    }
}
function checkPair() {
    const [card1,card2] = flippedCards;
    if (card1.dataset.logo == card2.dataset.logo){
        console.log('As cartas são iguais');
        card1.classList.add('inative');
        card2.classList.add('inative');
        card1.querySelector('.card-front').classList.add('grayscale');
        card2.querySelector('.card-front').classList.add('grayscale');
        totalFlippedCards += 2;
        updatePoints();
        if (gameOver()) stopGame();
    }
    else{
        console.log('Cartas são diferentes');
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 500);
        };
        card1.addEventListener('click', function () {
            flipCard(this);
        }, {once: true});
        card2.addEventListener('click', function () {
            flipCard(this);
        }, {once: true});
        updatePoints(false);

    flippedCards= [];
}

function updatePoints(operacaoSoma = true) {

    // if (operacaoSoma) totalPoints += (timer * (cards.length / 2));

    if (operacaoSoma) totalPoints += (cards.length - totalFlippedCards + 2) * 2;

    else totalPoints < 2 ? totalPoints = 0 : totalPoints -= 2;

    points.textContent = totalPoints;

}

function gameOver(){return totalFlippedCards == cards.length;}

//btPlay.addEventListener('click',(start)=>{btPlay.textContent="Terminar Jogo",gameStarted.forEach((mostrar)=>mostrar.classList.remove("hide"))});