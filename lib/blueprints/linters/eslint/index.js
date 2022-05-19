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

var eslintScripts = {
  lint: 'eslint src'
};

var packages = ['babel-eslint', 'eslint', 'eslint-plugin-react', 'fbjs-scripts'];

var eslintFilePath = _path2.default.resolve(__dirname, '.eslintrc');

var adapter = exports.adapter = {
  message: 'Adding `eslint` as a linter into the project',
  updatePackageInfo: function updatePackageInfo(pkg) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return pkg.addScripts(eslintScripts);

            case 2:

              (0, _print.print)('Installing `node_modules` for `eslint`...');
              _context.next = 5;
              return pkg.install(packages);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  addFiles: function addFiles(projectDirectoryPath) {
    return new Promise(function (resolve, reject) {
      var targetFilePath = _path2.default.resolve(projectDirectoryPath, '.eslintrc');

      (0, _fsExtra.copy)(eslintFilePath, targetFilePath, function (error) {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
};