const splashScreen = document.querySelector("#splash-screen");
const splashScreen_Heading = document.querySelector("#splash-screen_heading");
const splashScreen_HeadingText = document.querySelectorAll(".splash-screen_heading-text");
let selected = 0;
const selectable = document.querySelectorAll(".navigation_nav-item");
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {

        splashScreen_HeadingText.forEach((text, id) => {
            setTimeout(() => {
                text.classList.add("active");
            }, id * 500);
        });

        setTimeout(() => {
            splashScreen_HeadingText.forEach((text, id) => {
                setTimeout(() => {
                    text.classList.remove("active");
                    text.classList.add("fade");
                }, (id + 1) * 50);
            });
        }, 1000);

        setTimeout(() => {
            splashScreen.style.top = "-100vh";
        }, 1500);
    });
});


document.addEventListener("keydown" , (event) =>{
    const key = event.key;
    if (key == "ArrowUp") {
        selectable[selected].classList.remove("active");
        selected--;
        selected = (selected+ selectable.length)%selectable.length;
        selectable[selected].classList.add("active");
    }
    else if (key == "ArrowDown") {
        selectable[selected].classList.remove("active");
        selected++;
        selected = (selected+ selectable.length)%selectable.length;
        selectable[selected].classList.add("active");
    }
    else if (key == "f") {
        if(selectable[selected].textContent == "Kviz"){
            location.href = 'quiz.html';
        }
    }
});