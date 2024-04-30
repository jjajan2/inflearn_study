const type = ["주먹", "보", "가위"];
const img = ["./img/rock.png", "./img/paper.png", "./img/scissors.png"];
const maxRound = 10;

let roundCnt = 0;
let computerSelect;
let playerSelect;
let computerScore = 0;
let playerScore = 0;
let result;

const computerScoreElement = document.querySelector(".computer_score");
const playerScoreElement = document.querySelector(".player_score");
const roundCntElement = document.querySelector(".round_cnt");
const computerImg = document.querySelector(".computer_img img");
const playerImg = document.querySelector(".player_img img");
const resultElement = document.querySelector(".result");
const playCntElement = document.querySelector(".play_cnt");

function playGame(playerSelectNum) {
  roundCnt++;

  if (maxRound < roundCnt) {
    alert("게임이 종료되었습니다.");
    endGameResult(computerScore, playerScore);
    return;
  }

  computerSelect = Math.floor(Math.random() * type.length);
  playerSelect = playerSelectNum;

  computerImg.src = img[computerSelect];
  playerImg.src = img[playerSelect];

  result = gameResult(computerSelect, playerSelect);
  resultElement.textContent = result;

  computerScoreElement.textContent = computerScore;
  playerScoreElement.textContent = playerScore;

  roundCntElement.textContent = roundCnt;
  playCntElement.textContent = maxRound - roundCnt;
}

function gameResult(computerSelect, playerSelect) {
  if (computerSelect == playerSelect) {
    return "비겼습니다.";
  } else if (
    (computerSelect == 0 && playerSelect == 1) ||
    (computerSelect == 1 && playerSelect == 2) ||
    (computerSelect == 2 && playerSelect == 0)
  ) {
    playerScore++;
    return "이겼습니다!";
  } else {
    computerScore++;
    return "졌습니다.";
  }
}

function resetGame() {
  roundCnt = 1;
  computerScore = 0;
  playerScore = 0;
  computerImg.src = img[0];
  playerImg.src = img[0];
  result = gameResult(0, 0);
  resultElement.textContent = "이겼습니다!";
  computerScoreElement.textContent = computerScore;
  playerScoreElement.textContent = playerScore;
  roundCntElement.textContent = roundCnt;
  playCntElement.textContent = maxRound;
}

function endGameResult(computerScore, playerScore) {
  if (computerScore === playerScore) {
    result = "아쉽게도 게임이 비겼습니다.";
  } else if (computerScore < playerScore) {
    result = "축하합니다! 게임을 이겼습니다!";
  } else {
    result = "게임을 졌습니다..";
  }
  resultElement.textContent = result;
}

const buttons = document.querySelectorAll(".play_button");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    playGame(index);
  });
});

const resetButton = document.querySelector(".reset_button");
resetButton.addEventListener("click", resetGame);
