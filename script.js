/* eslint-env browser */

const TEXTAREA = document.createElement('textarea');
TEXTAREA.classList.add('textarea');
const KEYBOARD = document.createElement('div');
KEYBOARD.classList.add('keyboard');
const OSText = 'Клавиатура создана в операционной системе Windows 10 ';
const switchKeyboard = 'Чтобы переключить язык нажмите LCtrl + LAlt';
const BODY = document.body;
localStorage.currentLang = localStorage.currentLang || 'eng';
let shift = false;
let capslock = false;
let alt = false;
let ctrl = false;

const keyboardEng = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['LShift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'RShift'],
  ['LCtrl', 'Win', 'LAlt', ' ', 'RAlt', '←', '↓', '→', 'RCtrl'],
];

const keyboardEngShift = [
  ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
  ['LShift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'RShift'],
  ['LCtrl', 'Win', 'LAlt', ' ', 'RAlt', '←', '↓', '→', 'RCtrl'],
];
const keyboardRu = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['LShift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'RShift'],
  ['LCtrl', 'Win', 'LAlt', ' ', 'RAlt', '←', '↓', '→', 'RCtrl'],
];
const keyboardRuShift = [
  ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Delete'],
  ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
  ['LShift', 'Я', 'Ч', 'С', 'Ь', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'RShift'],
  ['LCtrl', 'Win', 'LAlt', ' ', 'RAlt', '←', '↓', '→', 'RCtrl'],
];
const keyWhichProps = [
  ['192', '49', '50', '51', '52', '53', '54', '55', '56', '57', '48', '189', '187', '8'],
  ['9', '81', '87', '69', '82', '84', '89', '85', '73', '79', '80', '219', '221', '191', '46'],
  ['20', '65', '83', '68', '70', '71', '72', '74', '75', '76', '186', '222', '13'],
  ['16', '90', '88', '67', '86', '66', '78', '77', '188', '190', '191', '38', '16'],
  ['17', '91', '18', '32', '18', '37', '40', '39', '17'],
];

const renderTextareaAndKeyboard = () => {
  BODY.appendChild(TEXTAREA);
  BODY.appendChild(KEYBOARD);
};
const renderText = () => {
  const text = document.createElement('div');
  text.classList.add('text');
  text.innerHTML += OSText;
  text.innerHTML += switchKeyboard;
  BODY.appendChild(text);
};
const renderKeyboard = (lang, shiftKey = false, capslockKey = false) => {
  let keyboardTypeFlat;
  if (lang === 'eng' && shiftKey && !capslockKey) keyboardTypeFlat = keyboardEngShift.flat();
  if (lang === 'ru' && shiftKey && !capslockKey) keyboardTypeFlat = keyboardRuShift.flat();
  if (lang === 'eng' && !shiftKey && !capslockKey) keyboardTypeFlat = keyboardEng.flat();
  if (lang === 'ru' && !shiftKey && !capslockKey) keyboardTypeFlat = keyboardRu.flat();
  if (lang === 'eng' && !shiftKey && capslockKey) keyboardTypeFlat = keyboardEng.flat().map((e) => (e.length === 1 ? e.toUpperCase() : e));
  if (lang === 'ru' && !shiftKey && capslockKey) keyboardTypeFlat = keyboardRu.flat().map((e) => (e.length === 1 ? e.toUpperCase() : e));
  if (lang === 'eng' && shiftKey && capslockKey) keyboardTypeFlat = keyboardEngShift.flat().map((e) => (e.length === 1 ? e.toLowerCase() : e));
  if (lang === 'ru' && shiftKey && capslockKey) keyboardTypeFlat = keyboardRuShift.flat().map((e) => (e.length === 1 ? e.toLowerCase() : e));

  if (!KEYBOARD.innerHTML) {
    const keyWhichPropsFlat = keyWhichProps.flat();
    keyboardTypeFlat.forEach((e, i) => {
      const key = document.createElement('div');
      key.classList.add('key');
      key.classList.add(keyWhichPropsFlat[i]);
      key.innerHTML = e;
      if (e.length > 1) {
        key.classList.add(e);
      }
      if (e === ' ') {
        key.classList.add('Whitespace');
      }

      if (e === '←') {
        key.classList.add('ArrowLeft');
      }
      if (e === '↓') {
        key.classList.add('ArrowDown');
      }
      if (e === '→') {
        key.classList.add('ArrowRight');
      }
      if (e === '↑') {
        key.classList.add('ArrowUp');
      }

      if (e === 'LShift') {
        key.classList.add('ShiftLeft');
      }
      if (e === 'RShift') {
        key.classList.add('ShiftRight');
      }
      if (e === 'LCtrl') {
        key.classList.add('ControlLeft');
      }
      if (e === 'RCtrl') {
        key.classList.add('ControlRight');
      }
      if (e === 'LAlt') {
        key.classList.add('AltLeft');
      }
      if (e === 'RAlt') {
        key.classList.add('AltRight');
      }

      KEYBOARD.appendChild(key);
    });
  } else {
    KEYBOARD.childNodes.forEach((e, i) => {
      e.innerHTML = keyboardTypeFlat[i];
    });
  }
};

const keydownHandler = (event) => {
  event.preventDefault();
  const { key, code, which } = event;
  let { selectionStart, selectionEnd } = TEXTAREA;
  if (key === 'Shift') {
    shift = true;
    renderKeyboard(localStorage.currentLang, shift, capslock);
  }
  if (key === 'CapsLock') {
    capslock = !capslock;
    renderKeyboard(localStorage.currentLang, shift, capslock);
    KEYBOARD.getElementsByClassName(key)[0].classList.toggle('active');
  }
  if (key === 'Alt') {
    alt = true;
  }
  if (key === 'Control') {
    ctrl = true;
  }
  if (key !== 'CapsLock' && key.length === 1) {
    KEYBOARD.getElementsByClassName(which)[0].classList.add('active');
    // return;
  }

  console.log(KEYBOARD.getElementsByClassName(code)[0], code);

  if (code === 'ShiftLeft') {
    KEYBOARD.getElementsByClassName(code)[0].classList.add('active');
  }
  if (code === 'ShiftRight') {
    KEYBOARD.getElementsByClassName(code)[0].classList.add('active');
  }
  if (code === 'ControlLeft') {
    KEYBOARD.getElementsByClassName(code)[0].classList.add('active');
  }
  if (code === 'ControlRight') {
    KEYBOARD.getElementsByClassName(code)[0].classList.add('active');
  }
  if (code === 'AltLeft') {
    KEYBOARD.getElementsByClassName(code)[0].classList.add('active');
  }
  if (code === 'AltRight') {
    KEYBOARD.getElementsByClassName(code)[0].classList.add('active');
  }
};

const keyupHandler = (event) => {
  event.preventDefault();
  const { key, code, which } = event;
  if (key === 'Shift') {
    shift = false;
    if (localStorage.currentLang === 'eng') {
      renderKeyboard('eng', shift, capslock);
    } else {
      renderKeyboard('ru', shift, capslock);
    }
  }
  // if (key === 'Alt' && !ctrl) {
  //   alt = false;
  // }
  // if (key === 'Control' && !alt) {
  //   ctrl = false;
  // }
  if (ctrl && alt) {
    if (localStorage.currentLang === 'eng') {
      localStorage.currentLang = 'ru';
      renderKeyboard(localStorage.currentLang, shift, capslock);
    } else {
      localStorage.currentLang = 'eng';
      renderKeyboard(localStorage.currentLang, shift, capslock);
    }
    ctrl = false;
    alt = false;
  }
  if (key === 'Alt') {
    alt = false;
  }
  if (key === 'Control') {
    ctrl = false;
  }
  if (key !== 'CapsLock') KEYBOARD.getElementsByClassName(which)[0].classList.remove('active');

  if (code === 'ShiftLeft') {
    KEYBOARD.getElementsByClassName(code)[0].classList.remove('active');
  }
  if (code === 'ShiftRight') {
    KEYBOARD.getElementsByClassName(code)[0].classList.remove('active');
  }
  if (code === 'ControlLeft') {
    KEYBOARD.getElementsByClassName(code)[0].classList.remove('active');
  }
  if (code === 'ControlRight') {
    KEYBOARD.getElementsByClassName(code)[0].classList.remove('active');
  }
  if (code === 'AltLeft') {
    KEYBOARD.getElementsByClassName(code)[0].classList.remove('active');
  }
  if (code === 'AltRight') {
    KEYBOARD.getElementsByClassName(code)[0].classList.remove('active');
  }
};

const mousedownHandler = (event) => {
  event.preventDefault();
  const { target } = event;
  let { selectionStart, selectionEnd } = TEXTAREA;
  if (target.innerHTML === 'RShift' || target.innerHTML === 'LShift') {
    shift = true;
    renderKeyboard(localStorage.currentLang, shift, capslock);
    // return;
  }
  if (target.innerHTML === 'CapsLock') {
    capslock = !capslock;
    target.classList.toggle('active');
    renderKeyboard(localStorage.currentLang, shift, capslock);
  }
  if (target.innerHTML === 'LAlt' || target.innerHTML === 'RAlt') {
    alt = true;
  }
  if (target.innerHTML === 'LCtrl' || target.innerHTML === 'RCtrl') {
    ctrl = true;
  }

  if (target.classList.contains('key') && target.innerHTML.length === 1) {
    target.classList.add('active');

    TEXTAREA.value = TEXTAREA.value.substr(0, selectionStart) + target.innerHTML + TEXTAREA.value.substr(selectionStart);
    TEXTAREA.selectionStart = selectionStart + target.innerHTML.length;
    TEXTAREA.selectionEnd = selectionStart + target.innerHTML.length;
  }
};

const mouseupHandler = (event) => {
  const { target } = event;
  if (target.innerHTML === 'RShift' || target.innerHTML === 'LShift') {
    if (localStorage.currentLang === 'eng') {
      renderKeyboard('eng', shift, capslock);
    } else {
      renderKeyboard('ru', shift, capslock);
    }
  }
  if (target.innerHTML !== 'CapsLock') target.classList.remove('active');

  // KEYBOARD.querySelectorAll('.key').forEach((e) => {
  //   if (e.classList.contains('active')) {
  //     e.classList.remove('active');
  //   }
  // });
};

document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);
document.addEventListener('mouseup', mouseupHandler);
KEYBOARD.addEventListener('mousedown', mousedownHandler);

renderTextareaAndKeyboard();

renderKeyboard(localStorage.currentLang, shift, capslock);

renderText();
