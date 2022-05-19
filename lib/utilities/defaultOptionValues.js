"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultOptionValues = exports.defaultOptionValues = function defaultOptionValues(defaultValues) {
  return function (option) {
    return option.value !== true ? option.value : defaultValues[option.name];
  };
};