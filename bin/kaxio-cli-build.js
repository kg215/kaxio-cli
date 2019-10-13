const fs = require("fs");
const path = require("path");
const colors = require("colors");
const webpack = require("webpack");

const appPath = path.resolve(".");
const webpackConfigPath = path.resolve(appPath,"webpack.config.js");

if(!fs.existsSync(webpackConfigPath)){
	console.log(`${webpackConfigPath}不存在,请初始化项目或在项目根目录执行build命令`);
	process.exit(1);
}

webpack(require(webpackConfigPath),(err, stats) => {
	 if (err || stats.hasErrors()) {
		 // 在这里处理错误
	     console.log(`${colors.red("错误!")},详细信息查看stats.txt`);
		 fs.writeFileSync(path.resolve(appPath,"stats.txt"),stats.toString("minimal"));
		 process.exit(0);
	 }
 });