"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var exportHelperTemplate = exports.exportHelperTemplate = function exportHelperTemplate(componentName) {
  return "import " + componentName + " from './" + componentName + "';\nexport default " + componentName + ";\n";
};