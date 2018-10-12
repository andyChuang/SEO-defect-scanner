function PreDefineRule4_strongTagNum(strongTagNum) {
	this.strongTagNum = strongTagNum || 15;
}

function scan($) {
	return $('strong').length > this.strongTagNum;
}

function go($) {
	var result = this.scan($);
	if(result) {
		return "There’re more than " + this.strongTagNum + " <strong> tag in HTML"
	}
}

PreDefineRule4_strongTagNum.prototype.go = go;
PreDefineRule4_strongTagNum.prototype.scan = scan;
module.exports = PreDefineRule4_strongTagNum;
