var fs = require('fs');
var rule1 = require('./rules/PreDefineRule1_imgWithoutAlt')
var rule2 = require('./rules/PreDefineRule2_aWithoutRel')
var rule3 = require('./rules/PreDefineRule3_headerCheck')
var rule4 = require('./rules/PreDefineRule4_strongTagNum')
var rule5 = require('./rules/PreDefineRule5_moreThan1H1')
const cheerio = require('cheerio')
let $

function SeoDefectScanner(config) {
	this.input = config.inputFile;
	this.output = config.outputFile
	$ = cheerio.load(readFile(this.input))
}

function readFile(path) {
	return fs.readFileSync(path, "utf8");
}

function scan() {
	console.log(new rule1().go($))
	console.log(new rule2().go($))
	console.log(new rule3().go($))
	console.log(new rule4().go($))
	console.log(new rule5().go($))
}

function preDefineRule5_moreThan1H1() {

}

SeoDefectScanner.prototype.scan = scan;

module.exports = SeoDefectScanner;

