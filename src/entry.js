'use strict';

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      const matches = (this.document || this.ownerDocument).querySelectorAll(s);
      let i = matches.length;
      while (--i >= 0 && matches.item(i) !== this);
      return i > -1;
    };
}

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
