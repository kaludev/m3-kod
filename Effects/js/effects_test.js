        // DECLARING VARIABLES
const text = document.querySelector("#text").innerHTML;
const words = text.split(/\s+/);
const interval = 1000;
const duration = 500;

const shuffleWords = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffleLetters = (string) => {
  const array = string.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}

const applyEffects = () => {
  for (let i = 0; i < words.length; i++) {
    if (Math.random() < 0.5) {
      const temp = words[i];
      words[i] = shuffleLetters(words[i]);
      setTimeout(() => {
        words[i] = temp;
      }, duration);
    }
  }
  shuffleWords(words);
}

setInterval(applyEffects, interval);
console.log(words.join(" "));