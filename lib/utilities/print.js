'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printOptions = exports.printWarning = exports.printError = exports.print = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _dayjs = require('dayjs');

var _dayjs2 = _interopRequireDefault(_dayjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_IDENTIFIER = _chalk2.default.underline('[rcli-xhy]');

var print = exports.print = function print() {
  var _console;

  for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }

  var timestamp = _chalk2.default.gray((0, _dayjs2.default)().format('h:mm:ss'));

  (_console = console).log.apply(_console, [timestamp, APP_IDENTIFIER].concat(messages));
};

var printError = exports.printError = function printError(error) {
  var timestamp = _chalk2.default.gray((0, _dayjs2.default)().format('h:mm:ss'));

  console.log(timestamp, APP_IDENTIFIER, _chalk2.default.bgRed('Error!'), _chalk2.default.bgBlack(error.message));
  console.log(error.stack);
};

var printWarning = exports.printWarning = function printWarning(warning) {
  var timestamp = _chalk2.default.gray((0, _dayjs2.default)().format('h:mm:ss'));

  console.log(timestamp, APP_IDENTIFIER, _chalk2.default.bgBlack(_chalk2.default.yellow('Warning:')), warning);
};

var printOptions = exports.printOptions = function printOptions(options) {
  return options.reduce(function (acc, option, i) {
    if (i === options.length - 1) {
      if (options.length === 2) {
        return acc + ' and ' + option;
      } else {
        return acc + ', and ' + option;
      }
    }

    return acc + ', ' + option;
  });
};