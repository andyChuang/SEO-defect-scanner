var fs = require('fs');
const parse5 = require('parse5');

function SeoDefectScanner() {
	this.input = "input.html";
}

function scan() {
	parseHtml(readFile(this.input));
}

function parseHtml(content) {
	console.log(content);
	var dom = parse5.parse(content);
	console.log(dom);
}

function readFile(path) {
	return fs.readFileSync(path, "utf8");
	//fs.readFile(path, function(err, data) {
	//	console.log(data);
	//	callback(data);
	//});
}

function printMsg() {
	console.log("This is a message from the demo package: input file is " + this.input);
}

SeoDefectScanner.prototype.printMsg = printMsg;
SeoDefectScanner.prototype.scan = scan;

module.exports = SeoDefectScanner;