'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.command = undefined;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var registerOption = function registerOption(program, option) {
  var value = option.value,
      description = option.description,
      pattern = option.pattern,
      defaultValue = option.defaultValue;


  (0, _invariant2.default)(value, 'Each option needs a value specified.');

  var order = [value, description, pattern, defaultValue];
  var optionValues = order.filter(function (value) {
    return value;
  });

  program.option.apply(program, _toConsumableArray(optionValues));
};

var command = exports.command = function command(_ref) {
  var name = _ref.name,
      handler = _ref.handler,
      options = _ref.options;
  return {
    register: function register(program) {
      if (options) {
        options.forEach(function (option) {
          registerOption(program, option);
        });
      }

      program.command(name).action(handler.bind(program));
    }
  };
};