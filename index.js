"use strict";
const fs = require('fs');
const { Writable } = require('stream');
const requireDirectory = require('require-directory');
const rules = require('./rules');
const cheerio = require('cheerio')
let $
var content
var scanList = []

const inputStreamDest = new Writable({
  write(chunk, encoding, callback) { 
  	content+=chunk.toString();
    callback();
  }
});

function SeoDefectScanner(config) {
	this.config = config;
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
	scanList.forEach(function(elem) {
		result += elem.go($)
	})
	return result
}

SeoDefectScanner.prototype.scan = function (input, outputStream) {
	var config = this.config
	switch(config.inputType) {
		case "file":
			$ = cheerio.load(fs.readFileSync(config.inputFile, "utf8"))
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
SeoDefectScanner.prototype.addRule1 = function () {
	scanList.push(new rules.rule1())
	return this
}
SeoDefectScanner.prototype.addRule2 = function () {
	scanList.push(new rules.rule2())
	return this
}
SeoDefectScanner.prototype.addRule3 = function () {
	scanList.push(new rules.rule3())
	return this
}
SeoDefectScanner.prototype.addRule4 = function (strongTagNum) {
	scanList.push(new rules.rule4(strongTagNum))
	return this
}
SeoDefectScanner.prototype.addRule5 = function () {
	scanList.push(new rules.rule5())
	return this
}

module.exports = SeoDefectScanner;

