import { TRANSLATE_URL } from '../constants/constants';
import { errorShow } from '../helpers/helperDOM';

export const translateWord = async (word) => {
  let myStatus;

  try {
    const response = await fetch(`${TRANSLATE_URL}&text=${word}`);
    myStatus = response.status;
    const {
      text: [wordTranslation],
    } = await response.json();
    return wordTranslation;
  } catch (error) {
    errorShow(myStatus);
  }
};
