let wordBank = [
  "cupcake",
  "brownie",
  "donut",
  "cheesecake",
  "macaron",
  "pudding",
  "waffle",
  "cookie",
  "icecream",
  "tiramisu",
  "croissant",
  "cannoli"
];

let chosenWord = "";
let guessedLetters = [];
let guessesLeft = 0;

// Start the game
function startGame(maxGuesses) {
  let randomIndex = Math.floor(Math.random() * wordBank.length);
  chosenWord = wordBank[randomIndex];

  guessesLeft = maxGuesses;
  guessedLetters = [];

  document.getElementById("guessesLeft").innerHTML = guessesLeft;
  document.getElementById("usedLetters").innerHTML = "";
  document.getElementById("message").innerHTML = "";

  updateCake();
  updateWordDisplay();
}

// ----------------------------
// UPDATE WORD DISPLAY
// ----------------------------
function updateWordDisplay() {
  let display = "";

  for (let i = 0; i < chosenWord.length; i++) {
    let letter = chosenWord.charAt(i);
    display += guessedLetters.includes(letter) ? letter + " " : "_ ";
  }

  document.getElementById("wordDisplay").innerHTML = display;
}

// ----------------------------
// GUESS BUTTON LOGIC
// ----------------------------
document.getElementById("guessBtn").onclick = function () {
  let input = document.getElementById("guessInput");
  let guess = input.value.toLowerCase();
  input.value = "";

  if (guess === "") return;

  if (guessedLetters.includes(guess)) {
    document.getElementById("message").innerHTML = "You already guessed that!";
    return;
  }

  guessedLetters.push(guess);
  document.getElementById("usedLetters").innerHTML = guessedLetters.join(", ");

  if (!chosenWord.includes(guess)) {
    guessesLeft--;
    updateCake();
  }

  document.getElementById("guessesLeft").innerHTML = guessesLeft;
  updateWordDisplay();
  checkGame();
};

// ----------------------------
// CHECK WIN / LOSE
// ----------------------------
function checkGame() {
  let won = true;

  for (let i = 0; i < chosenWord.length; i++) {
    if (!guessedLetters.includes(chosenWord[i])) {
      won = false;
      break;
    }
  }

  if (won) {
    document.getElementById("message").innerHTML = "🎉 You Win!";
  } else if (guessesLeft === 0) {
    document.getElementById("message").innerHTML = "Game Over! The word was " + chosenWord;
  }
}

// ----------------------------
// CAKE STAGE (HANGMAN SLICES)
// ----------------------------
function updateCake() {
  for (let i = 1; i <= 8; i++) {
    const slice = document.getElementById("slice" + i);
    if (!slice) continue;

    slice.style.opacity = i > guessesLeft ? 0 : 1;
  }

  // Optional: update main cake image too
  const healthImg = document.getElementById("healthImg");
  if (healthImg) healthImg.src = "images/cake" + guessesLeft + ".png";
}

// ----------------------------
// OFF-CANVAS "HOW TO PLAY" PANEL
// ----------------------------
const howPanel = document.getElementById("howToPlayPanel");
const howHandle = document.getElementById("howHandle");
const howClose = document.getElementById("howClose");

howHandle.addEventListener("click", () => {
  howPanel.classList.toggle("open");
});

howClose.addEventListener("click", () => {
  howPanel.classList.remove("open");
});

// ----------------------------
// ENTER KEY TO GUESS
// ----------------------------
document.getElementById("guessInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("guessBtn").click();
  }
});