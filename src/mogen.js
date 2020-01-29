#!/usr/bin/env node
const { prompt } = require('inquirer');
const { fixComponentNames } = require('./helper');
const create_component = require('./helper/create_component');
const init_mogen = require('./init');

const argv = require('yargs')
	.usage('Usage: mogen <command> [options]')
	.command('$0 [name]','generates a component', yargs => {
		yargs.positional('name', {
			description: 'the name of your component'
		})
	})
	.command('init','inits the config')
	.option('verbose', {
		alias: 'v',
		type: 'boolean',
		description: 'Run with verbose logging'
	})
	.option('class', {
		type: 'boolean',
		description: 'Generate a class based component instead'
	})
	.option('path', {
		type: 'string',
		description: 'Specify the path for the component, this will override the config value'
	})
	.option('css', {
		type: 'string',
		description: 'Specify the CSS file ending, this will override the config value'
	})
	.option('extension', {
		type: 'string',
		description: 'Specify the extension for the component, this will override the config value'
	})
	.demandCommand()
	.argv;

const init = argv._[0] === 'init';
const components = fixComponentNames(argv);

if (init) {
	prompt([{
		name: 'path',
		type: 'input',
		message: 'Path to your components',
		default: './src/components/'
	}, {
		name: 'css',
		type: 'list',
		message: 'Specify css file endings',
		choices: ['css','scss','sass']
	}, {
		name: 'extension',
		type: 'list',
		message: 'Specify javascript file endings',
		choices: ['js','jsx']
	}]).then(answers => init_mogen(answers));
}

if (components.length) {
	const options = {};

	for (const key in argv) {
		if (['class', 'path', 'css', 'verbose'].indexOf(key)) {
			options[key] = argv[key];
		}
	}

	components.forEach(component => {
		create_component(component, options);
	});
}