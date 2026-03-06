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

/* Off canvas */
howHandle.onclick = () => howToPlayPanel.classList.toggle("open");
howClose.onclick = () => howToPlayPanel.classList.remove("open");