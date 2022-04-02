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
var scoreEl= document.querySelector('#score');
var startEl= document.querySelector('#button-start');
var submitEl= document.querySelector('#button-submit');
var goBackEl= document.querySelector('#button-goback');
var clearEl= document.querySelector('#button-clear');
var resultEl= document.querySelector('#result');
var tableEl= document.querySelector('#high-scores');
var tbodyEl= document.querySelector('#tbody-score');

var currentIndex= 0;
var secondsLeft=60;
var timerInterval;
var savedScores= [];
var game;
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
// Activates the function "init"
init();
// Initializing the game (starting the event listeners and rendering the saved scores)
function init(){
    currentIndex=0;
    secondsLeft=60;
    setEventListeners();
    renderHistoricScores();
}
// Setting all the event listeners for the different buttons (start, submit, go back, clear) and for the view high score and selecting the answers.
function setEventListeners(){
    startEl.addEventListener('click', start);
    optionsEl.addEventListener('click',selectedAnswer);
    submitEl.addEventListener('click',submit);
    goBackEl.addEventListener('click',goback);
    highScoreEl.addEventListener('click',function (evt){
        var target=evt.currentTarget.getAttribute('id');
        console.log(target);
        if (target === 'vw-high' && state0El.getAttribute('class') !== 'hide'){
            switchState(state0El,state3El);
            switchState(headerEl,state3El);
        }
    })
    clearEl.addEventListener('click',clearHighScores);
}

function start(){
    game= new session ("",0);
    console.log(currentIndex);
    switchState(state0El,state1El);
    switchState(highScoreEl,state1El)
    setTimer();
    renderQuestions();
}
// Displays the questions and their options
function renderQuestions(){
    console.log('render question' + currentIndex);
    quesEl.textContent= possibleQuestions[currentIndex].question;
    for (let j=0;j<possibleQuestions[currentIndex].answer.length;j++){
        optionsEl.children[j].textContent = possibleQuestions[currentIndex].answer[j];
        if (j==possibleQuestions[currentIndex].correctAnswer){
            optionsEl.children[j].setAttribute('data-attribute','correct');
        } else{
            optionsEl.children[j].setAttribute('data-attribute','incorrect');
        }
    }
}
// Identifies the answer and if it is correct based on data attributes. If is incorrect substracts 5 seconds to the counter and calls the next question
function selectedAnswer(evt){
    var answer= evt.target;
    console.log(answer);
    var dataState= answer.getAttribute('data-attribute');
    console.log(dataState);
    console.log(answer);
    if(dataState ==='correct'){
        resultEl.textContent= 'Correct'
        resultEl.removeAttribute('class','hide');
    }else{
        secondsLeft -=5;
        resultEl.textContent= 'Incorrect'
        resultEl.removeAttribute('class','hide');
    }
    nextQuestion();
}
// Checks if we already displayed all the questions, if that's the case calls another function that clear the interval and switch to the next state. If not, calls another function to reveal the next question
function nextQuestion(){
    if(currentIndex === possibleQuestions.length-1){
        console.log(currentIndex+'='+(possibleQuestions.length-1));
        finalScore();
    }
    else{
        console.log(currentIndex+'!='+(possibleQuestions.length-1));
        currentIndex++;
        renderQuestions();
    }
}
// We use this function to add/remove the class hide. That's how we switch from one state to the other.
function switchState (stateX,stateY){
    stateX.setAttribute('class','hide');
    stateY.removeAttribute('class', 'hide');
}
// Starts the timer
function setTimer() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;        
        game.score=secondsLeft;
        if(secondsLeft <= 0){
            finalScore();
        }
    }, 1000);
}
// Clears the interval, switch to the final score screen and shows the final score.
function finalScore(){
    clearInterval(timerInterval);
    switchState (state1El,state2El);
    scoreEl.textContent= game.score;
}
// when you hit submit this function gets triggered and what it does is that switch from the high score state to the list of high scores, populate the table with the data and stores in local memory the game information (initials and score)
function submit(evt){
    evt.preventDefault();
    var row= document.createElement('tr');
    game.initials=scoreInitialsEl.value;
    switchState(state2El,state3El);
    switchState(headerEl,state3El);
    row.innerHTML=
    "<td>"+game.initials+"</td><td>"+game.score+"</td>";
    tbodyEl.appendChild(row);
    savedScores.push(game);
    // console.log(savedScores);
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
    currentIndex=0;
    secondsLeft=60;
}
// Go back to the welcome screen
function goback(){
    switchState(state3El,state0El);
    switchState(state3El,headerEl);
    switchState(state3El,highScoreEl);
    resultEl.setAttribute('class','hide');
    timerEl.textContent=secondsLeft;
    scoreInitialsEl.value='';
}
// Populate the table with recorded previous games.
function renderHistoricScores(){
    savedScores= JSON.parse(localStorage.getItem("savedScores"));
    console.log(savedScores);
    if(savedScores !== null){
        console.log(savedScores.length);
        var row;
        for (let i=0; i<savedScores.length;i++){
            row= document.createElement('tr');
            row.innerHTML=
            "<td>"+savedScores[i].initials+"</td><td>"+savedScores[i].score+"</td>";
            tbodyEl.append(row);
        }
    }else{
        savedScores= [];
    }
}
// Clears the memory and the table from stored/previous games.
function clearHighScores(){
    localStorage.clear();
    savedScores=[];
    var children= tbodyEl.children;
    console.log(children);
    console.log(children.length);
    if(children.length>0){
        tbodyEl.innerHTML="";
    }
}
// Creates a new object with the properties specified below
function session(initials, score) {
    this.initials = initials;
    this.score = score;
}