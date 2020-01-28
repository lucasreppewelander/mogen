// const { promisify } = require('util');
const read_dir = require('fs').readdir;

const findRoot = async function(source, is_root) {
	const files = await read_dir(source);
	for (const file of files) {
		if (accepted_root_files.indexOf(file) > -1) {
			is_root = true;
		}
	}

	if (!is_root) {
		const raw = source.split('/');
		return await findRoot(raw.slice(0, raw.length - 1).join('/'));
	}

	return source;
}

const accepted_root_files = [
	'package.json',
	'.babelrc',
	'.git'
]

module.exports = findRoot;