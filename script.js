
var questionBox = document.getElementById("questionBox") //link to text area which hold questions from html
var timeEl = document.querySelector(".time"); //link to time text in html
var buttons = document.getElementById("buttons");//link to section in html to contain generated buttons
var startBtn = document.getElementById("startBtn");//link to start button from html
var correct = 0;
var questionIndex = 0; //setting the index of my questions to start at 0 (the first object in the array)
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
    question: 'Is web development fun?',
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
function setTime() {
  var timerInterval = setInterval(function() {
  timeEl.textContent = secondsLeft + " seconds left.";
  secondsLeft--;    
  if(secondsLeft === 0) {
    clearInterval(timerInterval);
    timeEl.textContent = "Quiz has ended!";  
  }
  }, 1000);
}  
//function to begin quiz 
function beginQuiz() {
  startBtn.style.display = "none";  
  questionBox.style.display = "block";
  setTime()
  genButton();
  showQuestion();
}
//function to show questions
var lastQuestion = questions.length;
function showQuestion() {
  if(questionIndex === lastQuestion) { //this may not be necessary - see if you can fix error
  } 
  else {
  questionBox.innerHTML = questions[questionIndex].question;
  questionIndex++;
  answerIndex++;
 
  } 
}
//function to generate buttons containing answers from object within array of questions
function genButton() {
  if(questionIndex === questions.length){
    endQuiz();}
  else {
    for(i = 0; i < questions[questionIndex].answers.length; i++){
      var button = document.createElement('button');
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
  secondsLeft = 1;
  var userIni = document.createElement('input');
  var submitBtn = document.createElement('button');
  timeEl.innerHTML = "Enter Your Initials";
  userIni.value = "";
  submitBtn.innerText = 'Submit Score';
  questionBox.innerHTML = '';
  questionBox.append(userIni);
  buttons.append(submitBtn);
  userIni.setAttribute('id', "userIni");
  submitBtn.addEventListener("click", function(event) {
  if(userIni.value === "") { //keeps user from entering null for scoreboard
    alert("Don't forget to enter your initials")
  }
  else {//stores user's initials, hides submit button and reveals try again button
    event.preventDefault();
    var initials = document.getElementById('userIni').value;
    userIni.style.display = "none";
    localStorage.setItem("userIni", initials + " : " + correct +"/"+ questions.length +" correct")
    prevScore() 
    submitBtn.style.display = "none";
    restartBtn.style.display = "block";
  }
  }); 
  var restartBtn = document.createElement('button');
  restartBtn.style.display = "none";
  restartBtn.setAttribute('id','center')
  restartBtn.innerText = "Try again?";
  buttons.append(restartBtn);
  restartBtn.addEventListener("click", tryAgain);
} 
//function for "try again" button which resets variables needed and allows user to restart the quiz
function tryAgain() {
  secondsLeft = 40;
  questionIndex = 0;
  answerIndex = 0;
  correct = 0;
  buttons.innerHTML = "";
  beginQuiz();
}
//function that displays the most recent user's entry and score
function prevScore() {
  document.getElementById(scoreboard);
  var userIni = localStorage.getItem("userIni");
  scoreboard.innerHTML = userIni;
}


  