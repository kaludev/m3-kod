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
 
/*let a1 = document.getElementById("answer-1_label");
let a2 = document.getElementById("answer-2_label");
let a3 = document.getElementById("answer-3_label");
let a4 = document.getElementById("answer-4_label");

let textForQuestion = document.createTextNode("");
let textForAnswer1 = document.createTextNode("");
let textForAnswer2 = document.createTextNode("");
let textForAnswer3 = document.createTextNode("");
let textForAnswer4 = document.createTextNode("");

qu.appendChild(textForQuestion);
a1.appendChild(textForAnswer1);
a2.appendChild(textForAnswer2);
a3.appendChild(textForAnswer3);
a4.appendChild(textForAnswer4);*/
var q = 0, i = 0, j = 0;

let answering = true;
// const shuffledData = data.sort((a, b) => 0.5 - Math.random());
let currentIndex = -1;
let time = 30;
let interval;
let quizQuestion = document.getElementById("quiz-question");
let quizAnswers = document.querySelector('#quiz-answers-container')
const timer = document.querySelector('#quiz-timer');




const shuffleArray = (array) => {
    for (i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

shuffleArray(questions);

var answers = [];
for (i = 0; i < questions[q].answers.length; i++) {
    answers.push(questions[q].answers[i]);
}
console.log(answers);


const loadQuestion = (i) => {
    quizQuestion.textContent = questions[i].question;

    for (j = 0; j < questions[i].answers.length; j++) {
        answers[j].nodeValue = questions[i].answers[j]
    }
}

const answerUncheck = (element) => {
    element.classList.remove("answer-checked");
    element.classList.add("answer-unchecked");
}

const answerCheck = (element) => {
    element.classList.remove("answer-unchecked");
    element.classList.add("answer-checked");
}

let buttons = [a1, a2, a3, a4];
let selectedIndex = 0;
let selectedButton;
const startChanging = () => {
    for (i = 0; i < buttons.length; i++) {
        if (i !== selectedIndex) answerUncheck(buttons[i].parentElement);
        else answerCheck(buttons[i].parentElement);
    }
    /*selectedIndex = 1;
    selectedButton = buttons[selectedIndex];
    answerUncheck(selectedButton.parentElement);
    answerCheck(selectedButton.parentElement);*/
}
startChanging();



document.addEventListener("keydown" , (event) =>{
    const key = event.key;
    selectedButton = buttons[selectedIndex];

    answerUncheck(selectedButton.parentElement);

    if (key == "ArrowUp" && selectedIndex > 0)
        selectedButton = buttons[--selectedIndex];
    else if (key == "ArrowDown" && selectedIndex < (buttons.length - 1)) 
        selectedButton = buttons[++selectedIndex];
    else if (key == "Enter") {
        console.log(`SELECTED INDEX: ${selectedIndex} | ANSWER INDEX: `);



        setTimeout(() => {
            loadQuestion(questions[q]);
        }, 1000);
    }

    answerCheck(selectedButton.parentElement);
});

loadQuestion(1)

document.addEventListener("keydown", (event) =>{
    const keyName = event.key
    if (keyName == "Enter"){
        console.log("asd")
        startChanging()
        if (i<questions.length){
            loadQuestion(i)
            i++
        }
        // else{
            //sta se onda desi?
        // }
    }
    
    
});