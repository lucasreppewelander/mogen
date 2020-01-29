const { promisify } = require('util');
const { join } = require('path');
const find_root = require('./findRoot');
const read_file = promisify(require('fs').readFile);

module.exports = async function(filename, config, opts) {
	if (filename === 'index.js') {
		return `export { default } from './${opts.name}';`;
	}

	const root = await find_root(__dirname, false);
	const template_path = join(root, 'src/files/');

	const file_type = filename.split('.')[1];
	let content = await read_file(
		file_type === config.css
		? `${template_path}/style.js`
		: `${template_path}/component.js`, 'utf8'
	);

	content = content.replace(/__tpl_name__/g, opts.name);
	content = content.replace(/__tpl_cfg_css__/g, config.css);
	content = content.replace(/`/g, '');

	return content;
}