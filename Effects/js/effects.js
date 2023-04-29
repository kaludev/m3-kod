        // DECLARING VARIABLES
const text = document.querySelector("#text");
const textContent = text.innerHTML; //console.log(textContent);
var words = textContent.split(" "); //console.log(words);
var i = 0;
var f = 5;
var T = 1000;


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

const generateRandomIndices = (f) => {
    var randomIndices = [];

    for (i = 1; i <= f; i++) {
        var randomIndex = Math.floor(Math.random() * words.length);
        randomIndices.push(randomIndex);
    }   

    return randomIndices;
}

const applyEffects = () => {
    const originalWords = words.slice();
    const n = words.length;
    const randomIndices = generateRandomIndices(f);

    for (let i = 1; i <= f; i++) {
        const r = Math.floor(Math.random() * 3);
        console.log(`applyEffects(): r = ${r}`);

        // SHUFFLE WORDS
        if (r === 1) {
            const temporaryValue = words.slice();
            shuffleWords(words);
            text.innerHTML = words.join(" ");
            setTimeout(() => {
                words = temporaryValue.slice();
                text.innerHTML = words.join(" ");
            }, T)
        }
        // SHUFFLE LETTERS
        else if (r === 2) {
            const temporaryIndex = randomIndices[i - 1];
            const temporaryValue = words[temporaryIndex];
            const letters = words[temporaryIndex].split('');
            shuffleLetters(letters);
            words[temporaryIndex] = letters.join('');
            text.innerHTML = words.join(" ");
            setTimeout(() => {
                words[temporaryIndex] = temporaryValue;
                text.innerHTML = words.join(" ");
            }, T);
        }
    }

    console.log("―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――");
    words = originalWords.slice();
    text.innerHTML = words.join(" ");
}


    // FILTERING WORDS
// words = words.filter(c => c.trim() !== '');
// words = words.map(c => c.replace(/[,.\n]/g, ''));


    // APPLYING EFFECTS
applyEffects();
setInterval(applyEffects, T);