'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var reactStatelessTemplate = exports.reactStatelessTemplate = function reactStatelessTemplate(componentName, includeStyles) {
  var imports = ["import React from 'react';"];

  if (includeStyles) {
    imports.push('import styles from \'./' + componentName + '.css\';');
  }

  var componentTemplate = 'const ' + componentName + ' = () => (\n\n);';

  var template = [].concat(imports, ['', componentTemplate, '', 'export default ' + componentName + ';']);

  return template.join('\n');
};