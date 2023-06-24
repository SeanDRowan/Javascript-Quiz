
const start= document.getElementById('start')
const next= document.getElementById('next')
const questionContainerE =document.getElementById('question-container')
const questionE = document.getElementById('question')
const answerButtonsE = document.getElementById('answer-buttons')
var timerEl = document.getElementById('timer')
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
      {text:'answer choice5',correct:true},
      {text:'answer choice6',correct:false},
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

    
function scoreBoard(){}

function countDown(){
    var timeLeft = 30;
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
          displayMessage();
        }
    },1000);
}


function nextQuestion(){
  resetState()
  showquestion(questions[currentquestionIndex])
  currentquestionIndex++;
}

function selectAnswer(event){
const userChoice = event.target
const correct = userChoice.dataset.correct
if (userChoice){
  next.classList.remove('hide')
  checkAnswer(userChoice)
}

}

function showquestion(question){
questionE.innerText= question.question
question.answers.forEach(answer => {
const button= document.createElement('button')
button.innerText= answer.text  
button.classList.add('btn')
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
function checkAnswer(){ 
    if(correct){
    alert('correct')
  }

  
}

start.addEventListener( "click", startQuiz)
next.addEventListener('click',nextQuestion)

