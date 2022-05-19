'use strict';

require('babel-polyfill');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _commands = require('./commands');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = '0.0.4';

_commander2.default.version(VERSION);

_commands.commands.forEach(function (command) {
  command.register(_commander2.default);
});

_commander2.default.parse(process.argv);