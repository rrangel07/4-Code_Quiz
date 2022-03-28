// Calling all the elements we'll need from the DOM
var headerEl= document.querySelector('#header');
var state0El= document.querySelector('#state-0');
var state1El= document.querySelector('#state-1');
var state2El= document.querySelector('#state-2');
var state3El= document.querySelector('#state-3');
var highScoreEl= document.querySelector('#vw-high');
var timerEl= document.querySelector('.timer');
var quesEl= document.querySelector('#question');
var optionsEl= document.querySelector('#answers');
var scoreInitialsEl= document.querySelector('#initials');
var scoreEl= document.querySelector('.score');
var startEl= document.querySelector('#button-start');
var submitEl= document.querySelector('#button-submit');
var goBackEl= document.querySelector('#button-goback');
var clearEl= document.querySelector('#button-clear');
var nextEl= document.querySelector('#button-next');
var currentIndex =0;
var secondsLeft=60;
var possibleQuestions= [{
    question: "Carrie Bradshaw's obsession was ______",
    answer: ['Shoes','Purses','Earings', 'Dresses'],
    correctAnswer: 0,
    },
    {
    question: "Miranda was a ______",
    answer: ['Pediatrician','Engineer','Corporate Lawyer', 'Designer'],
    correctAnswer: 2,
    },
    {
    question: "Who was Charlotte's first husband?",
    answer: ['Mr. Big','Aidan','Jack Berger', 'Trey MacDougal'],
    correctAnswer: 3,
    },
    {
    question: "Samantha Jones dated a woman named, ______",
    answer: ['Petra','Maria','Eugenia', 'Rose'],
    correctAnswer: 1,
    },
    {
    question: "Magda replaced Miranda's vibrator with ______",
    answer: ['A statue of the Virgin Mary','The Bible','Holy Water', 'A Crucifix'],
    correctAnswer: 0,
    },
    {
    question: "Which was Carrie Bradshaw's favorite shoe brand?",
    answer: ['Jimmy Choo','Chanel','Nike', 'Manolo Blahnik'],
    correctAnswer: 3,
    },
    {
    question: "Which store did Carrie fall in in Paris?",
    answer: ['Chanel','Dior','CH', 'Oscar de la Renta'],
    correctAnswer: 1,
    },
    {
    question: "Who dumped Carrie via a Post-it?",
    answer: ['Aiden','Big','Steve', 'Jack Berger'],
    correctAnswer: 3,
    },
    {
    question: "What year did 'Sex and the city' premiere?",
    answer: ['1992','1996','1998', '1997'],
    correctAnswer: 2,
    },
    {
    question: "When did I hate Carrie the most?",
    answer: ['When she cheated on Aiden with Big','When she dumped Aiden for the 2nd time','All of the above', 'When she didn\'t call 911 during big\'s heart attack'],
    correctAnswer: 2,
    }
];

startEl.addEventListener('click', startQuiz);
function startQuiz (){
    console.log("Quiz Started");
    switchState(state0El,state1El);
    setTimer();
    renderQuestions();
}
// Show the questions
function renderQuestions(){
    quesEl.textContent= possibleQuestions[currentIndex].question;
    for (let j=0;j<possibleQuestions[currentIndex].answer.length;j++){
        optionsEl.children[j].textContent = possibleQuestions[currentIndex].answer[j];
    }
    optionsEl.addEventListener('click',selectedAnswer,{once: true});
    
}

function selectedAnswer (evt){
    var parent= evt.target.parentNode;
    var child= evt.target;
    var indexSelectedAnswer= Array.prototype.indexOf.call(parent.children,child);
    console.log(indexSelectedAnswer);
    isCorrect(indexSelectedAnswer);
    nextEl.addEventListener('click',nextQuestion);
    
}

function isCorrect(idx){
    if(idx == possibleQuestions[currentIndex].correctAnswer){
        optionsEl.children[idx].setAttribute('class','correct');
    } else{
        optionsEl.children[possibleQuestions[currentIndex].correctAnswer].setAttribute('class','correct')
        optionsEl.children[idx].setAttribute('class','incorrect');
        secondsLeft -=5;
    }
}

function clearAnswers (){
    for (let i=0;i<possibleQuestions[currentIndex].answer.length;i++){
        optionsEl.children[i].removeAttribute('class','correct','class','incorrect');
    }
}


function switchState (stateX,stateY){
    stateX.setAttribute('class','hide');
    stateY.removeAttribute('class', 'hide');
}

function nextQuestion (){
    if (currentIndex == possibleQuestions.length-1){
        currentIndex=0;
        switchState(state1El,state2El)
    } else{
        currentIndex++;
        clearAnswers();
        renderQuestions();
    }
}


function setTimer() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;        
        if(secondsLeft <= 0 || state1El.getAttribute('class') == 'hide') {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            switchState (state1El,state2El);
        }  
    }, 1000);
  }