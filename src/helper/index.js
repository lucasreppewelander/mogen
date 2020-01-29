
const fixComponentNames = function(argv) {
	const names = [];

	if (argv.name) {
		names.push(argv.name)
	}

	for (let i = 0; i < argv._.length; i++) {
		names.push(argv._[i])
	}

	return names.filter(f => f !== 'init');
}

module.exports = {
	fixComponentNames
}