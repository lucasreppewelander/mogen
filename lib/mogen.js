#!/usr/bin/env node
"use strict";

var _require = require('inquirer'),
    prompt = _require.prompt;

var _require2 = require('./helper'),
    fixComponentNames = _require2.fixComponentNames;

var create_component = require('./helper/create_component');

var init_mogen = require('./init');

var argv = require('yargs').usage('Usage: mogen <command> [options]').command('$0 [name]', 'generates a component', function (yargs) {
  yargs.positional('name', {
    description: 'the name of your component'
  });
}).command('init', 'inits the config').option('verbose', {
  alias: 'v',
  type: 'boolean',
  description: 'Run with verbose logging'
}).option('class', {
  type: 'boolean',
  description: 'Generate a class based component instead'
}).option('path', {
  type: 'string',
  description: 'Specify the path for the component, this will override the config value'
}).option('css', {
  type: 'string',
  description: 'Specify the CSS file ending, this will override the config value'
}).demandCommand().argv;

console.log(argv);
var init = argv._[0] === 'init';
var components = fixComponentNames(argv);

if (init) {
  prompt([{
    name: 'path',
    type: 'input',
    message: 'Path to your components ("./src/components/")'
  }, {
    name: 'css',
    type: 'list',
    message: 'Specify css file endings',
    choices: ['css', 'scss', 'sass']
  }, {
    name: 'extension',
    type: 'list',
    message: 'Specify javascript file endings',
    choices: ['js', 'jsx']
  }]).then(function (answers) {
    return init_mogen(answers);
  });
}

if (components.length) {
  var options = {};

  for (var key in argv) {
    if (['class', 'path', 'css', 'verbose'].indexOf(key)) {
      options[key] = argv[key];
    }
  }

  components.forEach(function (component) {
    create_component(component, options);
  });
}