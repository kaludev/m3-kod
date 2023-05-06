let questions = [
    {
        question: "Ako u ponoć pada kiša, može li se očekivati da će nakon 72 sata vreme biti sunčano?",
        answers: ["Može", "Ne može"],
        correctAnswers: ["Ne može"],
        time: 30
    },
    {
        question: "Miš je udaljen od od svog skloništa 20 koraka. Mačka je udaljena od miša 5 skokova. Dok mačka jedanput skoči, miš načini 3 koraka, ali je jedan skok mačke velik kao 10 miševih koraka. Da li će mačka uhvatiti miša?",
        answers: ["Miš će umaći mački za jedan korak", "Miš će umaći mački za dva koraka", "Mačka će uhvatiti miša"],
        correctAnswers: ["Miš će umaći mački za jedan korak"],
        time: 30
    }
];

let quizTimer = document.getElementById("quiz-timer");

let currentTimer = 20;
quizTimer.textContent = currentTimer;
currentTimer--;

var x = setInterval(function() {
    quizTimer.textContent = currentTimer;
    currentTimer--;
    if (currentTimer < 0) {
        clearInterval(x);
        //iskljuciti igricu
    }
}, 1000);
 
var q = 0, i = 0, j = 0;

let answering = true;
// const shuffledData = data.sort((a, b) => 0.5 - Math.random());
let currentIndex = -1;
let time = 30;
let interval;
var score = 0;
var quizScore = document.querySelector('#quiz-score');
let quizQuestion = document.getElementById("quiz-question");
var quizAnswersContainer = document.querySelector('#quiz-answers-container')
const timer = document.querySelector('#quiz-timer');
var answers = [];
var answersCorrect = [];
var answers_Element = [];
var audio = new Audio();




const shuffleArray = (array) => {
    for (i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const loadQuestion = (i) => {
    quizQuestion.textContent = questions[i].question;

    answers = [];
    for (j = 0; j < questions[i].answers.length; j++) {
        answers[j] = questions[i].answers[j];
    }
    console.log(answers);
}

const loadAnswers = (a) => {
    answersCorrect = [];
    for (i = 0; i < questions[a].correctAnswers.length; i++) {
        for (j = 0; j < answers.length; j++) {
            if (answers[j] === questions[a].correctAnswers[i]) answersCorrect.push(j);
        }
    }
    console.log(answersCorrect);

    quizAnswersContainer.innerHTML = "";
    answers_Element = [];
    for (i = 0; i < answers.length; i++) {
            // Create the parent div
        var quizAnswerDiv = document.createElement(`div`);
        quizAnswerDiv.setAttribute(`class`, `quiz-answer`);
        
            // Create the input element
        var inputElement = document.createElement(`input`);
        inputElement.setAttribute(`type`, `radio`);
        inputElement.setAttribute(`name`, `answers`);
        inputElement.setAttribute(`id`, `answer-${i}`);
        
            // Create the label element
        var labelElement = document.createElement(`label`);
        labelElement.setAttribute(`for`, `answer-${i}`);
        labelElement.setAttribute(`id`, `answer-${i}_label`);
        labelElement.textContent = answers[i];
        
            // Append the input and label elements to the parent div
        quizAnswerDiv.appendChild(inputElement);
        quizAnswerDiv.appendChild(labelElement);
        quizAnswersContainer.appendChild(quizAnswerDiv);
        answers_Element[i] = quizAnswerDiv;
    }
    console.log(answers_Element);
}

const answerUncheck = (element) => {
    element.classList.remove("answer-checked");
    element.classList.add("answer-unchecked");
}

const answerCheck = (element) => {
    element.classList.remove("answer-unchecked");
    element.classList.add("answer-checked");
}

const answerChecksReset = () => {
    for (i = 0; i < answers_Element.length; i++) {
        if (i !== answerSelected_Index) answerUncheck(answers_Element[i]);
        else answerCheck(answers_Element[i]);
    }
}


document.addEventListener("keydown" , (event) =>{
    const key = event.key;
    answerSelected_Element = answers_Element[answerSelected_Index];

    answerUncheck(answerSelected_Element);
    let audio = new Audio();
    var correctAnswer = false;

    if (key == "ArrowUp" && answerSelected_Index > 0) {
        answerSelected_Element = answers_Element[--answerSelected_Index];
        audio.src = "./sfx/blip.mp3";
        audio.play();
    }
    else if (key == "ArrowDown" && answerSelected_Index < (answers_Element.length - 1)) {
        answerSelected_Element = answers_Element[++answerSelected_Index];
        audio.src = "./sfx/blip.mp3";
        audio.play();
    }
    else if (key == "Enter") {
        for (i = 0; i < answersCorrect.length; i++) {
            console.log(`SELECTED INDEX: ${answerSelected_Index} | ANSWER INDEX: ${answersCorrect[i]}`);
            if (answerSelected_Index === answersCorrect[i]) correctAnswer = true;
        }

        if (correctAnswer) {
            score += 10;
            quizScore.textContent = score;

            audio.src = "./sfx/answer-right.mp3";
            audio.play();
        }
        else {
            audio.src = "./sfx/answer-wrong.mp3";
            audio.play();
        }

        setTimeout(() => {
            q++;
            loadQuestion(q);
            loadAnswers(q);
            answerChecksReset();
        }, 1000);
    }

    answerCheck(answerSelected_Element);
});


shuffleArray(questions);
loadQuestion(i);
loadAnswers(i);

var answerSelected_Index = 0;
var answerSelected_Element;
answerChecksReset();