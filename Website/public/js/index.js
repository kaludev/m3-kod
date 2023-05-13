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
    }, 3000);

    setTimeout(() => {
        splashScreen.classList.add("fade");
    }, 3000);

    setTimeout(() => {
        continueEnabled = true;
        splashScreen.style.display = "None";
        splashScreen_Heading.style.display = "None";
        splashScreen_Image.style.display = "None";
        introductionCutscene.classList.remove("fade");
        introductionCutscene.classList.add("active");
    }, 4000);
});


document.addEventListener("keydown" , (event) =>{
    const key = event.key;
    
    if (skipEnabled == true && key == "f") {

    }
});