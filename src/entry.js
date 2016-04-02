'use strict';

const isClosest = (target, selector) => {
  let isExist = false;
  while (target && target !== document) {
    const match = target.matches(selector);
    if (match) {
      isExist = true;
      break;
    }
    target = target.parentNode;
  }
  return isExist;
};

exports.addListener = (selector, listener) => {
  document.addEventListener('click', (e) => {
    const outerClicked = !isClosest(e.target, selector);
    if (outerClicked) {
      listener(e);
    }
  });
};
