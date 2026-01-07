const words = ["COWBOY", "CHEVAL", "DESERT", "LASSO", "SALOON", "PISTOLET", "FARWEST"];
let word, guessed, attempts, currentPlayer;
const maxAttempts = 6;

const wordDisplay = document.getElementById("word-display");
const letterButtons = document.getElementById("letter-buttons");
const status = document.getElementById("status");
const turnDisplay = document.getElementById("turn");
const restartBtn = document.getElementById("restart");
const cowboy = document.querySelector(".cowboy");

function initGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessed = [];
    attempts = 0;
    currentPlayer = 1;
    cowboy.style.opacity = 0;
    updateWordDisplay();
    status.textContent = "";
    turnDisplay.textContent = `Joueur ${currentPlayer} à vous !`;

    letterButtons.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        let btn = document.createElement("button");
        btn.textContent = String.fromCharCode(i);
        btn.addEventListener("click", guessLetter);
        letterButtons.appendChild(btn);
    }
}

function guessLetter(e) {
    const letter = e.target.textContent;
    e.target.disabled = true;

    if (word.includes(letter)) {
        guessed.push(letter);
        updateWordDisplay();
        checkWin();
    } else {
        attempts++;
        updateCowboy();
        checkLose();
        switchPlayer();
    }
}

function updateWordDisplay() {
    wordDisplay.innerHTML = word.split("").map(l => guessed.includes(l) ? l : "_").join(" ");
}

function updateCowboy() {
    cowboy.style.opacity = attempts / maxAttempts;
}

function checkWin() {
    if (word.split("").every(l => guessed.includes(l))) {
        status.textContent = `🎉 Joueur ${currentPlayer} a gagné !`;
        disableAllButtons();
    }
}

function checkLose() {
    if (attempts >= maxAttempts) {
        status.textContent = `💀 Tous les joueurs ont perdu ! Le mot était "${word}"`;
        disableAllButtons();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnDisplay.textContent = `Joueur ${currentPlayer} à vous !`;
}

function disableAllButtons() {
    letterButtons.querySelectorAll("button").forEach(b => b.disabled = true);
}

restartBtn.addEventListener("click", initGame);

initGame();
