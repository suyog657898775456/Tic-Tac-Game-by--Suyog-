let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const themeToggle = document.querySelector("#theme-toggle");

let turnO = true; // true = O's turn, false = X's turn
let count = 0; // track moves

// Winning patterns
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 🎵 Sound effects
const winSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4386");
const drawSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4387");
const clickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4385");

// Reset game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Add click event to boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    clickSound.play(); // play click sound

    if (turnO) {
      box.innerText = "O";
      box.style.color = "#b0413e";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#1c4e80";
      turnO = true;
    }
    box.classList.add("filled");
    box.disabled = true;
    count++;

    checkWinner();
  });
});

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("filled");
    box.classList.remove("winner");
  });
};

// Show winner
const showWinner = (winner, pattern) => {
  msg.innerText = `Winner: ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  // Highlight winning boxes
  pattern.forEach((index) => {
    boxes[index].classList.add("winner");
  });

  winSound.play(); // play win sound
};

// Check winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1, pattern);
        return;
      }
    }
  }

  // Draw check
  if (count === 9) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    drawSound.play(); // play draw sound
  }
};

// Buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// 🌙 Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.innerText = "☀️ Light Mode";
  } else {
    themeToggle.innerText = "🌙 Dark Mode";
  }
});
