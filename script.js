const startingTile = document.getElementById(0);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const boardSizeNumber = urlParams.get("tiles") * urlParams.get("tiles");
let highlightedTileNumber = 0;
let timeLeft = urlParams.get("timer");
let score = 0;
let miss = 0;
let rngOld;
let buttonActiveClass = "button-active";

startingTile.classList.add(buttonActiveClass);

//board generation
for (i = 1; i < boardSizeNumber; i++) {
  document.getElementById("board").innerHTML += ` <button
    id="${i}"
    class="button-empty"
    onclick="handleTileClick(${i})"
  ></button>`;
  console.log(i);
}

// dark mode

function toogleTheme(tileId) {
  let element = document.getElementById("body");
  element.classList.toggle("dark-theme");
}

//logic

function getRandomNumber() {
  return Math.floor(Math.random() * boardSizeNumber);
}

function getUniqueRandomNumber() {
  let rng = getRandomNumber();
  while (rng === rngOld) {
    rng = getRandomNumber();
    console.log("sameNumber");
  }
  rngOld = rng;
  return rng;
}

function highlightTile(tileId) {
  console.log("tileId:", tileId);
  const tileToClick = document.getElementById(tileId);
  if (tileToClick) {
    tileToClick.classList.add("button-active");
  }
}

function clearHighlightTile(tileId) {
  const activatedTile = document.getElementById(tileId);
  activatedTile.classList.remove("button-active");
}

function handleTileClick(clickedTileNumber) {
  if (clickedTileNumber == highlightedTileNumber) {
    clearHighlightTile(highlightedTileNumber);
    const randomNumber = getUniqueRandomNumber();
    score++;
    console.log("random number", randomNumber);
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
function timer() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    endGame();
  } else {
    document.getElementById("time").innerHTML = timeLeft;
  }
  timeLeft--;
}
timer();
setInterval(timer, 1000);

function gameParameters() {
  const numberLinkParameter = document.querySelector("#numberLinkInput").value;
  console.log(numberLinkParameter);
  const timerLinkParameter = document.querySelector(
    "#timerDurationInput"
  ).value;
  console.log(timerLinkParameter);
  if (numberLinkParameter && timerLinkParameter) {
    document
      .getElementById("startGameLink")
      .setAttribute(
        "href",
        "game.html?tiles=" +
          numberLinkParameter +
          "&&timer=" +
          timerLinkParameter
      );
  } else {
  }
}

function updateTextInput(val) {
  document.getElementById("rangeInputDisplay").innerHTML = val + "x" + val;
}
