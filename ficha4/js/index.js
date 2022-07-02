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
let totalPoints=0;
const TIMEOUTGAME = 20 ;
const labelPoints= document.querySelector('#points');
let timer;
let timerID;
const labelGameTime = document.getElementById('gameTime');



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
labelGameTime.removeAttribute('style');

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
createPanelGame();

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
    timer = TIMEOUTGAME;
    timerID = setInterval(updateGameTime, 1000);

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


function stopGame(){
    btPlay.textContent="Iniciar Jogo";
    btLevel.disable="false";
    modalGameOver.style.display = 'block';
    cards.forEach(card =>{
        card.classList.remove("inative");

        card.classList.remove("flipped");

        card.classList.remove("grayscale");
    })

    totalPoints=0;
    clearInterval(timerId);
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

    if(operacaoSoma){
        if(btLevel.value==1){
            totalPoints +=(timer*3);
        }else if(btLevel.value==2){
            totalPoints += (timer * 4);
        }  else if (btLevel.value==3){
            totalPoints += (timer * 5);
        }
        
    }else totalPoints<5 ?totalPoints =0 : totalPoints-=5
            console.log(totalPoints);

        labelPoints.textContent= totalPoints;



}

function gameOver(){ if(totalFlippedCards == cards.length){
                        
                        return true;

                    } else return false;

}

function updateGameTime(){

timer--;
labelGameTime.textContent = `${timer}`;

if (timer <= 10){
    labelGameTime.style.background= 'Red';
}
if (timer == 0){
    stopGame();
}

}


function createPanelGame(){

panelGame.innerHTML='';
panelGame.className='';


let div = document.createElement('div');
div.setAttribute('class', 'card');
 let imgBack = document.createElement('img');
 imgBack.setAttribute('src', 'images/ls.png');
div.appendChild(imgBack);
 panelGame.appendChild(div);
}

//btPlay.addEventListener('click',(start)=>{btPlay.textContent="Terminar Jogo",gameStarted.forEach((mostrar)=>mostrar.classList.remove("hide"))});