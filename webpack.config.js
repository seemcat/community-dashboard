const HtmlWebPackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebPackPlugin({
	template: './public/index.html',
	filename: './index.html'
});

module.exports = {
	entry: [
		'@babel/polyfill',
		'./public/index.js',
	],
	output: {
		filename: 'app.js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [htmlWebpackPlugin]
};
