
const start= document.getElementById('start')
const next= document.getElementById('next')
const questionContainerE =document.getElementById('question-container')
const questionE = document.getElementById('question')
const answerButtonsE = document.getElementById('answer-buttons')
var timerEl = document.getElementById('timer')
var scoreBoardEl = document.getElementById('score')
var intialsEl = document.getElementById('initials')
var Player = document.getElementById('PlayerNames')
var playerInput = document.querySelector('#Name')
let userScore = 0;
let timeLeft = 30;
var input = document.createElement("INPUT");
input.setAttribute("type","text")
input.setAttribute("value","PlayerName")
const questions = [
  {
    question:'question1',
    answers:[
      {text:'answer choice1',correct:true},
      {text:'answer choice2',correct:false},
      {text:'answer choice3',correct:false},
      {text:'answer choice4',correct:false}
    ]
  },
  {
    question:'question2',
    answers:[
      {text:'answer choice5',correct:false},
      {text:'answer choice6',correct:true},
      {text:'answer choice7',correct:false},
      {text:'answer choice8',correct:false}
    ]
  },
  {
    question:'question3',
    answers:[
      {text:'answer choice1',correct:true},
      {text:'answer choice2',correct:false},
      {text:'answer choice3',correct:false},
      {text:'answer choice4',correct:false}
    ]
  },
  {
    question:'question4',
    answers:[
      {text:'answer choice1',correct:true},
      {text:'answer choice2',correct:false},
      {text:'answer choice3',correct:false},
      {text:'answer choice4',correct:false}
    ]
  }
]

let currentquestionIndex =0 

function startQuiz(){
  countDown()
    start.classList.add('hide')
    questionContainerE.classList.remove('hide')
    nextQuestion();
  
}

function countDown(){
    var timeInterval = setInterval(function () {
     
     if ( timeLeft > 1 ){ 
      timerEl.textContent = timeLeft+ ' seconds'
      timeLeft--;
     }
      else if ( timeLeft == 1 ){
        timerEl.textContent= timeLeft +" second"
        timeLeft--;
      } 
        else{
          timerEl.textContent =""
          clearInterval(timeInterval);
          scoreBoard()
        }
    },1000);
}


function nextQuestion(){
  if (currentquestionIndex == 4 || timeLeft < 1){
    scoreBoard()
  }else{
  resetState()
  showquestion(questions[currentquestionIndex])
  currentquestionIndex++;
}}

function selectAnswer(event){
const userChoice = event.target
const correct = userChoice.classList.contains('correct')
checkAnswer(correct)
if (userChoice){
  nextQuestion()
}
}

function showquestion(question){ 
questionE.innerText= question.question
question.answers.forEach(answer => {
const button= document.createElement('button')
button.innerText= answer.text  
button.classList.add('btn')
if (answer.correct){
  button.classList.add('correct')
}
answerButtonsE.append(button)
button.addEventListener('click',selectAnswer)
});
}

function resetState(){
  next.classList.add('hide')
  while(answerButtonsE.firstChild){
    answerButtonsE.removeChild(answerButtonsE.firstChild)
  }
}
function checkAnswer(correct){ 
    if(correct){
    userScore = userScore + 5;
  }else{
    userScore--;
    timeLeft = timeLeft-5;
  }
}

function scoreBoard(){
  scoreBoardEl.classList.remove('hide')
timeLeft = 0;
questionContainerE.classList.add('hide')
next.classList.remove('hide')
scoreBoardEl.innerText = "Your score is "+ userScore + " points, please input your name     "
scoreBoardEl.append(Player)
next.addEventListener('click',recordScore)
}
function recordScore(){
  const node = document.createElement('li');
Player.appendChild(node)
node.append(playerInput.value + " scored "+ userScore+ " points!")
localStorage.setItem("PlayerName", node)
console.log(playerInput.value)
console.log(node)
next.removeEventListener('click',recordScore)
next.innerText = 'Restart'
next.addEventListener('click',Restart)
}

function Restart(){
  userScore = 0;
  timeLeft = 30;
  currentquestionIndex =0;
  next.classList.add('hide')
  scoreBoardEl.classList.add('hide')
  startQuiz()
}
start.addEventListener( "click", startQuiz)
