'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generate = undefined;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _command = require('./command');

var _generators = require('../generators');

var _print = require('../utilities/print');

var _requiredOptions = require('../utilities/requiredOptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Component, Component Folder, test, class syntax, component syntax
// Route
// path option, default to src/components

var checkRequiredOptions = (0, _requiredOptions.requiredOptions)({
  component: true,
  directory: false,
  folder: true,
  stateless: true,
  includeTest: true
});

var generate = exports.generate = (0, _command.command)({
  name: 'generate <item>',
  options: [{
    value: '-d, --directory [directory]',
    description: '将放置组件的输出目录。',
    defaultValue: 'src/components'
  }, {
    value: '-c, --component [componentName]',
    description: '组件名'
  }, {
    value: '-f, --folder [folder]',
    description: '组件是否有它自己的文件夹'
  }, {
    value: '-s, --stateless [stateless]',
    description: 'Specify whether this is a stateless component or not.'
  }, {
    value: '-t, --type [type]',
    description: '组件类型,类组件或者函数组件',
    defaultValue: 'class'
  }, {
    value: '-ts, --typescript [typescript]',
    description: '是否创建ts模版'
  }, {
    value: '--include-test',
    description: 'Include a test when creating a component'
  }],
  handler: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item, program) {
      var _program$parent, component, directory, type, _program$parent$folde, folder, _program$parent$state, stateless, _program$parent$inclu, includeTest, _program$parent$types, typescript, options, generator;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _program$parent = program.parent, component = _program$parent.component, directory = _program$parent.directory, type = _program$parent.type, _program$parent$folde = _program$parent.folder, folder = _program$parent$folde === undefined ? false : _program$parent$folde, _program$parent$state = _program$parent.stateless, stateless = _program$parent$state === undefined ? false : _program$parent$state, _program$parent$inclu = _program$parent.includeTest, includeTest = _program$parent$inclu === undefined ? false : _program$parent$inclu, _program$parent$types = _program$parent.typescript, typescript = _program$parent$types === undefined ? false : _program$parent$types;
              options = {
                component: component,
                directory: directory,
                type: type,
                folder: folder,
                stateless: stateless,
                includeTest: includeTest,
                typescript: typescript
              };
              _context.prev = 2;

              (0, _invariant2.default)(item === 'component', 'Whoops! `generate` expects `component` right now.');

              checkRequiredOptions(options);

              generator = _generators.generators[item];
              _context.next = 8;
              return generator(options);

            case 8:
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](2);

              (0, _print.printError)(_context.t0);

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 10]]);
    }));

    return function handler(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});