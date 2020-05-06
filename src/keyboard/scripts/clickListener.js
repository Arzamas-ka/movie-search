import renderKeyboard from './keyboardRender';
import { stateButtons } from '../constants/stateButtons';
import { valueButtons } from '../constants/valueButtons';
import { findElement } from '../../helpers/helperDOM';
import { inputAdditionalAction } from '../../actions/inputAdditionalAction';

const clickListenerKeyboard = () => {
  const searchInput = document.querySelector('.search__input');
  const keyboard = document.querySelector('.keyboard');

  let language =
    localStorage.getItem('keyboardLanguage') || valueButtons.englishLang;

  const functionalButtonsHandler = (event) => {
    if (!event.target.classList.contains('key-button')) return;

    let button = keyboard.querySelector(
      `[data-letter='${
        event.target.innerHTML === valueButtons.ampersandSymbol
          ? valueButtons.ampersand
          : event.target.innerHTML
      }']`
    );

    setTimeout(() => {
      event.target.classList.toggle('key-button--active');

      if (button.innerText === valueButtons.langButton) {
        language =
          language === valueButtons.englishLang
            ? valueButtons.russianLang
            : valueButtons.englishLang;
        localStorage.setItem('keyboardLanguage', `${language}`);
        renderKeyboard();

        inputAdditionalAction();
        const keyboardElem = findElement('.keyboard');
        keyboardElem.classList.add('keyboard--show');

        return;
      }

      if (button.innerText === valueButtons.capsLockButton) {
        stateButtons.isCapsLockActive = !stateButtons.isCapsLockActive;
        renderKeyboard();

        inputAdditionalAction();
        const keyboardElem = findElement('.keyboard');
        keyboardElem.classList.add('keyboard--show');

        return;
      }
    }, 200);

    event.target.classList.toggle('key-button--active');

    const functionalButtons = [
      valueButtons.langButton,
      valueButtons.capsLockButton,
      valueButtons.altButton,
      valueButtons.ctrlButton,
    ];
    if (functionalButtons.includes(button.innerText)) return;

    if (button.innerText === valueButtons.shiftButton) {
      stateButtons.isShiftActive = !stateButtons.isShiftActive;
      return;
    }

    if (button.innerText === valueButtons.spaceButton) {
      searchInput.value += valueButtons.emptyString;
      return;
    }

    if (button.innerText === valueButtons.enterButton) {
      searchInput.value += valueButtons.enterSymbol;
      findElement('.search__btn').click();
      return;
    }

    if (button.innerText === valueButtons.tabButton) {
      searchInput.value += valueButtons.tabSymbol;
      searchInput.focus();
      return;
    }

    if (
      button.innerText === valueButtons.backspaceButton ||
      searchInput.value === valueButtons.backspaceButton
    ) {
      if (searchInput.value.length < 0) return;
      for (let i = 0; i < searchInput.value.length; i++) {
        searchInput.value = searchInput.value.slice(
          i,
          searchInput.value.length - 1
        );
        return;
      }
      return;
    }

    searchInput.value += button.innerText;
  };

  if (keyboard) {
    keyboard.removeEventListener('click', functionalButtonsHandler);
    keyboard.addEventListener('click', functionalButtonsHandler);
  }
};

export default clickListenerKeyboard;
