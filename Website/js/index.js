const splashScreen = document.querySelector("#splash-screen");
const splashScreen_Heading = document.querySelector("#splash-screen_heading");
const splashScreen_HeadingText = document.querySelectorAll(".splash-screen_heading-text");

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