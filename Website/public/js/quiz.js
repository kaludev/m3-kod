const questions = [
    {
        "question": "Ako u ponoć pada kiša, može li se očekivati da će nakon 72 sata vreme biti sunčano ?",
        "answers": ["Može", "Ne može"],
        "answerCorrect": "Ne može"
    },
    {
        "question": "Miš je udaljen od svog skloništa 20 koraka. Mačka je udaljena od miša 5 skokova. Dok mačka jedanput skoči, miš načini 3 koraka, ali je jedan skok mačke velik kao 10 miševih koraka. Da li će mačka uhvatiti miša?",
        "answers": ["Miš će umaći mački za jedan korak", "Miš će umaći mački za dva koraka", "Mačka će uhvatiti miša",],
        "answerCorrect": "Miš će umaći mački za jedan korak"
    },
    {
        "question": "Za lonac s poklopcem plaćeno je 1,200 dinara. Lonac je skuplji od poklopca 1,000 dinara. Koliko košta poklopac?",
        "answers": ["Poklopac košta 100 dinara", "Poklopac košta 200 dinara", "Poklopac košta 1,100 dinara", "Poklopac košta 1,000 dinara"],
        "answerCorrect": "Poklopac košta 100 dinara"
    },
    {
        "question": "Za svesku je plaćeno 100 dinara i još trećinu cene sveske. Kolika je cena sveske?",
        "answers": ["133", "150", "100", "115"],
        "answerCorrect": "133"
    },
    {
        "question": "Otac je stariji od sina 3 puta, a sin je stariji od sestre 3 puta. Koliko je godina ocu ako zbir njegovih i ćerkinih godina iznosi 50?",
        "answers": ["45 godina", "40 godina", "5 godina", "10 godina"],
        "answerCorrect": "45 godina"
    },
    {
        "question": "Kada je učenik pročitao polovinu knjige i još 20 strana ostalo mu je da pročita još trećinu knjige. Kolko je imala strana imala knjiga?",
        "answers": ["100 strana", "200 strana", "180 strana", "120 strana"],
        "answerCorrect": "120 strana"
    },
    {
        "question": "Na koliko se načina od 6 jabuka mogu uzeti 2 jabuke?",
        "answers": ["30 načina", "15 načina", "20 načina", "10 načina"],
        "answerCorrect": "15 načina"
    },
    {
        "question": "Dva brata, Uroš i Marko rođeni su istog dana, u istom mestu, iste godine i od istih roditelja, ali nisu blizanci. Kako je to moguće?",
        "answers": ["Nije moguće", "Rođeni su kao trojke"],
        "answerCorrect": "Nije moguće"
    },
    {
        "question": "Sinu je 9 godina, a ocu je 35. Kada će otac biti tri puta stariji od sina?",
        "answers": ["Kada sin bude imao 10 godina", "Kada sin bude imao 13 godina", "Kada sin bude imao 15 godina"],
        "answerCorrect": "Kada sin bude imao 13 godina"
    },
    {
        "question": "Koliko 2 i po štapa imaju krajeva?",
        "answers": ["5", "2", "6"],
        "answerCorrect": "6"
    },
    {
        "question": "Brat i sestra su pre 8 godina imali zajedno 8 godina. Koliko će godina imati zajedno posle 8 godina?",
        "answers": ["Imaće ukupno 40 godina", "Imaće ukupno 24 godina", "Imaće ukupno 16 godina"],
        "answerCorrect": "Imaće ukupno 40 godina"
    }
];

var quizTimer = document.querySelector("#quiz-timer");
var quizProgress = document.querySelector("#quiz-progress");
var quizScore = document.querySelector('#quiz-score');
var quizQuestion = document.getElementById("quiz-question");
var quizAnswersContainer = document.querySelector('#quiz-answers-container');
 
var q = 0, i = 0, j = 0;
var number_questions = 7;

quizProgress.textContent = `${q + 1}/${number_questions}`;
var score = 0;
var answers = [];
var answerCorrect;
var counter_answerCorrect = 0;
// var answersCorrect = [];
var answers_Element = [];

var timerLimit = 60;
var timer = timerLimit;
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




const endQuiz = () => {
    clearInterval(timerInterval);

    console.log(`(${counter_answerCorrect} / ${number_questions}) * (${timerLimit} / (${timerLimit - timer}))`)
    score = Math.round((counter_answerCorrect / number_questions) * (timerLimit / (timerLimit - timer)) * Math.pow(10, 5));

    alert(`Osvojeni broj bodova: ${score}`);

    // location.href = "/end.html";
}

const shuffleArray = (array) => {
    for (i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const loadQuestion = (i) => {
    quizQuestion.textContent = questions[i].question;
}

const loadAnswers = (a) => {
    answers = [];
    for (i = 0; i < questions[a].answers.length; i++) {
        answers[i] = questions[a].answers[i];
    }
    console.log(answers);

    for (i = 0; i < questions[a].answers.length; i++) {
        if (answers[i] == questions[a].answerCorrect) answerCorrect = i;
    }
    console.log(answerCorrect);

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
                score += 10;
                audio.src = "./sfx/answer-right.mp3";
            }
            else {
                answerCheckWrong(answerSelected_Element);
                audio.src = "./sfx/answer-wrong.mp3";
            }
            audio.play();

            quizScore.textContent = score.toString().padStart(4, '0');
            console.log(quizScore.textContent);

            setCookie("score", score.toString(), 1);
            console.log(`SCORE: ${score}`);

            setTimeout(() => {
                answerSelected_Element.children[1].style.color = "hsla(180, 100%, 50%, 1)";
                
                if (q < (number_questions - 1)) {
                    q++;

                    quizProgress.textContent = `${q + 1}/${number_questions}`;

                    loadQuestion(q);
                    loadAnswers(q);
                    answerChecksReset();
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
quizBackgroundMusic.play();

var answerSelected_Index = 0;
var answerSelected_Element;
answerChecksReset();




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