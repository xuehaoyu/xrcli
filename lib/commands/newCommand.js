'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCommand = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _command = require('./command');

var _jest = require('../blueprints/tests/jest');

var _eslint = require('../blueprints/linters/eslint');

var _Package = require('../Package');

var _print = require('../utilities/print');

var _defaultOptionValues = require('../utilities/defaultOptionValues');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var blueprintPath = _path2.default.resolve(__dirname, '../blueprints', 'base');

var adapters = {
  eslint: _eslint.adapter,
  jest: _jest.adapter
};

var defaultOptionValue = (0, _defaultOptionValues.defaultOptionValues)({
  test: 'jest',
  linter: 'eslint'
});

/* eslint-disable max-len */
var newCommand = exports.newCommand = (0, _command.command)({
  name: 'new <appName>',
  options: [{
    value: '-t, --test [testFramework]',
    description: 'Choose a test framework to include in your build.'
  }, {
    value: '-l, --linter [linter]',
    description: 'Choose a linter to include in your build.'
  }],
  handler: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(appName, program) {
      var _program$parent, test, linter, distPath, options, packageFilePath, pkg, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, option, adapter;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _program$parent = program.parent, test = _program$parent.test, linter = _program$parent.linter;
              distPath = _path2.default.join(process.cwd(), appName);
              options = [{ name: 'test', value: test }, { name: 'linter', value: linter }].filter(function (option) {
                return option.value;
              }).map(defaultOptionValue);


              if (options.length === 0) {
                (0, _print.print)('Creating your project, `' + appName + '`');
              } else {
                (0, _print.print)('Creating your project, `' + appName + '`, with ' + (0, _print.printOptions)(options));
              }

              _context.prev = 4;

              (0, _print.print)('Moving the base project files over...');
              (0, _fsExtra.copySync)(blueprintPath, distPath);

              (0, _print.print)('Registering the project\'s `package.json` file');
              packageFilePath = _path2.default.resolve(distPath, 'package.json');
              _context.next = 11;
              return (0, _Package.buildPackage)(packageFilePath);

            case 11:
              pkg = _context.sent;
              _context.next = 14;
              return pkg.installAll();

            case 14:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 17;
              _iterator = options[Symbol.iterator]();

            case 19:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 30;
                break;
              }

              option = _step.value;
              adapter = adapters[option];


              (0, _print.print)(adapter.message);

              _context.next = 25;
              return adapter.updatePackageInfo(pkg);

            case 25:
              _context.next = 27;
              return adapter.addFiles(distPath);

            case 27:
              _iteratorNormalCompletion = true;
              _context.next = 19;
              break;

            case 30:
              _context.next = 36;
              break;

            case 32:
              _context.prev = 32;
              _context.t0 = _context['catch'](17);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 36:
              _context.prev = 36;
              _context.prev = 37;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 39:
              _context.prev = 39;

              if (!_didIteratorError) {
                _context.next = 42;
                break;
              }

              throw _iteratorError;

            case 42:
              return _context.finish(39);

            case 43:
              return _context.finish(36);

            case 44:

              (0, _print.print)('\u2705  All Done! Check out your project at ' + distPath + ' \uD83D\uDE80');
              _context.next = 50;
              break;

            case 47:
              _context.prev = 47;
              _context.t1 = _context['catch'](4);

              (0, _print.printError)(_context.t1);

            case 50:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[4, 47], [17, 32, 36, 44], [37,, 39, 43]]);
    }));

    return function handler(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});