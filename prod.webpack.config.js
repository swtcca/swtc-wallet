const path = require('path')
const pkg = require('./package.json')

module.exports = {
	mode: "production",
	cache: false,
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
	},
	entry: "./src/index.web.js",
	output: {
		library: "swtc_base",
		path: path.join(__dirname, "dist"),
		filename: ["swtc-base-", ".min.js"].join(pkg.version)
	},
}
