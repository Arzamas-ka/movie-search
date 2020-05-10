import renderKeyboard from './keyboardRender';
import dataKeyboard from '../constants/dataKeyboard';
import { stateButtons } from '../constants/stateButtons';
import { valueButtons } from '../constants/valueButtons';
import { findElement } from '../../helpers/helperDOM';
import { inputAdditionalAction } from '../../actions/inputAdditionalAction';

export const listenSearchChange = () => {
  const searchInput = document.querySelector('.search__input');
  searchInput.addEventListener('keypress', keypressHandler);
};

export const listenKeyboardKeys = () => {
  document.addEventListener('keyup', keyupHandler);
  document.addEventListener('keydown', keydownHandler);
};

export const removeKeyboardKeysListeners = () => {
  document.removeEventListener('keyup', keyupHandler);
  document.removeEventListener('keydown', keydownHandler);
};

export const keyupHandler = (event) => {
  if (
    event.code === valueButtons.capsLockButton &&
    !event.getModifierState(valueButtons.capsLockButton)
  ) {
    stateButtons.isCapsLockActive = false;
    renderKeyboard();

    inputAdditionalAction();
    const keyboardElem = findElement('.keyboard');
    keyboardElem.classList.add('keyboard--show');
  }

  if (event.code === valueButtons.capsLockButton) {
    const keyboard = document.querySelector('.keyboard');
    const button = keyboard.querySelector(`[data-letter='${event.code}']`);
    button.classList.toggle('key-button--active');
    setTimeout(() => {
      button.classList.toggle('key-button--active');
    }, 200);
  }
};

export const keydownHandler = (event) => {
  const functionalButtons = [
    valueButtons.controlLeftButton,
    valueButtons.controlRightButton,
    valueButtons.altLeftButton,
    valueButtons.altRightButton,
    valueButtons.shiftLeftButton,
    valueButtons.shiftRightButton,
  ];

  const searchInput = document.querySelector('.search__input');

  if (event.code === valueButtons.tabButton) {
    event.preventDefault();
    searchInput.value += valueButtons.tabSymbol;
  }

  if (
    event.code === valueButtons.capsLockButton &&
    event.getModifierState(valueButtons.capsLockButton)
  ) {
    stateButtons.isCapsLockActive = true;
    renderKeyboard();

    inputAdditionalAction();
    const keyboardElem = findElement('.keyboard');
    keyboardElem.classList.add('keyboard--show');
  }

  let language =
    localStorage.getItem('keyboardLanguage') || valueButtons.englishLang;

  if (
    (event.ctrlKey && event.code === valueButtons.shiftLeftButton) ||
    (event.ctrlKey && event.code === valueButtons.shiftRightButton)
  ) {
    language =
      language === valueButtons.englishLang
        ? valueButtons.russianLang
        : valueButtons.englishLang;
    localStorage.setItem('keyboardLanguage', `${language}`);
    renderKeyboard();

    inputAdditionalAction();
    const keyboardElem = findElement('.keyboard');
    keyboardElem.classList.add('keyboard--show');
  }

  if (event.key === valueButtons.metaButton) return;

  let button;
  const keyboard = document.querySelector('.keyboard');

  if (functionalButtons.includes(event.code)) {
    button = keyboard.querySelector(`#${event.code}`);
  } else {
    button = button = keyboard.querySelector(`[data-code="${event.code}"]`);
  }

  button.classList.toggle('key-button--active');

  setTimeout(() => {
    button.classList.toggle('key-button--active');
  }, 200);
};

export const keypressHandler = (event) => {
  if (!findElement('.keyboard--show')) {
    return;
  }

  const searchInput = document.querySelector('.search__input');
  event.preventDefault();

  let language =
    localStorage.getItem('keyboardLanguage') || valueButtons.englishLang;

  const languageLetters = dataKeyboard[language].flat();
  const enteredLetter = languageLetters.find(
    (value) => value.code === event.code
  );

  const enteredValue =
    enteredLetter.letter.length === 1
      ? enteredLetter.letter
      : valueButtons.emptyString;

  if (enteredLetter.letter === valueButtons.shiftButton) {
    stateButtons.isShiftActive = !stateButtons.isShiftActive;

    return;
  }

  if (enteredLetter.letter === valueButtons.enterButton) {
    findElement('.search__btn').click();
    return;
  }

  if (enteredLetter.letter === valueButtons.spaceButton) {
    searchInput.value += valueButtons.emptyString;
    return;
  }

  if (stateButtons.isCapsLockActive || event.shiftKey) {
    searchInput.value += enteredValue.toUpperCase();
    return;
  }

  searchInput.value = searchInput.value + enteredValue;
};
