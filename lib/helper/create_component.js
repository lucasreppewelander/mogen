"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('path'),
    join = _require.join,
    dirname = _require.dirname;

var mkdirp = require('mkdirp');

var find_root = require('./findRoot');

var get_file_content = require('./get_file_content');

var read_file = require('fs').readFile;

var write_file = require('fs').writeFile;

var create =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(name, opts) {
    var root, raw_config, config, component_path, files, _i, _files, file, file_path, content, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, plugin, plug;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return find_root(process.cwd(), false);

          case 2:
            root = _context.sent;
            _context.next = 5;
            return read_file(join(root, '.mogenrc'));

          case 5:
            raw_config = _context.sent;
            config = JSON.parse(raw_config);
            component_path = join(root, config.path, "".concat(name, "/"));
            files = ['index.js', "".concat(name, ".").concat(config.extensions), "".concat(name, ".").concat(config.css)];
            _i = 0, _files = files;

          case 10:
            if (!(_i < _files.length)) {
              _context.next = 23;
              break;
            }

            file = _files[_i];
            file_path = join(component_path, file);
            _context.next = 15;
            return mkdirp(dirname(file_path));

          case 15:
            _context.next = 17;
            return get_file_content(file, config, opts);

          case 17:
            content = _context.sent;
            _context.next = 20;
            return write_file(file_path, content);

          case 20:
            _i++;
            _context.next = 10;
            break;

          case 23:
            if (!(config.plugins && config.plugins.length)) {
              _context.next = 53;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 27;
            _iterator = config.plugins[Symbol.iterator]();

          case 29:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 39;
              break;
            }

            plugin = _step.value;

            if (!(plugin.indexOf('mogen-plugin') > -1)) {
              _context.next = 36;
              break;
            }

            plug = require(plugin);

            if (!plug.hasOwnProperty('run')) {
              _context.next = 36;
              break;
            }

            _context.next = 36;
            return plug.run();

          case 36:
            _iteratorNormalCompletion = true;
            _context.next = 29;
            break;

          case 39:
            _context.next = 45;
            break;

          case 41:
            _context.prev = 41;
            _context.t0 = _context["catch"](27);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 45:
            _context.prev = 45;
            _context.prev = 46;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 48:
            _context.prev = 48;

            if (!_didIteratorError) {
              _context.next = 51;
              break;
            }

            throw _iteratorError;

          case 51:
            return _context.finish(48);

          case 52:
            return _context.finish(45);

          case 53:
            console.log("Successfully created component at ".concat(component_path));

          case 54:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[27, 41, 45, 53], [46,, 48, 52]]);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = create;