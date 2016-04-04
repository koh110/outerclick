/*
 * outerclick 1.0.1
 * outside click event of the element
 * This software is released under the MIT License
 * http://opensource.org/licenses/mit-license.php
 *
 * Copyright (C) 2015 koh110, https://github.com/koh110/outerclick.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["outerclick"] = factory();
	else
		root["outerclick"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var isClosest = function isClosest(target, selector) {
	  var isExist = false;
	  while (target && target !== document) {
	    var match = target.matches(selector);
	    if (match) {
	      isExist = true;
	      break;
	    }
	    target = target.parentNode;
	  }
	  return isExist;
	};
	
	exports.addListener = function (selector, listener) {
	  document.addEventListener('click', function (e) {
	    var outerClicked = !isClosest(e.target, selector);
	    if (outerClicked) {
	      listener(e);
	    }
	  });
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=outerclick.js.map