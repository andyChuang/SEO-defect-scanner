var fs = require('fs');
const { Writable } = require('stream');
var rule1 = require('./rules/PreDefineRule1_imgWithoutAlt')
var rule2 = require('./rules/PreDefineRule2_aWithoutRel')
var rule3 = require('./rules/PreDefineRule3_headerCheck')
var rule4 = require('./rules/PreDefineRule4_strongTagNum')
var rule5 = require('./rules/PreDefineRule5_moreThan1H1')
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
	result += new rule1().go($)
	result += new rule2().go($)
	result += new rule3().go($)
	result += new rule4().go($)
	result += new rule5().go($)
	return result
}

SeoDefectScanner.prototype.scan = scan;

module.exports = SeoDefectScanner;

