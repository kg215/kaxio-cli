const os = require("os");
const childProc = require("child_process");

const isWindow = /^win/i.test(os.platform());

function run(cwd,command,...args){
	const installProc =  childProc.spawn(isWindow?"npm.cmd":"npm",[command,...args],{cwd,stdio:[0, 1, 2]});
	return new Promise(function(resolve,reject){
		installProc.on("exit",function (code) {
			if (code) {
				reject(code);
			} else {
				resolve();
			}
		});
	});
}

function install(cwd,...args){
	return run(cwd,"install",...args);
}

module.exports = {
	run,
	install
};
