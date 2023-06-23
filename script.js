
const start= document.getElementById('start')
const questionContainerE =document.getElementById('question-container')
const questionE = document.getElementById('question')
const answerButtonsE = document.getElementById('answer-buttons')
const questions = [
  {
    question:'question1',
    answers:[
      {text:'answer choice1',correct:true},
      {text:'answer choice2',correct:false},
      {text:'answer choice3',correct:false},
      {text:'answer choice4',correct:false}
    ]
  }
]

let question1 ,currentquestionIndex

function startQuiz(){
    start.classList.add('hide')
    questionContainerE.classList.remove('hide')
    currentquestionIndex=0
    nextQuestion();
}

    
function scoreBoard(){}

function countDown(){
    var timeLeft = 20;
    var timeInterval = setInterval(function () {
     
     if ( timeLeft > 1 ){ 
      timerEl.textContent = timeLeft+ 'seconds'
      timeLeft--;
     }
      else if ( timeLeft == 1 ){
        timerEl.textContent=("you have" + timeLeft +" second")
        timeLeft--;
      }
        else{
          timerEl.textContent =""
          clearInterval(timeInterval);
          displayMessage();
        }
    },1000);
}


function nextQuestion(question){
  showquestion(questions[currentquestionIndex])

}

function showquestion(question){
questionE.innerText= question.question
}

function reset(){}


start.addEventListener( "click", startQuiz)

