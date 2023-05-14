const splashScreen = document.querySelector("#splash-screen");
const splashScreen_Heading = document.querySelector("#splash-screen_heading");
const splashScreen_Image = document.querySelector("#splash-screen_image");
const introductionCutscene = document.querySelector("#introduction-cutscene_container");
var continueEnabled = false;

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        splashScreen_Heading.classList.remove("fade");
        splashScreen_Heading.classList.add("active");
    }, 500);

    setTimeout(() => {
        splashScreen_Image.classList.remove("fade");
        splashScreen_Image.classList.add("active");
    }, 1000);

    setTimeout(() => {
        splashScreen_Heading.classList.remove("active");
        splashScreen_Heading.classList.add("fade");
    }, 2500);

    setTimeout(() => {
        splashScreen_Image.classList.remove("active");
        splashScreen_Image.classList.add("fade");
    }, 4000);

    setTimeout(() => {
        splashScreen.classList.add("fade");
    }, 4000);

    setTimeout(() => {
        continueEnabled = true;
        splashScreen.style.display = "None";
        splashScreen_Heading.style.display = "None";
        splashScreen_Image.style.display = "None";
        introductionCutscene.classList.remove("fade");
        introductionCutscene.classList.add("active");
    }, 5000);
    
});


const paragraphContainer = document.querySelector("#introduction-cutscene_paragraph-container");
const paragraphs = paragraphContainer.children;
const imagePoincare = document.querySelector("#image-poincare");
var continueCounter = 1;
document.addEventListener("keydown" , (event) =>{
    const key = event.key;
    
    if (continueEnabled == true && key == "f" && continueCounter < paragraphs.length) {
        if (continueCounter == 1) {
            imagePoincare.classList.remove("fade");
            imagePoincare.classList.add("active");
        }

        paragraphs[continueCounter].classList.remove("fade");
        paragraphs[continueCounter].classList.add("active");
        continueCounter++;
    }
    else if (continueCounter === paragraphs.length) {
        // Insert a badass (and hopefully possible) animation here

        location.href = "./quiz.html";
    }
});