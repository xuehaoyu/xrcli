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
  var tempDomTitle = component.toLowerCase();
  var tempDom = '<div className="' + tempDomTitle + '-block">\n  <div className="' + tempDomTitle + '-block__header">\n    <h2 className="' + tempDomTitle + '-block__title"></h2>\n  </div>\n  <div className="' + tempDomTitle + '-block__content">\n    <img className="' + tempDomTitle + '-block__img" src="" />\n  </div>\n  </div>';
  var componentTemplate = void 0;
  if (typescript) {
    componentTemplate = 'const ' + component + ': React.FC<IProps> = (props: IProps) => {\n      return (\n        ' + tempDom + '\n      )\n    };';
  } else {
    componentTemplate = 'const ' + component + ' = () => {\n      return (\n        ' + tempDom + '\n      )\n    };';
  }
  var template = [].concat(imports, ins, ['', componentTemplate, '', 'export default ' + component + ';']);
  return template.join('\n');
};