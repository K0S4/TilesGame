let highlightedTileNumber = 0;
let timeLeft = 1024;
let score = 0;
let miss = 0;
let buttonActiveClass = "button-active";
const startingTile = document.getElementById(0);
startingTile.classList.add(buttonActiveClass);

// dark mode

function darkMode() {
  for (let elementId = 8; elementId >= 0; elementId--) {
    let element = document.getElementById(elementId);
    element.classList.toggle("dark-button-empty");
  }
  let x = document.getElementById("0");
  var y = x.classList.contains("dark-button-empty");
  console.log(y);
  if (y = 1) {
    buttonActiveClass = "dark-button-active";
    console.log("1");
  } else {
    buttonActiveClass = "button-active";
    console.log("0");
  }
}

//logic

function getRandomNumber() {
  return Math.floor(Math.random() * 9);
}

function highlightTile(tileId) {
  const tileToClick = document.getElementById(tileId);
  tileToClick.classList.add(buttonActiveClass);
}

function clearHighlightTile(tileId) {
  const activatedTile = document.getElementById(tileId);
  activatedTile.classList.remove("button-active");
  activatedTile.classList.remove("dark-button-active");

}

function handleTileClick(clickedTileNumber) {
  if (clickedTileNumber == highlightedTileNumber) {
    clearHighlightTile(highlightedTileNumber);
    const randomNumber = getRandomNumber();
    score++;
    highlightedTileNumber = randomNumber;
    highlightTile(randomNumber);
  } else {
    miss++;
  }
  document.getElementById("score").innerHTML = score;
  document.getElementById("miss").innerHTML = miss;
}

function endGame() {
  let acc = Math.floor((score / (score + miss)) * 100);

  document.getElementById("game").innerHTML = "";
  document.getElementById(
    "game"
  ).innerHTML = `<div class="endscreen"> <p class="endscreen-title">TIME'S UP</p class="endscreen-text"> <p class="endscreen-text">SCORE: ${score}</p> <p class="endscreen-text">MISS: ${miss}</p> <p class="endscreen-text">ACCURACY: ${acc}%</p> </div>`;
}

// timer

const timer = setInterval(function () {
  if (timeLeft <= 0) {
    clearInterval(timer);
    endGame();
  } else {
    document.getElementById("time").innerHTML = timeLeft;
  }
  timeLeft--;
}, 1000);

