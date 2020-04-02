/* eslint-env browser */

const TEXTAREA = document.createElement('textarea');
TEXTAREA.classList.add('textarea');
const KEYBOARD = document.createElement('div');
KEYBOARD.classList.add('keyboard');
const OSText = 'Клавиатура создана в операционной системе Windows 10 ';
const switchKeyboard = 'Чтобы переключить язык нажмите левые Control + Alt';
const BODY = document.body;
localStorage.currentLang = localStorage.currentLang || 'eng';
let { currentLang } = localStorage;

const keyboardEng = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift'],
  ['Control', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Control'],
];

const keyboardEngShift = [
  ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift'],
  ['Control', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Control'],
];
const keyboardRu = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift'],
  ['Control', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Control'],
];
const keyboardRuShift = [
  ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Delete'],
  ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
  ['Shift', 'Я', 'Ч', 'С', 'Ь', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift'],
  ['Control', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Control'],
];
const renderTextarea = () => {
  BODY.appendChild(TEXTAREA);
};
const renderText = () => {
  const text = document.createElement('div');
  text.classList.add('text');
  text.innerText += OSText;
  text.innerText += switchKeyboard;
  BODY.appendChild(text);
};
const renderKeyboard = (lang, shift = false) => {
  KEYBOARD.innerHTML = '';
  let keyboardTypeFlat;
  if (lang === 'eng' && shift === true) keyboardTypeFlat = keyboardEngShift.flat();
  if (lang === 'ru' && shift === true) keyboardTypeFlat = keyboardRuShift.flat();
  if (lang === 'eng' && shift === false) keyboardTypeFlat = keyboardEng.flat();
  if (lang === 'ru' && shift === false) keyboardTypeFlat = keyboardRuShift.flat();

  keyboardTypeFlat.forEach((e) => {
    const key = document.createElement('div');
    key.classList.add('key');
    key.innerText = e;
    if (e === ' ') {
      key.classList.add('Whitespace');
    }
    if (e === 'Backspace' || e === 'CapsLock' || e === 'Enter' || e === 'Shift') {
      key.classList.add(e);
    }
    KEYBOARD.appendChild(key);
  });
};

const keydownHandler = ({ key }) => {
  KEYBOARD.querySelectorAll('.key').forEach((e) => {
    if (key === e.innerText) {
      e.classList.add('active');
    }
  });
  if (key === 'Shift') {
    if (currentLang === 'eng') {
      renderKeyboard('eng', true);
    } else {
      renderKeyboard('ru', true);
    }
  }
};

const keyupHandler = ({ key }) => {
  KEYBOARD.querySelectorAll('.key').forEach((e) => {
    if (key === e.innerText) {
      e.classList.remove('active');
    }
  });
  if (key === 'Shift') {
    if (currentLang === 'eng') {
      renderKeyboard('eng');
    } else {
      renderKeyboard('ru');
    }
  }
};

const mousedownHandler = ({ target }) => {
  KEYBOARD.querySelectorAll('.key').forEach((e) => {
    if (target.innerText === e.innerText) {
      e.classList.add('active');
    }
  });
};

const mouseupHandler = ({ target }) => {
  KEYBOARD.querySelectorAll('.key').forEach((e) => {
    if (e.classList.contains('active')) {
      e.classList.remove('active');
    }
  });
};

document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);
document.addEventListener('mouseup', mouseupHandler);
KEYBOARD.addEventListener('mousedown', mousedownHandler);

renderTextarea();
BODY.appendChild(KEYBOARD);
renderKeyboard(currentLang);

renderText();
