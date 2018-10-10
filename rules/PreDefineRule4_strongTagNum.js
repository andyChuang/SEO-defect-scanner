function PreDefineRule4_strongTagNum() {
}

function scan($) {
	return $('strong').length > 15;
}

function go($) {
	var result = scan($)
	if(result) {
		return "There’re more than 15 <strong> tag in HTML"
	}
	return "";
}

PreDefineRule4_strongTagNum.prototype.go = go
module.exports = PreDefineRule4_strongTagNum;
