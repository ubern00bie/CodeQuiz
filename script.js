
var questionBox = document.getElementById("questionBox") //link to text area which hold questions from html
var timeEl = document.querySelector(".time"); //link to time text in html
var buttons = document.getElementById("buttons");//link to section in html to contain generated buttons
var startBtn = document.getElementById("startBtn");//link to start button from html
var correct = 0;
var restartBtn = document.createElement('button');
// var questionIndex = 0; //setting the index of my questions to start at 0 (the first object in the array)
var answerIndex = 0; //setting the index of my answer to start at 0 (the first line within the array)
startBtn.addEventListener("click", beginQuiz);
//function used to advance to next question
function advance () {  
  clearContent();
  genButton();
  buttons.style.display = "block";
  showQuestion();
}
//function to clear generated buttons
function clearContent() {
  document.getElementById('buttons').innerHTML = "";
}  
//here is an array with all of the questions, each of which contain an array of answers and their "correctness"
let questions = [
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'Hyper Technology Machine Language', correct: false },
      { text: 'Happy Techno Machine League ', correct: false },
      { text: 'Hypothetical Technology Machine Language', correct: false }
    ]
  },
  {
    question: 'What is the difference between a class and ID selector?',
    answers: [
      { text: 'There is no difference other than semantics', correct: false },
      { text: 'Class is being phased out', correct: false },
      { text: 'An ID selector modifies the style of a single element while a class can modify any number', correct: true },
      { text: 'You need an ID to get into a bar but you dont need class', correct: false }
    ]
  },
  {
    question: 'Is JavaScript fun?',
    answers: [
      { text: 'No', correct: false },
      { text: 'Duh', correct: true },
      { text: 'Duh', correct: true },
      { text: 'Double Duh', correct: true }
    ]
  },
  {
    question: 'What is the difference between "==" and "==="?',
    answers: [
      { text: 'The "==" operator checks value whereas, "===" checks both value and the type.', correct: true },
      { text: 'two', correct: false },
      { text: 'The "==" operator checks numbers while "===" checks strings', correct: false },
      { text: 'There is no difference', correct: false }
    ]
  }
];
//function to control timer  
var secondsLeft = 40;
var timeInterval
function setTime() {
  timerInterval = setInterval(function() {
  timeEl.textContent = secondsLeft + " seconds left.";
  secondsLeft--;    
  if((secondsLeft === 0 || secondsLeft < 0) && questionIndex > 0) {
    clearInterval(timerInterval);
    timeEl.textContent = "Quiz has ended!"; 
    endQuiz(); 
    buttons.innerHTML = "";
  }
  }, 1000);
}  
//function to begin quiz 
function beginQuiz() {
  questionIndex = 0;
  startBtn.style.display = "none";  
  questionBox.style.display = "block";
  setTime();
  genButton();
  showQuestion();
}
//function to show questions
var lastQuestion = questions.length;
function showQuestion() {
  if(questionIndex === lastQuestion) { clearInterval(timerInterval);
  } 
  else {
  questionBox.innerHTML = questions[questionIndex].question;
  questionIndex++;
  answerIndex++;
 
  } 
}
//function to generate buttons containing answers from object within array of questions
function genButton() {
  if((questionIndex === questions.length)){
    endQuiz()
}
  else {
    for(i = 0; i < questions[questionIndex].answers.length; i++){
      var button = document.createElement('button');
      button.style.border = "solid black";
      button.dataset.correct = questions[questionIndex].answers[i].correct;
      button.innerText = questions[questionIndex].answers[i].text;
      button.classList.add('btn');
      button.addEventListener('click',userAnswer);
      buttons.appendChild(button); 
    }
  }
}
//function to track user's score based on answers chosen and reduce time for incorrect answers
function userAnswer(event) {
  const selectedButton = event.target;
  if (selectedButton.dataset.correct === 'true') {
  correct++;
  buttons.style.display = "none";
  advance();
  }
  else{
  secondsLeft = secondsLeft - 5;
  buttons.style.display = "none";
  advance();
  }
}
//function to end quiz and allow user to submit score
function endQuiz() {
  var userIni = document.createElement('input');
  var submitBtn = document.createElement('button');
  timeEl.innerHTML = "Enter Your Initials";
  userIni.value = "";
  submitBtn.innerText = 'Submit Score';
  questionBox.innerHTML = '';
  questionBox.append(userIni);
  var nav = document.getElementById('nav');
  nav.append(submitBtn);
  userIni.setAttribute('id', "userIni");
  submitBtn.addEventListener("click", function(event) {
  if(userIni.value === "") { //keeps user from entering null for scoreboard
    alert("Don't forget to enter your initials")
  }
  else {//stores user's initials, hides submit button and reveals try again button
    event.preventDefault();
    initials = document.getElementById('userIni').value;
    userIni.style.display = "none";
    prevScore(); 
    submitBtn.style.display = "none";
    restartBtn.style.display = "block";
    buttons.innerHTML = "";
    nav.innHTML = "";
    buttons.style.display = "block";
  }
  }); 
  restartBtn.style.display = "none";
  restartBtn.setAttribute('id','center')
  restartBtn.innerText = "Try again?";
  nav.append(restartBtn);
  restartBtn.addEventListener("click", tryAgain);
} 
//function for "try again" button which resets variables needed and allows user to restart the quiz
function tryAgain() {
  restartBtn.style.display = "none";
  secondsLeft = 40;
  // questionIndex = 0;
  answerIndex = 0;
  correct = 0;
  buttons.innerHTML = "";
  beginQuiz();
}
var quizScore
var initials
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
//function that displays 5 highest scores.
function prevScore() {
  document.getElementById(scoreboard);
  var userScore = {
    initials: initials,
    quizScore: correct
  };
  highscores.push(userScore);
  highscores.sort((a,b) => b.quizScore-a.quizScore);
  highscores.splice(5);
  localStorage.setItem('highscores',JSON.stringify(highscores));
  scoreboard.innerHTML = "";
  highscores.forEach(userScore => {
  scoreboard.innerHTML += userScore.initials + ": " + userScore.quizScore +"/" + questions.length +"<br>";
  });
}


  