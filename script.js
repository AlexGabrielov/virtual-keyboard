/* eslint-env browser */

const TEXTAREA = document.createElement('textarea');
TEXTAREA.classList.add('textarea');
const KEYBOARD = document.createElement('div');
KEYBOARD.classList.add('keyboard');
const OSText = 'Клавиатура создана в операционной системе Windows 10 ';
const switchKeyboard = 'Чтобы переключить язык нажмите левые Control + Alt';
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
const renderTextarea = () => {
  BODY.appendChild(TEXTAREA);
};
const renderText = () => {
  const text = document.createElement('div');
  text.classList.add('text');
  text.innerHTML += OSText;
  text.innerHTML += switchKeyboard;
  BODY.appendChild(text);
};
const renderKeyboard = (lang, keyboardCase = false) => {
  let keyboardTypeFlat;
  if (lang === 'eng' && keyboardCase) keyboardTypeFlat = keyboardEngShift.flat();
  if (lang === 'ru' && keyboardCase) keyboardTypeFlat = keyboardRuShift.flat();
  if (lang === 'eng' && !keyboardCase) keyboardTypeFlat = keyboardEng.flat();
  if (lang === 'ru' && !keyboardCase) keyboardTypeFlat = keyboardRu.flat();
  if (!KEYBOARD.innerHTML) {
    keyboardTypeFlat.forEach((e) => {
      const key = document.createElement('div');
      key.classList.add('key');
      key.innerHTML = e;
      if (e === ' ') {
        key.classList.add('Whitespace');
      }
      if (e.length > 1) {
        key.classList.add(e);
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
  const { key, code } = event;
  if (key === 'Shift' && !shift) {
    shift = true;
    if (localStorage.currentLang === 'eng') {
      renderKeyboard('eng', true);
    } else {
      renderKeyboard('ru', true);
    }
  }
  if (key === 'CapsLock' && !capslock) {
    capslock = !capslock;
    if (localStorage.currentLang === 'eng') {
      renderKeyboard('eng', capslock);
    } else {
      renderKeyboard('ru', capslock);
    }
  }
  if (key === 'Alt') {
    alt = true;
  }
  if (key === 'Control') {
    ctrl = true;
  }

  KEYBOARD.querySelectorAll('.key').forEach((e) => {
    if (key === e.innerHTML && key !== 'CapsLock') {
      e.classList.add('active');
    }
    if (key === 'CapsLock' && key === e.innerHTML) {
      e.classList.toggle('active');
    }

    if (key === 'ArrowLeft' && e.innerHTML === '←') {
      e.classList.add('active');
    }
    if (key === 'ArrowDown' && e.innerHTML === '↓') {
      e.classList.add('active');
    }
    if (key === 'ArrowRight' && e.innerHTML === '→') {
      e.classList.add('active');
    }
    if (key === 'ArrowUp' && e.innerHTML === '↑') {
      e.classList.add('active');
    }
    if (code === 'ShiftLeft' && e.innerHTML === 'LShift') {
      e.classList.add('active');
    }
    if (code === 'ShiftRight' && e.innerHTML === 'RShift') {
      e.classList.add('active');
    }
    if (code === 'ControlLeft' && e.innerHTML === 'LCtrl') {
      e.classList.add('active');
    }
    if (code === 'ControlRight' && e.innerHTML === 'RCtrl') {
      e.classList.add('active');
    }
    if (code === 'AltLeft' && e.innerHTML === 'LAlt') {
      e.classList.add('active');
    }
    if (code === 'AltRight' && e.innerHTML === 'RAlt') {
      e.classList.add('active');
    }
    if (code === 'MetaLeft' && e.innerHTML === 'Win') {
      e.classList.add('active');
    }
  });
};

const keyupHandler = (event) => {
  event.preventDefault();
  const { key, code } = event;
  if (key === 'Shift') {
    shift = false;
    if (localStorage.currentLang === 'eng') {
      renderKeyboard('eng');
    } else {
      renderKeyboard('ru');
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
      renderKeyboard(localStorage.currentLang, shift);
    } else {
      localStorage.currentLang = 'eng';
      renderKeyboard(localStorage.currentLang, shift);
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
  KEYBOARD.querySelectorAll('.key').forEach((e) => {
    if (key === e.innerHTML && key !== 'CapsLock') {
      e.classList.remove('active');
    }
    if (key === 'ArrowLeft' && e.innerHTML === '←') {
      e.classList.remove('active');
    }
    if (key === 'ArrowDown' && e.innerHTML === '↓') {
      e.classList.remove('active');
    }
    if (key === 'ArrowRight' && e.innerHTML === '→') {
      e.classList.remove('active');
    }
    if (key === 'ArrowUp' && e.innerHTML === '↑') {
      e.classList.remove('active');
    }
    if (code === 'ShiftLeft' && e.innerHTML === 'LShift') {
      e.classList.remove('active');
    }
    if (code === 'ShiftRight' && e.innerHTML === 'RShift') {
      e.classList.remove('active');
    }
    if (code === 'ControlLeft' && e.innerHTML === 'LCtrl') {
      e.classList.remove('active');
    }
    if (code === 'ControlRight' && e.innerHTML === 'RCtrl') {
      e.classList.remove('active');
    }
    if (code === 'AltLeft' && e.innerHTML === 'LAlt') {
      e.classList.remove('active');
    }
    if (code === 'AltRight' && e.innerHTML === 'RAlt') {
      e.classList.remove('active');
    }
    if (code === 'MetaLeft' && e.innerHTML === 'Win') {
      e.classList.remove('active');
    }
  });
  // if (key === 'CapsLock') {
  //   if (currentLang === 'eng') {
  //     renderKeyboard('eng', true);
  //   } else {
  //     renderKeyboard('ru', true);
  //   }
  // }
};

const mousedownHandler = (event) => {
  const { target } = event;
  if (target.innerHTML === 'Shift' && !shift) {
    shift = true;
    if (localStorage.currentLang === 'eng') {
      renderKeyboard('eng', true);
    } else {
      renderKeyboard('ru', true);
    }
  }
  KEYBOARD.querySelectorAll('.key').forEach((e) => {
    if (target.innerHTML === e.innerHTML) {
      e.classList.add('active');
    }
  });
};

const mouseupHandler = (event) => {
  const { target } = event;
  if (target.innerHTML === 'Shift') {
    if (localStorage.currentLang === 'eng') {
      renderKeyboard('eng');
    } else {
      renderKeyboard('ru');
    }
  }
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
renderKeyboard(localStorage.currentLang);

renderText();
