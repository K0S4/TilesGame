let highlightedTileNumber = 0;
let timeLeft = 30;
let score = 0;
let miss = 0;
let buttonActiveClass = "button-active";
const startingTile = document.getElementById(0);
startingTile.classList.add(buttonActiveClass);

// dark mode

function toogleTheme(tileId) {
  let element = document.getElementById("body");
  element.classList.toggle("dark-theme");
  
}


//logic

function getRandomNumber() {
  return Math.floor(Math.random() * 9);
}

function highlightTile(tileId) {
  const tileToClick = document.getElementById(tileId);
  tileToClick.classList.add("button-active");
}

function clearHighlightTile(tileId) {
  const activatedTile = document.getElementById(tileId);
  activatedTile.classList.remove("button-active");

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

