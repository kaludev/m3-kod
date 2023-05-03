
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
    }
    ,
    {
        "question":"Brat i sestra su pre 8 godina imali zajedno 8 godina. Koliko će godina imati zajedno posle 8 godina?",
        "answers": ["imaće ukupno 40 godina","imaće ukupno 24 godina","imaće ukupno 16 godina","nesto"],
        "correct-answer":"imaće ukupno 40 godina"
    }
]

let quizTimer = document.getElementById("quiz-timer")
let textForTimer = document.createTextNode("")
quizTimer.appendChild(textForTimer)
let currentTimer = 20
textForTimer.nodeValue = currentTimer
currentTimer--
let x = setInterval(function() {
    textForTimer.nodeValue = currentTimer
    currentTimer--
    if (currentTimer < 0) {
      clearInterval(x);
      location.href = "/end.html"
    }
  }, 1000);
 
let qu = document.getElementById("quiz-question")
let a1 = document.getElementById("ans1")
let a2 = document.getElementById("ans2")
let a3 = document.getElementById("ans3")
let a4 = document.getElementById("ans4")

let textForQuestion = document.createTextNode("")
let textForAnswer1 = document.createTextNode("")
let textForAnswer2 = document.createTextNode("")
let textForAnswer3 = document.createTextNode("")
let textForAnswer4 = document.createTextNode("")

qu.appendChild(textForQuestion)
a1.appendChild(textForAnswer1)
a2.appendChild(textForAnswer2)
a3.appendChild(textForAnswer3)
a4.appendChild(textForAnswer4)



let answs = [textForAnswer1, textForAnswer2, textForAnswer3, textForAnswer4]

function loadQuestion(i){
    textForQuestion.nodeValue = questions[i].question
    for (let j=0; j<questions[i].answers.length; j++){
        answs[j].nodeValue = questions[i].answers[j]
    }
}
function last(btn){
    btn.style.color = "black"
    //PROMENITE STAJL KAKO TREBA
}

let buttons = [a1, a2, a3, a4]
let chosenIndex = 0
let selectedButton
function startChanging(){
    last(buttons[chosenIndex])
    chosenIndex=0
    selectedButton = buttons[chosenIndex]
    changeDesignOfButton(selectedButton)

}

startChanging()

function changeDesignOfButton(selectedButton){
    selectedButton.style.color = "red"
    //PROMENITE STAJL KAKO TREBA
}

document.addEventListener("keydown" , (event) =>{
    const keyName = event.key
    if (keyName == "ArrowDown" ){
        chosenIndex++;
        chosenIndex =  ((chosenIndex%buttons.length)+buttons.length)%buttons.length
        last(selectedButton)
        selectedButton = buttons[chosenIndex]
        changeDesignOfButton(selectedButton)
    }
    
} )

document.addEventListener("keydown" , (event) =>{
    const keyName = event.key
    if (keyName == "ArrowUp"){
        chosenIndex--;
        chosenIndex =  ((chosenIndex%buttons.length)+buttons.length)%buttons.length
        last(selectedButton)
        selectedButton = buttons[chosenIndex]
        changeDesignOfButton(selectedButton)
    }
    
} )

loadQuestion(0)

let i = 0
let score = 0;
setCookie("score",score.toString(),1);
let buttonNext = document.getElementById('quiz-buttonNext');
document.addEventListener("keydown", (event) =>{
    const keyName = event.key
    if (keyName == "Enter"){
        if(questions[i]["correct-answer"] === answs[chosenIndex].nodeValue){
            score++;
            setCookie("score",score.toString(),1);
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