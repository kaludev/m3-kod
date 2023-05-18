import data from "./superdictionary1.json" assert {type: 'json'};
var quiyHighestScore = document.querySelector("#quiz-highest-score"); 
var quizTimer = document.querySelector("#quiz-timer");
var quizHighScore = document.querySelector("#quiz-high-score");
var quizScore = document.querySelector("#quiz-score");
var quizQuestion = document.querySelector("#quiz-question");
var quizAnswersContainer = document.querySelector("#quiz-answers-container");
 
var q = 0, i = 0, j = 0;
var number_questions = 7;

var score = 0;
var highScore = 0;
var answers = [];
var answerCorrect;
var counter_answerCorrect = 0;
// var answersCorrect = [];
var answers_Element = [];

var timer;
quizTimer.textContent = timer;
timer--;

var audio = new Audio();

var quizBackgroundMusic = new Audio("./sfx/quiz-background-music.mp3");
quizBackgroundMusic.loop = true;

var quizTimerTicking = new Audio("./sfx/quiz-background-music.mp3");
var timerInterval = setInterval(() => {
    quizTimer.textContent = timer;
    timer--;
    quizTimerTicking.play();

    if (timer < 0) {
        quizBackgroundMusic.pause();
        audio.src = "./sfx/answer-wrong.mp3";
        audio.play();
        endQuiz();
    }
}, 1000);

var answerSelection = true;
const text = document.querySelector("#quiz-question");
let textContent = text.innerHTML; //console.log(textContent);
let words;

const endQuiz = () => {
    clearInterval(timerInterval);

    location.href = "/end.html";
}

const shuffleArray = (array) => {
    for (i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const loadQuestion = (i) => {
    timer = questions[i].timer;
    textContent = questions[i].question;
    words = textContent.split(' ');
    quizQuestion.textContent = questions[i].question;
}

const loadAnswers = (a) => {
    answers = [];
    for (i = 0; i < questions[a].answers.length; i++) {
        answers[i] = questions[a].answers[i];
    }

    for (i = 0; i < questions[a].answers.length; i++) {
        if (i === questions[a].correctAnswer) answerCorrect = i;
    }
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
}

const answerCheck = (element) => {
    element.classList.remove("answer-unchecked");
    element.classList.add("answer-checked");
}

const answerCheckCorrect = (element) => {
    element.classList.remove("answer-checked");
    element.classList.add("answer-checked-correct");
}

const answerCheckWrong = (element) => {
    element.classList.remove("answer-checked");
    element.classList.add("answer-checked-wrong");
}

const answerUncheck = (element) => {
    element.classList.remove("answer-checked");
    element.classList.add("answer-unchecked");
}

const answerChecksReset = () => {
    answerSelected_Index = 0;
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

    if (answerSelection === true) {
        if (key == "ArrowUp") {
            if (answerSelected_Index > 0) answerSelected_Element = answers_Element[--answerSelected_Index];
            else {
                answerSelected_Index = answers_Element.length - 1;
                answerSelected_Element = answers_Element[answerSelected_Index];
            }
            audio.src = "./sfx/blip.mp3";
            audio.play();
        }
        else if (key == "ArrowDown") {
            if (answerSelected_Index < (answers_Element.length - 1)) answerSelected_Element = answers_Element[++answerSelected_Index];
            else {
                answerSelected_Index = 0;
                answerSelected_Element = answers_Element[answerSelected_Index];
            }
            audio.src = "./sfx/blip.mp3";
            audio.play();
        }
        else if (key == "f") {
            answerSelection = false;
            /*for (i = 0; i < answersCorrect.length; i++) {
                console.log(`SELECTED INDEX: ${answerSelected_Index} | ANSWER INDEX: ${answersCorrect[i]}`);
                if (answerSelected_Index === answersCorrect[i]) correctAnswer = true;
            }*/

            console.log(`SELECTED INDEX: ${answerSelected_Index} | ANSWER INDEX: ${answerCorrect}`);
            if (answerSelected_Index === answerCorrect) correctAnswer = true;

            answerSelected_Element.children[1].style.color = "hsla(0, 0%, 100%, 1)";
            if (correctAnswer) {
                answerCheckCorrect(answerSelected_Element);
                counter_answerCorrect++;
                score += Math.floor(questions[i].timer / (questions[i].timer - timer) * 10);
                audio.src = "./sfx/answer-right.mp3";
            }
            else {
                answerCheckWrong(answerSelected_Element);
                audio.src = "./sfx/answer-wrong.mp3";
            }
            audio.play();

            quizScore.textContent = score.toString().padStart(3, '0');

            setCookie("score", score.toString(), 1);

            if (score > highScore) highScore = score;
            quizHighScore.textContent = highScore.toString().padStart(3, '0');

            setTimeout(() => {
                if (q < (number_questions - 1)) {
                    q++;

                    loadQuestion(q);
                    loadAnswers(q);
                    answerChecksReset();
                    answerSelected_Element.children[1].style.color = "hsla(180, 100%, 50%, 1)";
                    answerSelection = true;
                }
                else {
                    quizBackgroundMusic.pause();
                    audio.src = "./sfx/quiz-complete.mp3";
                    audio.play();
                    endQuiz();
                }
            }, 1000);
        }
    }

    answerCheck(answerSelected_Element);
});


shuffleArray(questions);
loadQuestion(i);
loadAnswers(i);

var answerSelected_Index = 0;
var answerSelected_Element;
answerChecksReset();

 

var ind = 0;
var f = 5;
var T = 1000;
// SHUFFLE LETTERS
const shuffleLetters = (letters) => {
    var first = letters[0];
    var last = letters[letters.length - 1];
    var middle = [];
    for (var i = 1; i < letters.length - 1; i++) {
        middle[i - 1] = letters[i];
    }
    // console.log(middle);

    // console.log(`${first} + ${middle} + ${last}`);
    
    var currentIndex = middle.length - 1;
    var randomIndex;
    var temporaryIndex;
  
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        // console.log(`shuffleLetters(): randomIndex = ${randomIndex} | currentIndex = ${currentIndex}`);
        currentIndex--;
    
        temporaryIndex = middle[currentIndex];
        middle[currentIndex] = middle[randomIndex];
        middle[randomIndex] = temporaryIndex;
    }
  
    return `${first}${middle.join('')}${last}`;
}


const applyEffects = () => {
    const editedWords = words.slice();
    const n = words.length;

    for (let i = 1; i < n-1; i++) {
        try{
            if(data[words[i]] < 150){
                const letters = words[i].split('');
                editedWords[i] = shuffleLetters(letters);
            }
        }catch(e){
            const letters = words[i].split('');
            editedWords[i] = shuffleLetters(letters);
        }
        
    }
    text.innerHTML = editedWords.join(" ");
}


    // FILTERING WORDS
// words = words.filter(c => c.trim() !== '');
// words = words.map(c => c.replace(/[,.\n]/g, ''));


    // APPLYING EFFECTS
setInterval(applyEffects, T);



    // COOKIES

setCookie("score", score.toString(),1);
setCookie("uploaded", "");



/*document.addEventListener("keydown", (event) =>{
    const keyName = event.key
    if (keyName == "f") {
        if(questions[i]["answerCorrect"] === answs[chosenIndex].nodeValue){
            score++;
            setCookie("score", score.toString(), 1);
        }

        i++
        startChanging()
        if (i<questions.length) {
            loadQuestion(i)
        }
        else {
            location.href = "/end.html"
        }
    }
})*/

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}