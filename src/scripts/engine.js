const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        score: document.querySelector('#score'),
        time: document.querySelector('#time')
    },
    values: {
        previousHitPosition: -1,
        hitPosition: 0,
        score: 0,
        countdown: 60
    },
    actions: {
        randomSquare: null,
        countdown: setInterval(countdown, 1000)
    }
}

function moveEnemy(){
    clearInterval(state.actions.randomSquare);
    randomSquare();
    state.actions.randomSquare = setInterval(randomSquare, 1000);
}


function countdown(){
    state.values.countdown--;
    state.view.time.textContent = state.values.countdown;

    if(state.values.countdown <= 0){
        clearInterval(state.actions.countdown);
        clearInterval(state.actions.randomSquare);
        alert("Game Over! O seu resultado foi: " + state.values.score);
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach(square => square.classList.remove('enemy'));

    let randomNumber = Math.floor(Math.random() * 9);
    while(randomNumber === state.values.previousHitPosition){
        randomNumber = Math.floor(Math.random() * 9);
    }
    state.values.previousHitPosition = randomNumber;
    let randomSquare = state.view.squares[randomNumber];
    
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if(square.id === state.values.hitPosition){
                state.values.score++;
                state.view.score.textContent = state.values.score;
                state.values.hitPosition = null;
                playSound('hit');
                moveEnemy();
            }
        });
    });
}

function init(){
    addListenerHitBox();
    moveEnemy();
}

init();