"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// const { promisify } = require('util');
var read_dir = require('fs').readdir;

var findRoot =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(source, is_root) {
    var files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, raw;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return read_dir(source);

          case 2:
            files = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;

            for (_iterator = files[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              file = _step.value;

              if (accepted_root_files.indexOf(file) > -1) {
                is_root = true;
              }
            }

            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 14:
            _context.prev = 14;
            _context.prev = 15;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 17:
            _context.prev = 17;

            if (!_didIteratorError) {
              _context.next = 20;
              break;
            }

            throw _iteratorError;

          case 20:
            return _context.finish(17);

          case 21:
            return _context.finish(14);

          case 22:
            if (is_root) {
              _context.next = 27;
              break;
            }

            raw = source.split('/');
            _context.next = 26;
            return findRoot(raw.slice(0, raw.length - 1).join('/'));

          case 26:
            return _context.abrupt("return", _context.sent);

          case 27:
            return _context.abrupt("return", source);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 10, 14, 22], [15,, 17, 21]]);
  }));

  return function findRoot(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var accepted_root_files = ['package.json', '.babelrc', '.git'];
module.exports = findRoot;