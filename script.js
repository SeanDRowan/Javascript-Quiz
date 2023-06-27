//getting elements from html + set up variables 
const rightTag =document.getElementById('Right')
const wrongTag =document.getElementById('Wrong')
const start= document.getElementById('start')
const next= document.getElementById('next')
const questionContainerE =document.getElementById('question-container')
const questionE = document.getElementById('question')
const answerButtonsE = document.getElementById('answer-buttons')
const instructions = document.getElementById('instructions')
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
    question:'Commonly used data types do NOT include:',
    answers:[
      {text:'strings',correct:false},
      {text:'booleans',correct:false},
      {text:'alerts',correct:true},
      {text:'numbers',correct:false}
    ]
  },
  {
    question:'The condition in an if/else statement is enclosed with ___________.',
    answers:[
      {text:'quotes',correct:false},
      {text:'curly brackets',correct:false},
      {text:'parenthesis',correct:true},
      {text:'square brackets',correct:false}
    ]
  },
  {
    question:'Arrays in Javascript can be used to store ______.',
    answers:[
      {text:'numbers and strings',correct:true},
      {text:'other arrays',correct:false},
      {text:'booleans',correct:false},
      {text:'all of the above',correct:true}
    ]
  },
  {
    question:'string values must be enclosed within ______ when being assigned to variables.',
    answers:[
      {text:'commas',correct:false},
      {text:'curly brackets',correct:false},
      {text:'quotes',correct:true},
      {text:'parenthesis',correct:false}
    ]
  },
  {
    question:'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers:[
      {text:'JavaScript',correct:false},
      {text:'terminal/bash',correct:false},
      {text:'for loops',correct:false},
      {text:'console.log',correct:true}
    ]
  }
]

let currentquestionIndex =0 
// when start is clicked, countdown begins, start button is hidden, question container is unhidden, next questions function is called  
function startQuiz(){
  countDown()
    instructions.classList.add('hide')
    start.classList.add('hide')
    questionContainerE.classList.remove('hide')
    nextQuestion();
  
}
// creates a timer that displays text in "timer" and ticks down by one each second.
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

//if the current question index reaches 5 or timeleft is less than one, calls scoreboard. Otherwise, resets question container and calls "showQuestion" using the questions array, iterates currentQuestionIndex.
function nextQuestion(){
  if (currentquestionIndex == 5 || timeLeft < 1){
    scoreBoard()
  }else{
  resetState()
  showquestion(questions[currentquestionIndex])
  currentquestionIndex++;
}}

//takes object in questions at currentquestionIndex. puts questions text in the questionE element.
function showquestion(question){ 
questionE.innerText= question.question
// for each text in answers, creates a button and adds class btn, if "correct" is true it also adds a class of correct. 
question.answers.forEach(answer => {
const button= document.createElement('button')
button.innerText= answer.text  
button.classList.add('btn')
if (answer.correct){
  button.classList.add('correct')
}
// adds newly created buttons to answerbuttonsE and an event listener for the user to click a button.
answerButtonsE.append(button)
button.addEventListener('click',selectAnswer)
});
}
// when user selects an answer choice, calls "nextQuestion" and checks if answer was correct
function selectAnswer(event){
  const userChoice = event.target
  const correct = userChoice.classList.contains('correct')
  checkAnswer(correct)
  if (userChoice){
    nextQuestion()
  }
  }
// removes all children from answerbuttonsE 
function resetState(){
  next.classList.add('hide')
  while(answerButtonsE.firstChild){
    answerButtonsE.removeChild(answerButtonsE.firstChild)
  }
}
//if the user chooses a button with the class of 'correct', adds five to the userscore + shows the 'Right!' tag. Otherwise, removes one point from userscore and 5 seconds from timer + shows the 'Wrong!' tag.
function checkAnswer(correct){ 
    if(correct){
    rightTag.classList.remove("hide")
    userScore = userScore + 5;
  }else{
    wrongTag.classList.remove("hide")
    userScore--;
    timeLeft = timeLeft-5;
  }
  // calls tagremove each second
  setInterval(tagremove,1000)
}
// shows scoreBoardEl, adds timeLeft to userscore then sets timeLeft to 0, hides question container, shows userscore and appends input field for player name.
function scoreBoard(){
  scoreBoardEl.classList.remove('hide')
  userScore = userScore + timeLeft;
timeLeft = 0;
questionContainerE.classList.add('hide')
next.classList.remove('hide')
scoreBoardEl.innerText = "Your score is "+ userScore + " points, please input your name     "
scoreBoardEl.append(Player)
// creates an event listener for the submit button to call recordScore.
next.addEventListener('click',recordScore)
}
// creates a new list item in 'Player' ul and appends playerinput.value and userscore to the list item.
function recordScore(){
  const node = document.createElement('li');
Player.appendChild(node)
node.append(playerInput.value + " scored "+ userScore+ " points!")
localStorage.setItem("PlayerName", node)
// changes text in 'next' from submit to restart and changes event listener to call Restart function.
next.removeEventListener('click',recordScore)
next.innerText = 'Restart'
next.addEventListener('click',Restart)
}
// removes Right! and Wrong! tags
function tagremove (){
rightTag.classList.add("hide")
wrongTag.classList.add("hide")
}
// resets userscore, timer, and questions, hides scoreboard, returns 'restart' button to 'submit', calls startQuiz.
function Restart(){
  userScore = 0;
  timeLeft = 30;
  currentquestionIndex =0;
  next.classList.add('hide')
  scoreBoardEl.classList.add('hide')
  next.removeEventListener('click',Restart)
  next.innerText = 'Submit'
  next.addEventListener('click',recordScore)
  startQuiz()
}
start.addEventListener( "click", startQuiz)
