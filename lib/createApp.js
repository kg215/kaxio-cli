const fs = require("fs");
const path = require("path");
const colors = require("colors");
const packageInfo = require("./template/package.json");
const npm = require("./npm");

function create(targetDir,appName) {
	validateAppName(appName);
	const appRoot = path.join(targetDir,appName);
	if(fs.existsSync(appRoot)){
		console.log(`${colors.red(appRoot)}已经存在`);
		process.exit(1);
	}
	fs.mkdirSync(appRoot);
	packageInfo["name"] = appName;
	fs.writeFileSync(path.resolve(appRoot,"package.json"),JSON.stringify(packageInfo,undefined,4));
	fs.copyFileSync(path.resolve(__dirname,"./template/.babelrc"),path.resolve(appRoot,".babelrc"));
	fs.copyFileSync(path.resolve(__dirname,"./template/webpack.config.js"),path.resolve(appRoot,"webpack.config.js"));
	fs.mkdirSync(path.resolve(appRoot,"src"));
	fs.copyFileSync(path.resolve(__dirname,"./template/template.html"),path.resolve(appRoot,"src/index.html"));
	fs.copyFileSync(path.resolve(__dirname,"./template/index.jsx"),path.resolve(appRoot,"src/index.jsx"));
	npm.install(path.resolve(appRoot));
}

function validateAppName(appName) {
	if(!/^[a-zA-Z]\w+$/.test(appName)){
		console.log(`${appName}格式不正确,请使用字母开头,字母数字下划线结尾的字符窜`);
		process.exit(1);
	}
}

const app={
	create
};
module.exports = app;