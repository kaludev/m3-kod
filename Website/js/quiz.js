import data from '../data/data.json' assert {type:'json'};
let answering = true;
const shuffledData = data.sort((a, b) => 0.5 - Math.random());
let currentIndex = -1;
let time = 30;
let interval;
let question = document.querySelector('#quiz-question');
let quizAnswers = document.querySelector('#quiz-answers-container')
const timer = document.querySelector('#quiz-timer');
const reloadQuestion = () => {
    if(currentIndex < shuffledData.length){
        quizAnswers.innerHTML = '';
        question.textContent = shuffledData[currentIndex].question;
        shuffledData[currentIndex].answers.forEach(answer => {
            let quizAnswer = document.createElement('div');
            quizAnswer.classList.add('quiz-answer');
            let input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'quiz-answer');
            input.setAttribute('value', answer);
            let h5 = document.createElement('h5');
            h5.textContent = answer;
            quizAnswer.appendChild(input);
            quizAnswer.appendChild(h5);
            quizAnswers.appendChild(quizAnswer);
        })
    }else{

    }
}
let nextQuestion = () =>{
    currentIndex++;
    reloadQuestion();
    time = 30;
    timer.textContent = time;
    if(interval){
        clearInterval(interval);
        interval = null;
    }
    interval = setInterval(() => {
        time--;
        timer.textContent = time;
        if(time === 0){
            nextQuestion()
        }
    },1000)

}

nextQuestion();


let buttonNext = document.querySelector('#quiz-buttonNext');

buttonNext.addEventListener('click', () =>{
    if(answering){
        if(interval){
            clearInterval(interval);
            interval = null;
        }
        shuffledData[currentIndex]['correct-answers'].forEach(correctAnswer =>{
           quizAnswers.querySelectorAll('.quiz-answer').forEach(quizAnswer => {
            if(quizAnswer.querySelector('input').value === correctAnswer){
                quizAnswer.style.backColor = "green";
            }
            console.log(quizAnswer)
           })
        })
    }else{
        nextQuestion(); 
    }
    answering = !answering
})