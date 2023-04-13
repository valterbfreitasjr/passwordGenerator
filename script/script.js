const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityIndicatorBarEl = document.querySelector("#sec-indicator-bar");

let passwordLength = 16;

function generatePassword() {
  let chars = "abcdefghjkmnpqrstuvwxyz";

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numberChars = "123456789";
  const symbolChars = "?!@&*()[]";

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars;
  }

  if (numberCheckEl.checked) {
    chars += numberChars;
  }

  if (symbolCheckEl.checked) {
    chars += symbolChars;
  }

  let password = "";

  //Math.random, irá gerar um valor aleatório entre 0(inclusivo) e 1(exclusivo)
  //Math.floor, irá retornar o menor número inteiro, após o 'Math.random() * chars.length', sendo chars.length (65).
  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputEl.value = password;
  calculateQuality();
}

function calculateQuality() {
  const percent = Math.round(
    (passwordLength / 64) * 100 * 0.7 + //ex: pwlength = 64 (64/64) * 100 = 100 * 0.7 = 70( 70% é o peso de conter apenas letras, isso com 64 caracteres.)
      ((upperCaseCheckEl.checked ? 5 : 0) + // 5% é o peso por connter caracteres Maiúsculos
        (numberCheckEl.checked ? 10 : 0) + // 10% é o peso por conter números
        (symbolCheckEl.checked ? 15 : 0)) // 15% é o peso por conter símbolos especiais.
  );

  securityIndicatorBarEl.style.width = `${percent}%`;

  if (percent >= 75) {
    //safe
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.remove("critical");
    securityIndicatorBarEl.classList.add("safe");
  } else if (percent >= 40) {
    //warning
    securityIndicatorBarEl.classList.remove("safe");
    securityIndicatorBarEl.classList.remove("critical");
    securityIndicatorBarEl.classList.add("warning");
  } else {
    //critical
    securityIndicatorBarEl.classList.remove("safe");
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.add("critical");
  }

  if (percent === 100) {
    securityIndicatorBarEl.classList.add("completed");
  } else {
    securityIndicatorBarEl.classList.remove("completed");
  }
}

function calcFontSize() {
  if (passwordLength > 45) {
    inputEl.classList.remove("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.add("font-xxs");
  } else if (passwordLength > 32) {
    inputEl.classList.remove("font-xxs");
    inputEl.classList.remove("font-sm");
    inputEl.classList.add("font-xs");
  } else if (passwordLength > 22) {
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
    inputEl.classList.add("font-sm");
  } else {
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
    inputEl.classList.remove("font-sm");
  }
}

function copyPassword() {
  //Irá copiar o valor do 'inputEl'
  navigator.clipboard.writeText(inputEl.value);
}

const copyPasswordButtonEl = document.querySelector(
  ".copyPasswordButton, #copy"
);
copyPasswordButtonEl.addEventListener("click", copyPassword);

const renewPassword = document.querySelector("#renew");
renewPassword.addEventListener("click", function () {
  generatePassword();
});

const passwordLengthText = document.querySelector("#password-length-text");

const password_lengthEl = document.querySelector("#password-length");
password_lengthEl.addEventListener("input", function () {
  passwordLength = password_lengthEl.value;
  passwordLengthText.innerHTML = passwordLength;
  generatePassword();
  calcFontSize();
});

upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

generatePassword();
