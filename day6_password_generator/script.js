const num = "0123456789";
const eng = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbol = "!@#$%^&*";

const copyInput = document.querySelector(".copy_input");
const lengthInput = document.querySelector(".length_input");
const lengthRange = document.querySelector(".length_range");
const numbersInput = document.querySelector("#numbers");
const lowercaseInput = document.querySelector("#lowercase");
const uppercaseInput = document.querySelector("#uppercase");
const symbolsInput = document.querySelector("#symbols");

lengthInput.value = 4;
lengthRange.value = 4;

function createPassword(event) {
  event.preventDefault();
  validator();

  const password = [];
  const passwordLength = Number(lengthInput.value);
  const charSets = [];

  if (numbersInput.checked) charSets.push(num);
  if (lowercaseInput.checked) charSets.push(eng.toLowerCase());
  if (uppercaseInput.checked) charSets.push(eng);
  if (symbolsInput.checked) charSets.push(symbol);

  if (charSets.length === 0) {
    alert("비밀번호를 생성할 문자를 선택해주세요.");
    return;
  }

  for (let i = 0; i < passwordLength; i++) {
    const randomOrder = Math.floor(Math.random() * charSets.length);
    const charSet = charSets[randomOrder];
    password.push(randomPassword(charSet));
  }

  copyInput.value = password.join("");
}

function randomPassword(string) {
  const randomIndex = Math.floor(Math.random() * string.length);
  const password = string[randomIndex];
  return password;
}

function rangeValue(target) {
  if (target === "input") {
    lengthRange.value = lengthInput.value;
  } else {
    lengthInput.value = lengthRange.value;
  }
}

function copyPassword() {
  if (copyInput.value) {
    navigator.clipboard.writeText(copyInput.value);
    alert("복사되었습니다.");
  } else {
    alert("비밀번호를 생성해주세요");
  }
}

function validator() {
  if (lengthInput.value > 50) {
    alert("최대 50글자 입니다.");
    lengthInput.value = 50;
  }
  if (lengthInput.value < 4) {
    alert("최소 4글자 입니다.");
    lengthInput.value = 4;
  }
}

lengthInput.addEventListener("input", () => {
  rangeValue("input");
  validator();
});
lengthRange.addEventListener("input", () => {
  rangeValue("range");
  validator();
});

const createButton = document.querySelector(".create_button");
createButton.addEventListener("click", (event) => createPassword(event));

const copyButton = document.querySelector(".copy_button");
copyButton.addEventListener("click", copyPassword);
