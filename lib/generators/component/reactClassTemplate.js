'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var reactClassTemplate = exports.reactClassTemplate = function reactClassTemplate(componentName, includeStyles) {
  var imports = ['import React from \'react\';'];

  if (includeStyles) {
    imports.push('import styles from \'./' + componentName + '.css\';');
  }

  var componentTemplate = 'export default class ' + componentName + ' extends React.Component {\n  render() {\n    return (\n\n    );\n  }\n}';

  var template = [].concat(imports, ['', componentTemplate, '']);

  return template.join('\n');
};