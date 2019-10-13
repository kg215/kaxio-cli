const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
	mode:'development',
	entry:"./src/index.jsx",
	output:{
		path:path.resolve(".","dist"),
		filename:"[name].js"
	},
	devServer: {
		contentBase:"./dist",
		host:"localhost",
		port:9999,
		noinfo:true,
		color:true,
		progress:true
	},
	module:{
		rules:[
			{
				test:/\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				include: /src/,
				use:"babel-loader",
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html"
		})
	]
};