'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var reactFnTemplate = exports.reactFnTemplate = function reactFnTemplate(options) {
  var folder = options.folder,
      component = options.component,
      stateless = options.stateless,
      typescript = options.typescript;

  var imports = ["import React from 'react';"];

  if (stateless) {
    imports.push('import \'./' + (folder ? 'index' : component) + '.css\';');
  }

  var ins = [];
  if (typescript) {
    ins.push.apply(ins, ['', 'interface IProps {}']);
  }
  var componentTemplate = void 0;
  var tempDom = '<div class="' + component + '-block">\n      <div class="' + component + '-block__header">\n        <h2 class="' + component + '-block__title"></h2>\n      </div>\n      <div class="' + component + '-block__content">\n        <img class="' + component + '-block__img" src="" />\n      </div>\n    </div>';
  if (typescript) {
    componentTemplate = 'const ' + component + ': React.FC<IProps> = (props: IProps) => {\n      return (\n        ' + tempDom + '\n      )\n    };';
  } else {
    componentTemplate = 'const ' + component + ' = () => {\n      return (\n        ' + tempDom + '\n      )\n    };';
  }
  var template = [].concat(imports, ins, ['', componentTemplate, '', 'export default ' + component + ';']);
  return template.join('\n');
};