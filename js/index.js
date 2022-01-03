let sentence = [];
let sentenceElement = document.getElementById("sentence");
sentenceElement.textContent = sentence;

let addWordInput = document.getElementById("add-word-input");
let addWordButton = document.getElementById("add-word-button");

let wordsSection = document.getElementById("words-section");

const dataLocation = "http://127.0.0.1:3000/api/hybridus";
const soundsLocation = "~/../sounds/hybridus/";

//addWordButton.addEventListener("click", addWord(addWordInput.value));

fetchData();

/*function addWord(wordToAdd) {
  const file = readFile(dataLocation);
  let words = JSON.parse(file);
  words.push(wordToAdd);
  writeFile(dataLocation, JSON.stringify(words));
}*/

function createWordButton(value, filename) {
  const htmlCode = `<button onclick="addToSentence('${value}', '${filename}')" class="words--word">${value}</button>`;

  return htmlCode;
}

function normalizeString(string) {
  return string
    .toLowerCase() // Transformation de tous les caractères en minuscule
    .normalize("NFD") // Normalisation des caractères (Normalization Form Canonical Decomposition)
    .replace(/[\u0300-\u036f]/g, "");
}

function updateSentenceDisplay() {
  sentenceElement.textContent = [];
  for (i = 0; i < sentence.length; i++) {
    sentenceElement.textContent += sentence[i].value + " ";
  }
}

function addToSentence(value, filename) {
  console.log(sentence.length);
  sentence.push({ value: normalizeString(value), filename: filename });
  updateSentenceDisplay();
}

function removeWord() {
  sentence.pop();
  updateSentenceDisplay();
}

function removeSentence() {
  sentence = [];
  updateSentenceDisplay();
}

// Récupération des données des recettes
function fetchData() {
  fetch(dataLocation)
    .then((response) => response.json())
    .then(function getWords(data) {
      console.log(data);
      for (const word of data) {
        if (word.includes(".wav")) {
          let splittedWord = word.replace(".wav", "");
          splittedWord = splittedWord.replace(
            splittedWord[0],
            splittedWord[0].toUpperCase()
          );
          wordsSection.innerHTML += createWordButton(splittedWord, word);
        }
      }
      console.log("test");
    });
}

function playAudio(phrase) {
  for (i = 0; i < phrase.length; i++) {
    console.log("playing " + phrase[i].filename);
    let sound = new Audio(soundsLocation + phrase[i].filename);

    let soundDuration;
    sound.addEventListener("loadeddata", function () {
      soundDuration = this.duration;
      console.log("Audio duration: " + this.duration);
      sound.play();
      wait(soundDuration)
      task(soundDuration);
    });
  }

  function task(i) {
    setTimeout(function () {
      // Add tasks to do
    }, 200 * i);
  }
}
