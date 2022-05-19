'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentGenerator = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _jestTestTemplate = require('./jestTestTemplate');

var _reactClassTemplate = require('./reactClassTemplate');

var _reactFnTemplate = require('./reactFnTemplate');

var _print = require('../../utilities/print');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 创建文件夹组件
var createComponentFolder = function createComponentFolder(options) {
  return new Promise(function (resolve, reject) {
    var folder = options.folder,
        component = options.component,
        directory = options.directory,
        type = options.type,
        stateless = options.stateless,
        includeTest = options.includeTest,
        typescript = options.typescript;


    var distPath = _path2.default.resolve(process.cwd(), directory);
    var componentTestPath = _path2.default.resolve(distPath, '__tests__/' + component + '-test.' + (typescript ? 'tsx' : 'jsx'));
    var componentFolderPath = _path2.default.resolve(distPath, component);
    var stylePath = _path2.default.resolve(componentFolderPath, (folder ? 'index' : component) + '.css');
    var componentPath = _path2.default.resolve(componentFolderPath, (folder ? 'index' : component) + '.' + (typescript ? 'tsx' : 'jsx'));

    (0, _fsExtra.lstat)(componentFolderPath, function (error, stats) {
      if (!error && stats.isDirectory()) {
        (0, _print.printWarning)('A directory for the component ' + component + ' already exists at ' + componentFolderPath);
        reject(new Error());
        return;
      }

      if (type === 'class') {
        (0, _print.print)('创建一个类组件');
        (0, _fsExtra.outputFileSync)(componentPath, (0, _reactClassTemplate.reactClassTemplate)(component, stateless));
      } else if (type === 'fn') {
        (0, _print.print)('创建一个函数组件');
        (0, _fsExtra.outputFileSync)(componentPath, (0, _reactFnTemplate.reactFnTemplate)(options));
      } else {
        (0, _print.print)('创建一个类组件');
        (0, _fsExtra.outputFileSync)(componentPath, (0, _reactClassTemplate.reactClassTemplate)(component, stateless));
      }

      if (stateless) {
        (0, _print.print)('创建默认css文件');
        (0, _fsExtra.outputFileSync)(stylePath, '');
      }

      if (includeTest) {
        (0, _print.print)('创建测试文件');
        (0, _fsExtra.outputFileSync)(componentTestPath, (0, _jestTestTemplate.jestTestTemplate)(component));
      }

      resolve();
    });
  });
};

// 创建文件组件
var createComponentFile = function createComponentFile(options) {
  return new Promise(function (resolve, reject) {
    var component = options.component,
        directory = options.directory,
        type = options.type,
        stateless = options.stateless,
        includeTest = options.includeTest,
        typescript = options.typescript;


    var distPath = _path2.default.resolve(process.cwd(), directory);
    var componentFilePath = _path2.default.resolve(distPath, component + '.' + (typescript ? 'tsx' : 'jsx'));
    var stylePath = _path2.default.resolve(distPath, component + '.css');
    var componentTestPath = _path2.default.resolve(distPath, '__tests__/' + component + '-test.js');

    (0, _fsExtra.lstat)(componentFilePath, function (error, stats) {
      if (!error && stats.isFile()) {
        (0, _print.printWarning)('A file already exists for the component ' + component + ' at ' + componentFilePath);
        reject(new Error());
        return;
      }

      if (type === 'class') {
        (0, _print.print)('创建一个类组件');
        (0, _fsExtra.outputFileSync)(componentFilePath, (0, _reactClassTemplate.reactClassTemplate)(component, stateless));
      } else if (type === 'fn') {
        (0, _print.print)('创建一个函数组件');
        (0, _fsExtra.outputFileSync)(componentFilePath, (0, _reactFnTemplate.reactFnTemplate)(options));
      } else {
        (0, _print.print)('创建一个类组件');
        (0, _fsExtra.outputFileSync)(componentFilePath, (0, _reactClassTemplate.reactClassTemplate)(component, stateless));
      }

      if (stateless) {
        (0, _print.print)('创建默认css文件');
        (0, _fsExtra.outputFileSync)(stylePath, '');
      }

      if (includeTest) {
        (0, _print.print)('创建测试文件');
        (0, _fsExtra.outputFileSync)(componentTestPath, (0, _jestTestTemplate.jestTestTemplate)(component));
      }

      resolve();
    });
  });
};

var componentGenerator = exports.componentGenerator = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
    var folder;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            folder = options.folder;
            _context.prev = 1;

            if (!folder) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return createComponentFolder(options);

          case 5:
            _context.next = 9;
            break;

          case 7:
            _context.next = 9;
            return createComponentFile(options);

          case 9:

            (0, _print.print)('\u2705  \u751F\u6210 React \u7EC4\u4EF6: ' + options.component);
            _context.next = 14;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](1);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 12]]);
  }));

  return function componentGenerator(_x) {
    return _ref.apply(this, arguments);
  };
}();