function PreDefineRule5_moreThan1H1() {
}

function scan($) {
	return $('h1').length > 1;
}

function go($) {
	var result = scan($);
	if(result) {
		return "HTML have more than one <H1> tag";
	}
}

PreDefineRule5_moreThan1H1.prototype.go = go;
module.exports = PreDefineRule5_moreThan1H1;
