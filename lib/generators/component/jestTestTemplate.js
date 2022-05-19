'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var jestTestTemplate = exports.jestTestTemplate = function jestTestTemplate(componentName) {
  var imports = ['import React from \'react\';', 'import ' + componentName + ' from \'../' + componentName + '\';'];

  var testTemplate = 'describe(\'' + componentName + '\', () => {\n  it(\'should work\', () => {\n    // ...\n  });\n});\n';

  var template = [].concat(imports, ['', testTemplate]);

  return template.join('\n');
};