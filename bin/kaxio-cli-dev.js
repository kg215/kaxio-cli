const fs = require("fs");
const path = require("path");
const colors = require("colors");
const program = require("commander");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

program.option('-p,--port [lang]',"更改启动端口")
	.parse(process.argv);
let {port} = program;
if(port<1024){
	console.log(colors.red("建议使用1024以上的端口"));
	process.exit(1);
}
if(port<8000){
	console.log(colors.green("建议使用8000以下的端口"));
}
const appPath = path.resolve(".");
const webpackConfigPath = path.resolve(appPath,"webpack.config.js");

if(!fs.existsSync(webpackConfigPath)){
	console.log(`${webpackConfigPath}不存在,请初始化项目或在项目根目录执行build命令`);
	process.exit(1);
}
const webpackConfig = require(webpackConfigPath);
const compiler = webpack(webpackConfig);

let hostname;
if(!port&&webpackConfig.devServer){
	port = webpackConfig.devServer.port;
	hostname = webpackConfig.devServer.host;
}

new WebpackDevServer(compiler).listen(port||9999,hostname||"localhost",function (err) {
	console.log(this);
});