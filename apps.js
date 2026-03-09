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


startBtn.onclick = startGame;
nameInput.addEventListener("keydown", e => {
  if (e.key === "Enter") startGame();
});

const howHandle = document.getElementById("howHandle");
const howClose = document.getElementById("howClose");
const howToPlayPanel = document.getElementById("howToPlayPanel");

/* Off canvas */
howHandle.onclick = () => howToPlayPanel.classList.toggle("open");
howClose.onclick = () => howToPlayPanel.classList.remove("open");
let wrongGuesses = 0;
const maxGuesses = 6; // easy difficulty
const hangmanImage = document.getElementById("hangmanImage");
const guessesLeft = document.getElementById("guessesLeft");

function updateHangman() {
    // Update image based on wrong guesses
    hangmanImage.src = `health${maxGuesses - wrongGuesses}.png`; 
    guessesLeft.textContent = `Guesses Left: ${maxGuesses - wrongGuesses}`;
}

// Example: Call this function whenever a wrong guess occurs
wrongGuesses++;
updateHangman();