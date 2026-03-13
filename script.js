let easyWords = [
   "cake",
  "donut",
  "cookie",
  "muffin",
  "waffle",
  "fudge"
];
let mediumWords = [
  "cupcake",
  "brownie",
  "pudding",
  "macaron",
  "cannoli",
  "eclair"
];
let hardWords = [
    "cheesecake",
  "tiramisu",
  "croissant",
  "profiterole",
  "baklava",
  "strudel"
];

let chosenWord = "";
let guessedLetters = [];
let guessesLeft = 0;
let currentMaxGuesses = 8;

function setInputsEnabled(enabled) {
  const input = document.getElementById("guessInput");
  const button = document.getElementById("guessBtn");
  if (input) input.disabled = !enabled;
  if (button) button.disabled = !enabled;
}

// Start the game
function startGame(maxGuesses) {
  currentMaxGuesses = maxGuesses;

  let randomIndex = Math.floor(Math.random() * wordBank.length);
  chosenWord = wordBank[randomIndex];

  guessesLeft = maxGuesses;
  guessedLetters = [];

  document.getElementById("guessesLeft").innerHTML = guessesLeft;
  document.getElementById("usedLetters").innerHTML = "";
  document.getElementById("message").innerHTML = "";

  setInputsEnabled(true);
  updateCake();
  updateWordDisplay();
  startTimer();
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
const guessBtn = document.getElementById("guessBtn");
const guessInput = document.getElementById("guessInput");

if (guessBtn && guessInput) {
  guessBtn.onclick = function () {
    let guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guess === "") return;

    if (!/^[a-z]$/.test(guess)) {
      document.getElementById("message").innerHTML = "Please enter a single letter (a–z).";
      return;
    }

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
  // ENTER KEY TO GUESS
  // ----------------------------
  guessInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      guessBtn.click();
    }
  });
}

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
    setInputsEnabled(false);
  } else if (guessesLeft === 0) {
    document.getElementById("message").innerHTML = "Game Over! The word was " + chosenWord;
    setInputsEnabled(false);
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

if (howPanel && howHandle && howClose) {
  howHandle.addEventListener("click", () => {
    howPanel.classList.toggle("open");
    document.body.classList.toggle("offcanvas-open");
  });

  howClose.addEventListener("click", () => {
    howPanel.classList.remove("open");
    document.body.classList.remove("offcanvas-open");
  });
}

// ----------------------------
// ENTER KEY TO GUESS
// ----------------------------
document.getElementById("guessInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("guessBtn").click();
  }
});

// code for countdown timer hard 

let timerInterval;
let timeLeft = 60;

function startTimer() {

  const timerDisplay = document.getElementById("timer");

  // If timer element doesn't exist, don't run timer
  if (!timerDisplay) return;

  timeLeft = 60;

  timerInterval = setInterval(function() {

    timeLeft--;
    timerDisplay.innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("message").innerHTML =
        "⏰ Time's up! The word was " + chosenWord;
      setInputsEnabled(false);
    }

  }, 1000);

}


