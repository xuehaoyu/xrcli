'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPackage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _print = require('./utilities/print');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Package = function () {
  function Package(packageInfo, packageFilePath) {
    _classCallCheck(this, Package);

    _initialiseProps.call(this);

    this._packageInfo = packageInfo;
    this._packageFilePath = packageFilePath;
  }

  _createClass(Package, [{
    key: 'addInfo',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, value) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._packageInfo[key] = value;

                _context.next = 3;
                return this._write();

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addInfo(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addInfo;
    }()
  }, {
    key: 'addScripts',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(config) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                Object.keys(config).forEach(function (scriptName) {
                  _this._packageInfo.scripts[scriptName] = config[scriptName];
                });

                _context2.next = 3;
                return this._write();

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addScripts(_x3) {
        return _ref2.apply(this, arguments);
      }

      return addScripts;
    }()
  }, {
    key: '_write',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var packageInfo;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                try {
                  packageInfo = JSON.stringify(this._packageInfo, null, 2);


                  _fs2.default.writeFileSync(this._packageFilePath, packageInfo, 'utf-8');
                } catch (error) {
                  console.log(error);
                }

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _write() {
        return _ref3.apply(this, arguments);
      }

      return _write;
    }()
  }]);

  return Package;
}();

// Let's use this since we can't have async constructors (justifiably)


var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.install = function (packageNames) {
    return new Promise(function (resolve, reject) {
      var packageFileDirectory = _path2.default.resolve(_this2._packageFilePath, '..');
      var options = {
        cwd: packageFileDirectory,
        stdio: 'inherit'
      };

      (0, _print.print)('Installing: ' + (0, _print.printOptions)(packageNames) + ' \uD83D\uDE43');
      (0, _print.print)('Please be patient and kind while waiting for npm@3 to finish! ☀️ ☀️ ☀️');

      var npm = (0, _child_process.spawn)('npm', ['install'].concat(_toConsumableArray(packageNames), ['--save-dev']), options);
      npm.on('close', resolve);
    });
  };

  this.installAll = function () {
    return new Promise(function (resolve, reject) {
      var packageFileDirectory = _path2.default.resolve(_this2._packageFilePath, '..');
      var options = {
        cwd: packageFileDirectory,
        stdio: 'inherit'
      };

      (0, _print.print)('Running: npm install 🙃');
      (0, _print.print)('Please be patient and kind while waiting for npm@3 to finish! ☀️ ☀️ ☀️');

      var npm = (0, _child_process.spawn)('npm', ['install'], options);
      npm.on('close', resolve);
    });
  };

  this.viewPackageFile = function () {
    return new Promise(function (resolve, reject) {
      var handler = function handler(error, packageInfo) {
        if (error) {
          reject(error);
          return;
        }

        resolve(JSON.parse(packageInfo));
      };
      _fs2.default.readFile(_this2._packageFilePath, 'utf-8', handler);
    });
  };
};

var buildPackage = exports.buildPackage = function buildPackage(packageFilePath) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(packageFilePath, 'utf-8', function (error, info) {
      if (error) {
        reject(error);
        return;
      }

      var pkg = new Package(JSON.parse(info), packageFilePath);

      resolve(pkg);
    });
  });
};