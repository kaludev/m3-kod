import data from '../data/data.json' assert {type:'json'};

const shuffledData = data.sort((a, b) => 0.5 - Math.random());
let currentIndex = 0;
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
        time = 30;
        timer.textContent = time;
        clearInterval(interval)
        interval = setInterval(() => {
            time--;
            timer.textContent = time;
            if(time === 0){
                currentIndex++;
                reloadQuestion();
            }
        },1000)
    }
}

reloadQuestion();


let buttonNext = document.querySelector('#quiz-buttonNext');

buttonNext.addEventListener('click', () =>{
    currentIndex++;
    reloadQuestion();
})