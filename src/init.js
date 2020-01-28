const { join } = require('path');
const find_root = require('./helper/findRoot');
const write_file = require('fs').writeFile;

module.exports = async function(options) {
	const root = await find_root(process.cwd(), false);
	await write_file(join(root, '.mogenrc'), JSON.stringify(options, null, 4));
	console.log('Init successfully');
}