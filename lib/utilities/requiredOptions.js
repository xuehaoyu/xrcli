'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requiredOptions = undefined;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requiredOptions = exports.requiredOptions = function requiredOptions(options) {
  return function (givenOptions) {
    var missingOptions = [];

    Object.keys(givenOptions).forEach(function (option) {
      var isRequired = options[option];

      if (isRequired && typeof givenOptions[option] === 'undefined') {
        missingOptions.push(option);
      }
    });

    (0, _invariant2.default)(missingOptions.length === 0, 'Missing options for the `generate` command, expected the following to ' + 'be set: [%s].', missingOptions);
  };
};