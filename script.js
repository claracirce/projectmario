const mario = document.querySelector('.mario'); // pegando o elemento mario do css
const pipe = document.querySelector('.pipe'); // pegando o elemento pipe do css
const somPulo = new Audio('./audio/sompulo.mp3'); //som do pulo
let isJumping = false;
const musicaMario = new Audio('./audio/marioaudio.mp3'); // sua música do Mario
musicaMario.loop = true; // para a música repetir em loop
let musicaTocando = false; // flag para tocar música só 1 vez
let loop;
let jogoIniciado = false;


const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');


mario.classList.add('pausado');
pipe.classList.add('pausado');

document.querySelector('.clouds').classList.add('pausado');
document.querySelector('.tijolo').classList.add('pausado');
document.querySelector('.moedas').classList.add('pausado');



const jump = () => {

     if (!jogoIniciado || isJumping) return; // evita pulo duplo 
    isJumping = true;

    somPulo.currentTime = 0;
    somPulo.play();

    


    mario.classList.add('jump'); // adicionando classe jump no mario para ele pular

    setTimeout(() => {

        mario.classList.remove('jump'); 
         isJumping = false;  // aqui reseta a variável para permitir novo pulo

    }, 500); // o pulo tem 500ms, precisamos remover os 500ms, dessa forma poderemos pular novamente sempre que pressionarmos alguma tecla.
}

document.addEventListener('keydown', jump); //pula ao clicar em qualquer logar do teclado



function mostrarGameOver() {
  const tela = document.getElementById("game-over");
  tela.style.display = "flex";

    restartButton.style.display = 'block'; //botão restart
} // função game over, pra mostrar a tela game over

function iniciarJogo() {
      jogoIniciado = true; // agora o jogo está ativo
    // Inicia música
    musicaMario.play();
    
    // Esconde botão iniciar
    startButton.style.display = 'none';

     // Ativa as animações
    mario.classList.remove('pausado');
    pipe.classList.remove('pausado');

    document.getElementById('game-title').style.display = 'none';

    
document.querySelector('.clouds').classList.remove('pausado');
document.querySelector('.tijolo').classList.remove('pausado');
document.querySelector('.moedas').classList.remove('pausado');


loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft; // se a posição do pipe na esquerda
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    console.log(marioPosition);

    if (pipePosition <= 50 && pipePosition > 0 && marioPosition < 70 ) { 
        // se a posição do pipe for menor ou igual a 70 e menor que 120 e o pipe tiver posição maior que 0
        pipe.style.animation = 'none'; // a animação vai parar
        pipe.style.left = `${pipePosition}px`; // comando pra manter a animação parada no local onde estava.
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`
        // se o mario bater no tubo, ele vai ficar parado na posição que bateu
        
          clearInterval(loop); // para o loop do jogo

    mostrarGameOver(); // <- chama a tela de game over
    

    }

}, 10); }



const gameBoard = document.querySelector('.game-board');

if (gameBoard) {
    let tempo = 0;

    const mudarCenario = setInterval(() => {
        tempo += 1;

        if (tempo === 15) {
            gameBoard.classList.remove('dia');
            gameBoard.classList.add('tarde');
        }

        if (tempo === 30) {
            gameBoard.classList.remove('tarde');
            gameBoard.classList.add('noite');
        }

    }, 1000);
}

// Evento botão iniciar
startButton.addEventListener('click', iniciarJogo);

// Evento botão reiniciar
restartButton.addEventListener('click', () => {
    location.reload();
});



