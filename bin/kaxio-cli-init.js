const program = require("commander");
const path = require("path");
const app = require("../lib/createApp");

program.parse(process.argv);
const targetDir = path.resolve(".");
const [appName] = program.args;
app.create(targetDir,appName);


