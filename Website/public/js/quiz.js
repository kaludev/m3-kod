let questions = [
    {
        "question":"Ako u ponoć pada kiša, može li se očekivati da će nakon 72 sata vreme biti sunčano ?",
        "answers": ["Može","Ne može","nesto", "josnesto"],
        "correct-answer":"Ne može"
    },
    {
        "question":"Miš je udaljen od od svog skloništa 20 koraka. Mačka je udaljena od miša 5 skokova. Dok mačka jedanput skoči, miš načini 3 koraka, ali je jedan skok mačke velik kao 10 miševih koraka. Da li će mačka uhvatiti miša?",
        "answers": ["Miš će umaći mački za jedan korak","Miš će umaći mački za dva koraka","Mačka će uhvatiti miša","nesto"],
        "correct-answer":"Miš će umaći mački za jedan korak"
    },
    {
        "question":"Za lonac s poklopcem plaćeno je 1.200 dinara. Lonac je skuplji od poklopca 1.000 dinara. Koliko košta poklopac?",
        "answers": ["Poklopac košta 100 dinara","Poklopac košta 200 dinara","Poklopac košta 1100 dinara","Poklopac košta 1000 dinara"],
        "correct-answer":"Poklopac košta 100 dinara"
    },
    {
        "question":"Za svesku je plaćeno 100 dinara i još trećinu cene sveske. Kolika je cena sveske?",
        "answers": ["133.33","150","100","115"],
        "correct-answer":"150"
    },
    {
        "question":"Otac je stariji od sina 3 puta, a sin je stariji od sestre 3 puta. Koliko je godina ocu ako zbir njegovih i ćerkinih godina iznosi 50?",
        "answers": ["45 godina","40 godina","5 godina","10 godina"],
        "correct-answer":"45 godina"
    },
    {
        "question":"Kada je učenik pročitao polovinu knjige i još 20 strana ostalo mu je da pročita još trećinu knjige. Kolko je imala strana imala knjiga?",
        "answers": ["100 strana","200 strana","180 strana","120 strana"],
        "correct-answer":"120 strana"
    },
    {
        "question":"Na koliko se načina od 6 jabuka mogu uzeti 2 jabuke?",
        "answers": ["30 načina","15 načina","20 načina","10 načina"],
        "correct-answer":"15 načina"
    },
    {
        "question":"Dva brata, Uroš i Marko rođeni su istog dana, u istom mestu, iste godine i od istih roditelja, ali nisu blizanci. Kako je to moguće?",
        "answers": ["Nije moguće","Rođeni su kao trojke","nesto","jsoinesto"],
        "correct-answer":"Ne moze"
    },
    {
        "question":"Sinu je 9 godina , a ocu je 35. Kada će otac biti tri puta stariji od sina?",
        "answers": ["Kada sin bude imao 10 godina","Kada sin bude imao 13 godina","Kada sin bude imao 15 godina","nesto"],
        "correct-answer":"Kada sin bude imao 13 godina"
    },
    {
        "question":"Koliko 2 i po štapa imaju krajeva?",
        "answers": ["6","2","5","nesto"],
        "correct-answer":"6"
    },
    {
        "question":"Brat i sestra su pre 8 godina imali zajedno 8 godina. Koliko će godina imati zajedno posle 8 godina?",
        "answers": ["imaće ukupno 40 godina","imaće ukupno 24 godina","imaće ukupno 16 godina","nesto"],
        "correct-answer":"imaće ukupno 40 godina"
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




    // COOKIES

setCookie("score", score.toString(),1);
setCookie("uploaded", "");

document.addEventListener("keydown", (event) =>{
    const keyName = event.key
    if (keyName == "f"){
        if(questions[i]["correct-answer"] === answs[chosenIndex].nodeValue){
            score++;
            setCookie("score", score.toString(),1);
        }
        i++
        startChanging()
        if (i<questions.length){
            loadQuestion(i)
        }else{
            location.href = "/end.html"
        }
    }
})

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