let sentence;
let randomIndex;
let randomSentence;
let totalErrorsCount = 0;
let totalAccuracy = 0;
let gameCount = 1;
let totalTyping = 0;
let time = 20;

fetch("./sentence.json")
  .then((response) => response.json())
  .then((data) => {
    sentence = data;
    randomIndex = Math.floor(Math.random() * sentence.length);
    randomSentence = sentence[randomIndex].sentence;
    sentenceElement.textContent = randomSentence;
  })
  .catch((error) => {
    console.error("Error fetching JSON data:", error);
  });

const sentenceElement = document.querySelector(".sentence");
const typingInput = document.querySelector(".typing_input");
const typingInfo = document.querySelector(".typing_info");
const errorsElement = document.querySelector(".errors");
const timeElement = document.querySelector(".time");
const accuracyElement = document.querySelector(".accuracy");

function gameTimer() {
  let interval = setInterval(() => {
    time--;
    timeElement.innerHTML = `${time}<span>s</span>`;

    if (time === 0) {
      clearInterval(interval);
      alert("게임이 끝났습니다!");
      stopGame();
    }
  }, 1000);
}

function checkTyping() {
  const typingValue = typingInput.value;
  let html = "";

  let errorsCount = 0;
  let accuracy = 0;

  typingValue.split("").forEach((char, index) => {
    if (typingValue[index] === randomSentence[index]) {
      html += `<span class="correct">${char}</span>`;
    } else {
      html += `<span class="wrong">${randomSentence[index]}</span>`;
      errorsCount++;
    }
    accuracy = Math.floor((errorsCount / typingValue.length) * 100);
  });

  html += `<span>${randomSentence.slice(typingValue.length)}</span>`;
  sentenceElement.innerHTML = html;

  updateTypingInfo(errorsCount, accuracy);

  if (typingValue.length === randomSentence.length) {
    if (randomIndex === sentence.length - 1) {
      randomIndex = 0;
    } else {
      randomIndex++;
    }
    totalTyping += typingValue.length;
    totalErrorsCount += errorsCount;
    totalAccuracy += accuracy;
    getNextSentence();
  }
}

function updateTypingInfo(errorsCount, accuracy) {
  errorsElement.textContent = totalErrorsCount + errorsCount;
  accuracyElement.innerHTML = `${Math.floor(
    100 - (totalAccuracy + accuracy) / gameCount
  )}<span>%</span>`;
}

function getNextSentence() {
  randomSentence = sentence[randomIndex].sentence;
  sentenceElement.textContent = randomSentence;
  typingInput.value = "";
  gameCount++;
}

function updateWpm() {
  const wpmElement = document.createElement("div");
  wpmElement.classList.add("info", "wpm");
  wpmElement.innerHTML = `<h5 class="info_title">WPM</h5>
  <p class="info_value">${Math.floor((totalTyping / 5) * 3)}</p>`;

  typingInfo.appendChild(wpmElement);
}

function updateCpm() {
  const cpmElement = document.createElement("div");
  cpmElement.classList.add("info", "cpm");
  cpmElement.innerHTML = `<h5 class="info_title">CPM</h5>
  <p class="info_value">${totalTyping * 3}</p>`;

  typingInfo.appendChild(cpmElement);
}

function startGame() {
  resetGame();
  gameTimer();
}

function resetGame() {
  totalErrorsCount = 0;
  totalAccuracy = 0;
  gameCount = 1;
  totalTyping = 0;
  time = 20;
  sentenceElement.textContent = randomSentence;
  errorsElement.textContent = 0;
  timeElement.innerHTML = `${time}<span>s</span>`;
  accuracyElement.innerHTML = "0<span>%</span>";
  startButton.style.display = "none";
  startButton.textContent = "start!";
  typingInput.disabled = false;

  const cpmElement = document.querySelector(".cpm");
  const wpmElement = document.querySelector(".wpm");

  if (cpmElement) typingInfo.removeChild(cpmElement);
  if (wpmElement) typingInfo.removeChild(wpmElement);
}

function stopGame() {
  updateCpm();
  updateWpm();
  typingInput.disabled = true;
  startButton.style.display = "block";
  startButton.textContent = "retry";
  sentenceElement.textContent = "retry!";
  typingInput.value = "";
}

typingInput.addEventListener("input", checkTyping);

const startButton = document.querySelector(".start_button");
startButton.addEventListener("click", startGame);
