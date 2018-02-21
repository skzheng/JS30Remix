
let score = 0; 
let questions = {
  2: [
    "1 + 1", 
    "(3 + 1) * (2 / 4)",
    "4 / 2 - 2 + 2",
    "( 35 + 1 ) / 2 - 17 + 1"
    ],
  3: [
    "( 2 + 2 ) - 1",
    "300 + 5 - (300 + 2)"
  ],
  305: [
    "60 *  5 + 5",
    "610 / 2 + 7 - 312"
    ],
  1738: [
    "3500 / 2 - 12",
    "1000 + 700 + 30 + 8"
    ]
}

// Display a new question
function randomQuestion(){
  let keys = Object.keys(questions);
  let question = shuffle(questions[shuffle(keys)]);
  let questionBox = document.querySelector('.questions');
  let started = document.getElementById('startButton');
  if(started) timer();
  questionBox.innerHTML = (question);
  resetBar();
}

// Randomly pick a question from questions array
function shuffle(arr){
  for(let i = 0 ; i < arr.length ; i++){
    let temp = arr[i];
    let random = Math.floor(Math.random() * arr.length);
    arr[i] = arr[random];
    arr[random] = temp;
  }
  return arr[0];
}

// Checks user input against answer
function evalAnswer(keyValue){
  let equation = document.querySelector('.questions').innerHTML;
  if(equation.indexOf('button') === -1){
    let ans = (eval((equation)));
    console.log(typeof keyValue, typeof ans, ans === keyValue)
    return ans === keyValue
  }
}

// Increment score 
function calcScore(bool){
  let scoreCounter = document.querySelector('.score');
  score = bool ? score + 10 : score - 10;
  scoreCounter.innerHTML = score; 
}

// Misc. sound effects
function clip(sound){
  let clip = document.getElementById(`${sound}`);
  clip.play();
}

// Pause game and freeze screen
function pause(){
  let app = document.querySelector('.app');
  let pauseButton = document.getElementById("pauseButton");
  let status = pauseButton.getAttribute("data-pause") === "true";
  pauseButton.setAttribute("data-pause", !status); 
  for (var i = 1; i < 99999; i++) {
    window.clearInterval(i);
  }

  let questionBox = document.querySelector('.questions');
  if(!status) {
    app.style.filter = 'opacity(0.5)';
    pauseButton.children[0].style.filter = 'opacity(1.0)';
    pauseButton.children[0].src = "./images/playButton.png"
    questionBox.innerHTML = "PAUSED";
  } else {
    app.style.filter = 'opacity(1)';
    pauseButton.children[0].src = "./images/pauseButton.png"
    timer();
    randomQuestion();
  }
  resetBar();
}

// Timer 
function timer(){
  let bar  = document.querySelector('#progress-bar');
  let increment = setInterval(decrease, 60);
  resetBar();
  function decrease(){
  let width = parseInt(bar.style.width);
    if(width <= 0){
      // clearInterval(increment);
      calcScore(false);
      randomQuestion();
    } 
    width--;
    bar.style.width = width + '%';
  }
}

// Progress bar reset
function resetBar(){
  let bar  = document.querySelector('#progress-bar');
  bar.style.width = '100%';
}

// Learn more modal
function learnMore(){
  let body = document.querySelector('body');
  let app = document.querySelector('.app');
  let exit = document.getElementById('modalExit')
  let what = document.getElementById('what');
  what.play();
  let pauseButton = document.getElementById("pauseButton");
  pauseButton.setAttribute("data-pause", "false"); 
  pause();
  
  let modal = document.getElementById('modal');
  modal.style.visibility = 'visible';

  let learnMore = document.querySelector('.learnMore');
  window.addEventListener('click', closeModal, true);
  function closeModal(e){
    if(e.target !== modal && e.target !== learnMore){
      exit.click();
    }
    window.removeEventListener('click', closeModal, true);
  }
}

// Exit from modal behavior
function modalExit(){
  let app = document.querySelector('.app');
  let modal = document.getElementById('modal');

  app.style.filter = "opacity(1.0)";
  modal.style.visibility = "hidden";
}

// Stop arrow keys from moving the screen
document.body.onkeydown = function killKeys(e){
  if(e.keyCode >= 37 && e.keyCode <= 40){
    e.preventDefault();
  }
}

// Stop animations once sound is done playing
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

// Play respective audio track on button press
const playSound = (e, sound) => {
  let clip = sound ? sound : e.keyCode;
  const audio = document.querySelector(`audio[data-key="${clip}"]`)
  const key = document.querySelector(`img[data-key="${clip}"]`);
  let keyValue;
  if(clip >= 37 && clip <= 40){
    keyValue = Number(key.previousElementSibling.innerHTML);
  }
  if(!audio) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  if (evalAnswer(keyValue)) calcScore(true)
  else calcScore(false);
  randomQuestion();
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.picture'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
