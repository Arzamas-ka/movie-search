import { findElement } from '../helpers/helperDOM';
import { removeKeyboardKeysListeners } from '../keyboard/scripts/keyListener';
import { listenKeyboardKeys } from '../keyboard/scripts/keyListener';

export const inputAdditionalAction = () => {
  const keyboardIcon = findElement('.search__keyboard');
  const keyboardElem = findElement('.keyboard');
  const searchInput = findElement('.search__input');
  const keyboardCloseIcon = findElement('.keyboard__close');
  const clearIcon = findElement('.search__clear');
  const errorElem = findElement('.search__error');

  keyboardCloseIcon.addEventListener('click', () => {
    keyboardIcon.classList.remove('search__keyboard--active');
    keyboardElem.classList.remove('keyboard--show');

    removeKeyboardKeysListeners();
  });

  clearIcon.addEventListener('click', () => {
    searchInput.value = '';
    errorElem.style.opacity = '0';
  });

  keyboardIcon.addEventListener('click', () => {
    keyboardElem.classList.add('keyboard--show');
    keyboardIcon.classList.add('search__keyboard--active');
    searchInput.focus();
    listenKeyboardKeys();
  });
};
