const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
var timer;
const colors = ['red', 'purple', 'pink', 'brown', 'green', 'aqua', 'teal', 'blue','lime', 'yellow', 'olive' ];
let time = 0,
    timeSelect = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
    
})

timeList.addEventListener('click', event => {
    
    /*
    var timeBtn = document.querySelectorAll('.time-btn');
   
    timeBtn.forEach(function(item) {
        item.classList.remove(`run`);
    });
    */

    //event.target.classList.remove(`run`);

    if (event.target.classList.contains('time-btn')) {
        timeSelect = parseInt(event.target.getAttribute('data-time'));
       //event.target.classList.add('run');
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }  
})

function startGame() {
    board.innerHTML = '';
    //setInterval(decreaseTime, 1000);
    time = timeSelect ;
    timer = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
        clearInterval(timer);
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
        
    }
}
function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}
function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1><div><button id="restart">Начать заново</button><button id="timing">Выбрать время</button></div>`;
    restartGame();
    timingGame();
}


function restartGame() {
    const restart = document.querySelector(`#restart`);
    // удаляем класс hide
    score = 0;
    timeEl.parentNode.classList.remove("hide");
    restart.addEventListener(`click`, function() {

    startGame();

   });
}

function timingGame() {
    const timing = document.querySelector(`#timing`);
    // удаляем класс hide
    score = 0;
    timeEl.parentNode.classList.remove("hide");
    timing.addEventListener(`click`, function() {
             
        screens[1].classList.remove(`up`);
        /*
        screens.forEach(function(item) {
            item.classList.remove(`up`);
        });
        */
    });
}

function createRandomCircle() {
   const circle = document.createElement('div');
   const size = getRandomNumber(20, 60);
   const {width, height} = board.getBoundingClientRect();
   const x = getRandomNumber(0, width - size);
   const y = getRandomNumber(0, height - size);
   const color = getRandomColor()
    circle.style.Color= color;
    circle.style.background= color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle); 
}

function getRandomNumber (min, max) {
  return Math.round(Math.random() * (max-min) + min)  
}

function removeColor(circle) {
    circle.style.Color='#1d1d1d';
    circle.style.boxShadow = `0 0 2px #000`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}