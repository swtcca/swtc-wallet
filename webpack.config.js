const path = require('path')
const pkg = require('./package.json')

module.exports = {
	mode: "development",
	cache: false,
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
	},
	entry: "./src/index.web.js",
	output: {
		library: "swtc_base",
		path: path.resolve(__dirname, "dist"),
		filename: ["swtc-base-", ".js"].join(pkg.version)
	},
}
