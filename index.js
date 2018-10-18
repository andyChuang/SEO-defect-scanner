"use strict";
const fs = require('fs');
const { Writable } = require('stream');
const requireDirectory = require('require-directory');
const rules = require('./rules');
const cheerio = require('cheerio');
let $;
var inputStreamContent = ""

const inputStreamDest = new Writable({
  write(chunk, encoding, callback) { 
  	inputStreamContent+=chunk.toString();
    callback();
  }
});

function SeoDefectScanner(config) {
	this.config = config || {};
	this.config.inputType = this.config.inputType || "file";
	this.config.outputType = this.config.outputType || "console";
	this.scanList = [];
	this.customizedRules = {};
}

SeoDefectScanner.prototype.doScan = function() {	
	var result = [];
	this.scanList.forEach(function(elem) {
		result.push(elem.go($));
	});

	for (var ruleId in this.customizedRules) {
		result.push(this.customizedRules[ruleId]($));
	}

	return result.join("\n");
}

SeoDefectScanner.prototype.outputResult = function(result, outputDest) {
	switch(this.config.outputType) {
		case "file":
			fs.writeFileSync(outputDest, result);
			break;
		case "stream":
			outputDest.write(result);
			break;
		case "console":
			console.log(result);
			break;
	}
}

SeoDefectScanner.prototype.addRule = function(rule, id) {
	this.customizedRules[id] = rule;
	return this;
}

SeoDefectScanner.prototype.removeRule = function(id) {
	delete this.customizedRules[id];
	return this;
}

SeoDefectScanner.prototype.resetRule = function() {
	this.customizedRules = {};
	return this;
}

SeoDefectScanner.prototype.scan = function (input, output) {
	switch(this.config.inputType) {
		case "file":
			$ = cheerio.load(fs.readFileSync(input, "utf8"));
			this.outputResult(this.doScan(), output);
			break;
		case "stream":
			input
			.pipe(inputStreamDest)
			.on('finish', () => {
				$ = cheerio.load(inputStreamContent);
				this.outputResult(this.doScan(), output);
			})
			break;
	}		
}
SeoDefectScanner.prototype.addPredefinedRule1 = function () {
	this.scanList.push(new rules.rule1());
	return this;
}
SeoDefectScanner.prototype.addPredefinedRule2 = function () {
	this.scanList.push(new rules.rule2());
	return this;
}
SeoDefectScanner.prototype.addPredefinedRule3 = function () {
	this.scanList.push(new rules.rule3());
	return this;
}
SeoDefectScanner.prototype.addPredefinedRule4 = function (strongTagNum) {
	this.scanList.push(new rules.rule4(strongTagNum));
	return this;
}
SeoDefectScanner.prototype.addPredefinedRule5 = function () {
	this.scanList.push(new rules.rule5());
	return this;
}

module.exports = SeoDefectScanner;

