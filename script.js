var questionBox = document.getElementById("questionBox") //links my text area to hold questions
var startBtn = document.getElementById("startBtn")//links my start button
var timeEl = document.querySelector(".time"); //from timer assignment
var buttons = document.getElementById("buttons");


//event listener on the start button - should declare my function to begin quiz
startBtn.addEventListener("click", beginQuiz);
var secondsLeft = 11;



//created an array with all of my questions, each of which contain an array of answers and their "correctness"
const questions = [
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
        { text: '2', correct: false }
      ]
    }
  ]
 
  const lastQuestion = questions.length - 1; //this is the length of my question array minus one, for the index of my last question
  let questionIndex = 0; //setting the index of my questions to start at 0 (the first object in the array)
  let answerIndex = 0; //setting the index of my answer to start at 0 (the first line within the array)
  console.log(questions[questionIndex].question); //access question text
  console.log(questions[questionIndex].answers[answerIndex].text) //access current answer
  

function beginQuiz() {
startBtn.style.display = "none";
questionBox.style.display = "block";

setTime()
showQuestion()
genButton()
// sendMessage()

} //ends my quiz function
 

function showQuestion() {
    questionBox.innerHTML = questions[questionIndex].question

  }
function genButton() {
    console.log(questions[questionIndex].answers.length)
    for (var i = 0; i < questions[questionIndex].answers.length; i++) {
      var button = document.createElement('button')
      button.innerText = questions[questionIndex].answers[i].text
      button.classList.add('btn')
      // if (questions[questionIndex].answers[answerIndex].correct) {
      //   button.dataset.correct = questions[questionIndex].answers[answerIndex].correct
      // }
      // button.addEventListener('click', selectAnswer)
      document.body.appendChild(button) 
    }
    }

function setTime() {
    
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left.";
        showQuestion()
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        timeEl.textContent = " Time's up! ";
        // sendMessage(); mark question wrong, start function for nextQuestion
      }
  
    }, 1000);
    
  }

