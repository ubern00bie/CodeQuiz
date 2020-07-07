
var questionBox = document.getElementById("questionBox") //links my text area to hold questions
var timeEl = document.querySelector(".time"); //from timer assignment
var buttons = document.getElementById("buttons");
var startBtn = document.getElementById("startBtn")//links my start button
var userIni

var correct = 0;
var incorrect = 0;

var questionIndex = 0; //setting the index of my questions to start at 0 (the first object in the array)
var answerIndex = 0; //setting the index of my answer to start at 0 (the first line within the array)

startBtn.addEventListener("click", beginQuiz);//event listener on the start button - should declare my function to begin quiz



  function advance () {  
    questionIndex++;
    answerIndex++;
    clearContent();
    genButton();
    buttons.style.display = "block";
    }
    function clearContent() {
      document.getElementById('buttons').innerHTML = "";
    }
    
    

//created an array with all of my questions, each of which contain an array of answers and their "correctness"

  let questions = [
    {
      question: 'What does HTML stand for?',
      answers: [
        { text: 'Hyper Text Markup Language', correct: true },
        { text: 'Hyper Technology Machine Language', correct: false },
        { text: 'Happy Techno Machine League ', correct: false },
        { text: 'Hypothetical Technology Machine Language', correct: false }
      ]
    },{
      question: 'What is the difference between a class and ID selector?',
      answers: [
        { text: 'There is no difference other than semantics', correct: false },
        { text: 'Class is being phased out', correct: false },
        { text: 'An ID selector modifies the style of a single element while a class can modify any number', correct: true },
        { text: 'You need an ID to get into a bar but you dont need class', correct: false }
      ]
    },{
      question: 'Is web development fun?',
      answers: [
        { text: 'No', correct: false },
        { text: 'Duh', correct: true },
        { text: 'Duh', correct: true },
        { text: 'Double Duh', correct: true }
      ]
    },{
      question: 'What is the difference between "==" and "==="?',
      answers: [
        { text: 'The "==" operator checks value whereas, "===" checks both value and the type.', correct: true },
        { text: 'two', correct: false },
        { text: 'The "==" operator checks numbers while "===" checks strings', correct: false },
        { text: 'There is no difference', correct: false }
      ]
    }
  ];
  // function showQuestion() { if(questionIndex !== undefined){
  //   questionBox.innerHTML = questions[questionIndex].question;
  // }
    // setTime();
    // clearInterval(timerInterval)
  // }
  
   function setTime() {
    var secondsLeft = 10;
     var timerInterval = setInterval(function() {
       
      timeEl.textContent = secondsLeft + " seconds left.";
      secondsLeft--; {   
      }
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        timeEl.textContent = "Time's up!";
        incorrect++;   
        buttons.style.display = "none";
        //end quiz, show score
       }
       
     }, 1000);
  }  
 
 
  function genButton() {

    var i=0;
    
    
      questions.forEach(answers => {
        var button = document.createElement('button');
        console.log(i);
        console.log("questlength:" + questions.length);
        console.log("qindex:" + questionIndex);
      
        if(questionIndex === questions.length) {
          console.log('see your score');
          //show score function
        } 
        else {
        questionBox.innerHTML = questions[questionIndex].question;
        button.dataset.correct = questions[questionIndex].answers[i].correct;
        button.innerText = questions[questionIndex].answers[i].text;
        button.classList.add('btn');
        button.addEventListener('click',userAnswer);
        buttons.appendChild(button); 
        i++;
        
        }
      })
    }


function userAnswer(event) {
  const selectedButton = event.target;
  if (selectedButton.dataset.correct === 'true') {
    correct++;
    console.log("correct = " + correct);
    buttons.style.display = "none";
    advance();
  }
  else{
    incorrect++;
    console.log("incorrect = " + incorrect);
    buttons.style.display = "none";
    advance();
  }
}
  function beginQuiz() {
  startBtn.style.display = "none";  
  questionBox.style.display = "block";
  genButton();

 //ends my quiz function
  }

function endQuiz() {
  //generate input field
  document.createElement(InputEvent);
  //accept user's initials
  //store and display score
}



  