/*!
 * get-form-data v3.0.0 - https://github.com/insin/get-form-data
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["getFormData"] = factory();
	else
		root["getFormData"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getFormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFieldData", function() { return getFieldData; });
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var NODE_LIST_CLASSES = {
  '[object HTMLCollection]': true,
  '[object NodeList]': true,
  '[object RadioNodeList]': true
}; // .type values for elements which can appear in .elements and should be ignored

var IGNORED_ELEMENT_TYPES = {
  'button': true,
  'fieldset': true,
  'reset': true,
  'submit': true
};
var CHECKED_INPUT_TYPES = {
  'checkbox': true,
  'radio': true
};
var TRIM_RE = /^\s+|\s+$/g;
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;
/**
 * @param {HTMLFormElement} form
 * @param {Object} [options]
 * @return {Object.<string,boolean|string|string[]>} an object containing
 *   submittable value(s) held in the form's .elements collection, with
 *   properties named as per element names or ids.
 */

function getFormData(form, options) {
  if (!form) {
    throw new Error("A form is required by getFormData, was given form=" + form);
  }

  options = _extends({
    includeDisabled: false,
    trim: false
  }, options);
  var data = {};
  var elementName;
  var elementNames = [];
  var elementNameLookup = {}; // Get unique submittable element names for the form

  for (var i = 0, l = form.elements.length; i < l; i++) {
    var element = form.elements[i];

    if (IGNORED_ELEMENT_TYPES[element.type] || element.disabled && !options.includeDisabled) {
      continue;
    }

    elementName = element.name || element.id;

    if (elementName && !elementNameLookup[elementName]) {
      elementNames.push(elementName);
      elementNameLookup[elementName] = true;
    }
  } // Extract element data name-by-name for consistent handling of special cases
  // around elements which contain multiple inputs.


  for (var _i = 0, _l = elementNames.length; _i < _l; _i++) {
    elementName = elementNames[_i];
    var value = getFieldData(form, elementName, options);

    if (value != null) {
      data[elementName] = value;
    }
  }

  return data;
}
/**
 * @param {HTMLFormElement} form
 * @param {string} fieldName
 * @param {Object} [options]
 * @return {?(boolean|string|string[]|File|File[])} submittable value(s) in the
 *   form for a  named element from its .elements collection, or null if there
 *   was no element with that name, or the element had no submittable value(s).
 */

function getFieldData(form, fieldName, options) {
  if (!form) {
    throw new Error("A form is required by getFieldData, was given form=" + form);
  }

  if (!fieldName && toString.call(fieldName) !== '[object String]') {
    throw new Error("A field name is required by getFieldData, was given fieldName=" + fieldName);
  }

  options = _extends({
    includeDisabled: false,
    trim: false
  }, options);
  var element = form.elements[fieldName];

  if (!element || element.disabled && !options.includeDisabled) {
    return null;
  }

  if (!NODE_LIST_CLASSES[toString.call(element)]) {
    return getFormElementValue(element, options.trim);
  } // Deal with multiple form controls which have the same name


  var data = [];
  var allRadios = true;

  for (var i = 0, l = element.length; i < l; i++) {
    if (element[i].disabled && !options.includeDisabled) {
      continue;
    }

    if (allRadios && element[i].type !== 'radio') {
      allRadios = false;
    }

    var value = getFormElementValue(element[i], options.trim);

    if (value != null) {
      data = data.concat(value);
    }
  } // Special case for an element with multiple same-named inputs which were all
  // radio buttons: if there was a selected value, only return the value.


  if (allRadios && data.length === 1) {
    return data[0];
  }

  return data.length > 0 ? data : null;
}
/**
 * @param {HTMLElement} element a form element.
 * @param {boolean} [trim] should values for text entry inputs be trimmed?
 * @return {?(boolean|string|string[]|File|File[])} the element's submittable
 *   value(s), or null if it had none.
 */

function getFormElementValue(element, trim) {
  var value = null;
  var type = element.type;

  if (type === 'select-one') {
    if (element.options.length) {
      value = element.options[element.selectedIndex].value;
    }

    return value;
  }

  if (type === 'select-multiple') {
    value = [];

    for (var i = 0, l = element.options.length; i < l; i++) {
      if (element.options[i].selected) {
        value.push(element.options[i].value);
      }
    }

    if (value.length === 0) {
      value = null;
    }

    return value;
  } // If a file input doesn't have a files attribute, fall through to using its
  // value attribute.


  if (type === 'file' && 'files' in element) {
    if (element.multiple) {
      value = slice.call(element.files);

      if (value.length === 0) {
        value = null;
      }
    } else {
      // Should be null if not present, according to the spec
      value = element.files[0];
    }

    return value;
  }

  if (!CHECKED_INPUT_TYPES[type]) {
    value = trim ? element.value.replace(TRIM_RE, '') : element.value;
  } else if (element.checked) {
    if (type === 'checkbox' && !element.hasAttribute('value')) {
      value = true;
    } else {
      value = element.value;
    }
  }

  return value;
} // For UMD build access to getFieldData


getFormData.getFieldData = getFieldData;

/***/ })
/******/ ])["default"];
});