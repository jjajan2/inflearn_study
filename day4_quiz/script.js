import question from "./question.json" assert { type: "json" };

let roundCnt = 0;
let correctCnt = 0;

const roundCntElement = document.querySelector(".round_cnt_bar");
const roundElement = document.querySelector(".round");
const questionElement = document.querySelector(".question");
const answerElements = document.querySelectorAll(".answer");
const nextButton = document.querySelector(".next");

function quizGameSet() {
  roundElement.textContent = 1;
  questionElement.textContent = question[0].question;
  answerElements.forEach((element, index) => {
    element.textContent = question[0].options[index];
  });

  for (let i = 0; i < question.length; i++) {
    const roundbar = document.createElement("div");
    roundbar.classList.add("bar");

    if (i == 0) {
      roundbar.classList.add("filled");
    }

    roundCntElement.appendChild(roundbar);
  }
}

function updateRoundBar() {
  const roundbarElement = document.querySelectorAll(".bar");
  roundbarElement.forEach((bar, index) => {
    if (index <= roundCnt) {
      bar.classList.add("filled");
    } else {
      bar.classList.remove("filled");
    }
  });
}

function updateAnswerElement(index, icon, className) {
  answerElements[index].innerHTML += icon;
  answerElements[index].classList.add(className);
}

function updateAnswerElementsDisabled(isDisabled) {
  answerElements.forEach((element) => {
    element.disabled = isDisabled;
  });
}

function playGame(selectIndex) {
  const isCorrect =
    question[roundCnt].options[selectIndex] === question[roundCnt].correct;

  if (isCorrect) {
    updateAnswerElement(
      selectIndex,
      `<i class="fa-solid fa-circle-check"></i>`,
      "correct"
    );
    correctCnt++;
  } else {
    updateAnswerElement(
      selectIndex,
      `<i class="fa-solid fa-circle-xmark"></i>`,
      "wrong"
    );
    const correctIndex = question[roundCnt].options.findIndex(
      (option) => option === question[roundCnt].correct
    );
    updateAnswerElement(
      correctIndex,
      `<i class="fa-solid fa-circle-check"></i>`,
      "correct"
    );
  }

  updateAnswerElementsDisabled(true);

  if (roundCnt === question.length - 1) {
    endGame();
  } else {
    roundCnt++;
  }
}

function nextGame() {
  nextButton.textContent = "Next";
  updateAnswerElementsDisabled(false);

  questionElement.textContent = question[roundCnt].question;
  answerElements.forEach((answer, index) => {
    answer.classList.remove("correct");
    answer.classList.remove("wrong");
    answer.textContent = question[roundCnt].options[index];
  });
  roundElement.textContent = roundCnt + 1;

  updateRoundBar();
}

function endGame() {
  nextButton.textContent = "Retry";

  roundCnt = 0;
  correctCnt = 0;
}

answerElements.forEach((answer, index) => {
  answer.addEventListener("click", () => {
    playGame(index);
  });
});

nextButton.addEventListener("click", nextGame);

quizGameSet();
