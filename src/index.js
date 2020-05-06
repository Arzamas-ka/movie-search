import renderKeyboard from '../src/keyboard/scripts/keyboardRender';
import { listenSearchChange } from '../src/keyboard/scripts/keyListener';
import { inputAdditionalAction } from './actions/inputAdditionalAction';
import { getFirstDataOfMovies } from './render/moviesRender';
import { inputSearchMovies } from './actions/inputSearchMovies';

import './style/index.scss';

getFirstDataOfMovies();
renderKeyboard();
inputAdditionalAction();

window.onload = () => {
  const searchInput = document.querySelector('.search__input');
  searchInput.focus();
  listenSearchChange();
};

inputSearchMovies();
