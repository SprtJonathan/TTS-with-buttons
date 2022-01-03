let sentence = [];
let sentenceElement = document.getElementById("sentence");
sentenceElement.textContent = sentence;

let addWordInput = document.getElementById("add-word-input");
let addWordButton = document.getElementById("add-word-button");

let wordsSection = document.getElementById("words-section");

const dataLocation = "http://127.0.0.1:3000/api/hybridus";
let jsonContent = JSON.stringify();

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

function addToSentence(value, filename) {
  console.log(value);
  sentence.push({ value: normalizeString(value), filename: filename });
  sentenceElement.textContent = [];
  for (i = 0; i < sentence.length; i++) {
    sentenceElement.textContent += sentence[i].value + " ";
  }
}

// Récupération des données des recettes
function fetchData() {
  fetch(dataLocation)
    .then((response) => response.json())
    .then(function getWords(data) {
      console.log(data.words);
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
