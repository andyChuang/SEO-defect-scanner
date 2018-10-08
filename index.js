function printMsg() {
	console.log("This is a message from the demo package");
}

function SeoDefectScanner() {

}

SeoDefectScanner.prototype.printMsg = printMsg;

module.exports = SeoDefectScanner;