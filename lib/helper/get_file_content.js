"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('util'),
    promisify = _require.promisify;

var find_root = require('./findRoot');

var read_file = promisify(require('fs').readFile);

module.exports =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(filename, config, opts) {
    var root, template_path, file_type, content;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(filename === 'index.js')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", "export { default } from './".concat(opts.name, "';"));

          case 2:
            _context.next = 4;
            return find_root(__dirname, false);

          case 4:
            root = _context.sent;
            template_path = join(root, 'src/files/');
            file_type = filename.split('.')[1];
            content = read_file(file_type === config.css ? "".concat(template_path, "/style") : "".concat(template_path, "/component"), 'utf8');
            content = content.replace(/__tpl_name__/g, opts.name);
            content = content.replace(/__tpl_cfg_css__/g, config.css);
            return _context.abrupt("return", content);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();