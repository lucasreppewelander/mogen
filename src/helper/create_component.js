const { join, dirname } = require('path');
const mkdirp = require('mkdirp');
const find_root = require('./findRoot');
const get_file_content = require('./get_file_content');
const read_file = require('fs').readFile;
const write_file = require('fs').writeFile;

const create = async (name, opts) => {
	const root = await find_root(process.cwd(), false);
	const raw_config = await read_file(join(root, '.mogenrc'));
	const config = JSON.parse(raw_config);

	const component_path = join(root, config.path, `${name}/`);
	const files = [
		'index.js',
		`${name}.${config.extensions}`,
		`${name}.${config.css}`
	]

	for (const file of files) {
		const file_path = join(component_path, file);
		await mkdirp(dirname(file_path));
		const content = await get_file_content(file, config, opts);
		await write_file(file_path, content);
	}

	if (config.plugins && config.plugins.length) {
		for (const plugin of config.plugins) {
			if (plugin.indexOf('mogen-plugin') > -1) {
				const plug = require(plugin);
				if (plug.hasOwnProperty('run')) {
					await plug.run();
				}
			}
		}
	}

	console.log(`Successfully created component at ${component_path}`);
}

module.exports = create;