import { EMPTY_STRING, STATE_FLEX, STATE_NONE } from '../constants/constants';

export const removeElement = (selector) => {
  const element = document.querySelector(selector);

  if (element) {
    element.remove();
  }
};

export const removeChildren = (selector) => {
  const element = document.querySelector(selector);

  if (element) {
    element.innerHTML = EMPTY_STRING;
  }
};

export const setToFlex = (selector) => {
  const element = document.querySelector(selector);

  if (element) {
    element.style.display = STATE_FLEX;
  }
};

export const hideElement = (selector) => {
  const element = document.querySelector(selector);

  if (element) {
    element.style.display = STATE_NONE;
  }
};

export const insertBefore = (what, beforeWhat) =>
  beforeWhat.insertAdjacentElement('beforebegin', what);

export const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
};

export const findElement = (selector) => {
  const element = document.querySelector(selector);

  if (element) {
    return element;
  }
};

export const spinnerShow = () => {
  const spinner = findElement('.search__spinner');
  spinner.style.display = 'block';
};

export const spinnerHide = () => {
  const spinner = findElement('.search__spinner');
  setTimeout(() => (spinner.style.display = 'none'), 1000);
};

export const errorShow = (responseStatus, erroMessage) => {
  const status = parseInt(responseStatus);
  const errorElem = findElement('.search__error');

  if (erroMessage) {
    errorElem.textContent = erroMessage;
    errorElem.style.opacity = '1';
    return errorElem.textContent;
  }

  if (status >= 400 && status < 451) {
    errorElem.textContent = 'Oops! Too Many Requests';
    errorElem.style.opacity = '1';
  }

  if (status >= 500 && status < 511) {
    errorElem.textContent = 'Server Error';
    errorElem.style.opacity = '1';
  }

  return errorElem.textContent;
};

export const errorHide = () => {
  const errorElem = findElement('.search__error');
  errorElem.style.opacity = '0';
};
