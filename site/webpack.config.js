const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	mode: "development",
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		host: '0.0.0.0'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
};