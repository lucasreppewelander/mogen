"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var fixComponentNames = function fixComponentNames(argv) {
  var names = [];

  if (argv.name) {
    names.push(argv.name);
  }

  for (var i = 0; i < argv._.length; _readOnlyError("i"), i++) {
    names.push(argv._[i]);
  }

  return names.filter(function (f) {
    return f !== 'init';
  });
};

module.exports = {
  fixComponentNames: fixComponentNames
};