        // DECLARING VARIABLES
const text = document.querySelector("#text");
const textContent = text.innerHTML; //console.log(textContent);
var words = textContent.split(" "); //console.log(words);
var i = 0;
var f = 5;
var T = 5000;


        // DECLARING FUNCTIONS

    // SHUFFLE WORDS
const backwardSwap = (array, randomIndex) => {
    temporaryValue = array[randomIndex];
    array[randomIndex] = array[randomIndex - 1];
    array[randomIndex - 1] = temporaryValue;

    console.log("backwardSwap()");
}

const forwardSwap = (array, randomIndex) => {
    temporaryValue = array[randomIndex];
    array[randomIndex] = array[randomIndex + 1];
    array[randomIndex + 1] = temporaryValue;

    console.log("forwardSwap()");
}

const shuffleWords = (words) => {
    let randomIndex = Math.floor(Math.random() * words.length);
    console.log(`shuffleWords(): randomIndex = ${randomIndex}`);

    if (randomIndex === words.length - 1) backwardSwap(words, randomIndex);
    else if (randomIndex === 0) forwardSwap(words, randomIndex);
    else {
        if (Math.floor(Math.random() * 1) === 0) backwardSwap(words, randomIndex);
        else forwardSwap(words, randomIndex);
    }

    return words;
}

    // SHUFFLE LETTERS
const shuffleLetters = (letters) => {
    let currentIndex = letters.length;
    let randomIndex;
    let temporaryIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        console.log(`shuffleLetters(): randomIndex = ${randomIndex} | currentIndex = ${currentIndex}`);
        currentIndex -= 1;

        temporaryIndex = letters[currentIndex];
        letters[currentIndex] = letters[randomIndex];
        letters[randomIndex] = temporaryIndex;
    }

    return word = letters.join('');
}


const applyEffects = () => {
    var n = words.length;
    var temporaryValue;
    var temporaryIndex;

    for (i = 1; i <= f; i++) {
        var r = Math.floor(Math.random() * 3);
        var randomIndex = Math.floor(Math.random() * words.length);
        console.log(`applyEffects(): r = ${r}`);

        // SHUFFLE WORDS
        if (r === 1) {
            temporaryValue = words;
            shuffleWords(words);
            text.innerHTML = words.join(" ");
            setTimeout(() => {
                words = temporaryValue;
                text.innerHTML = words.join(" ");
            }, T)
        }
        // SHUFFLE LETTERS
        else if (r === 2) {
            temporaryIndex = randomIndex;
            temporaryValue = words[randomIndex];
            // console.log(randomIndex);
            letters = words[randomIndex].split('');
            shuffleLetters(letters);
            words[randomIndex] = letters.join('');
            text.innerHTML = words.join(" ");
            setTimeout(() => {
                words[(n*i) / f] = temporaryValue;
                text.innerHTML = words.join(" ");
            }, T);
        }
    }

    console.log("――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――");
}


    // FILTERING WORDS
// words = words.filter(c => c.trim() !== '');
// words = words.map(c => c.replace(/[,.\n]/g, ''));


    // APPLYING EFFECTS
applyEffects();
setInterval(applyEffects, T);