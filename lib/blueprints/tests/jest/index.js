'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adapter = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _print = require('../../../utilities/print');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jestPackageConfig = {
  modulePathIgnorePatterns: ['/lib/', '/node_modules/'],
  persistModuleRegistryBetweenSpecs: true,
  preprocessorIgnorePatterns: ['/node_modules/'],
  rootDir: '',
  scriptPreprocessor: 'resources/jest/preprocessor.js',
  setupEnvScriptFile: 'resources/jest/environment.js',
  testPathDirs: ['<rootDir>/src'],
  unmockedModulePathPatterns: ['<rootDir>/node_modules/fbjs', '<rootDir>/node_modules/react', '<rootDir>/node_modules/react-dom', '<rootDir>/node_modules/react-addons-test-utils', '<rootDir>/node_modules/core-js']
};

var packages = ['jest-cli', 'object-assign', 'babel-plugin-webpack-loaders', 'babel-polyfill', 'babel-core', 'react-addons-test-utils'];

var jestScripts = {
  test: 'BABEL_DISABLE_CACHE=1 jest',
  'test:clean': 'rm -rf node_modules/jest-cli/.haste_cache && jest'
};

var jestFilePath = _path2.default.resolve(__dirname, 'resources');

var adapter = exports.adapter = {
  message: 'Adding `jest` as a test framework into the project',
  updatePackageInfo: function updatePackageInfo(pkg) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return pkg.addInfo('jest', jestPackageConfig);

            case 2:
              _context.next = 4;
              return pkg.addScripts(jestScripts);

            case 4:

              (0, _print.print)('Installing `node_modules` for `jest`...');
              _context.next = 7;
              return pkg.install(packages);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  addFiles: function addFiles(projectDirectoryPath) {
    return new Promise(function (resolve, reject) {
      var targetDir = _path2.default.resolve(projectDirectoryPath, 'resources');

      (0, _fsExtra.copy)(jestFilePath, targetDir, function (error) {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
};