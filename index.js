const fs = require('fs');
const { Writable } = require('stream');
const requireDirectory = require('require-directory');
const rules = require('./rules');
const cheerio = require('cheerio')
let $
var content

const inputStreamDest = new Writable({
  write(chunk, encoding, callback) { 
  	content+=chunk.toString();
    callback();
  }
});

function SeoDefectScanner(config) {
	this.config = config;
}

function readFile(path) {
	return fs.readFileSync(path, "utf8");
}

function scan(input, outputStream) {
	var result
	var config = this.config
	switch(this.config.inputType) {
		case "file":
			$ = cheerio.load(readFile(config.inputFile))
			outputResult(doScan(), config)
			break;
		case "stream":
			input
			.pipe(inputStreamDest)
			.on('finish', function() {
				$ = cheerio.load(content)
				outputResult(doScan(), config, outputStream)
			})
			break;
	}		
}

function outputResult(result, config, outputStream) {
	switch(config.outputType) {
		case "file":
			break;
		case "stream":
			outputStream.write(result)
			break;
		case "console":
			console.log(result)
			break;
	}
}

function doScan() {	
	var result = ""
	result += new rules.rule1().go($)
	result += new rules.rule2().go($)
	result += new rules.rule3().go($)
	result += new rules.rule4().go($)
	result += new rules.rule5().go($)
	return result
}

SeoDefectScanner.prototype.scan = scan;

module.exports = SeoDefectScanner;

