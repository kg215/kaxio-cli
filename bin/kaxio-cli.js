#!/usr/bin/env node
const program = require("commander");
const path = require("path");
const npm = require("../lib/npm");

npm.install(path.resolve(__dirname,"..")).then(function () {
	program.command("login <token>","在本地登记开发者身份")
	.command("init <app-name>","初始化项目")
	.command("build","打包")
	.command("dev","开发者模式")
	.parse(process.argv);

	const [cmd] = program.args;

	if(!program._execs.has(cmd)){
		const colors = require("colors");
		console.log(colors.red("无效命令"));
		program.outputHelp();
		process.exit(1);
	}
});
