function PreDefineRule3_headerCheck() {
}

function scan($) {
	var defect = [false, false, false]

	if($('head title').length==0) {
		defect[0] = true
	}
	if($('head meta[name="descriptions"]').length==0){
		defect[1] = true
	}
	if($('head meta[name="keywords"]').length==0){
		defect[2] = true
	}

	return defect
}

function go($) {
	var result = ""
	var defect = scan($)
	if(defect[0]) {
		result += 'Header doesn’t have <title> tag\n'
	}
	if(defect[1]) {
		result += 'Header doesn’t have <meta name=“descriptions” … /> tag\n'
	}
	if(defect[2]) {
		result += 'Header doesn’t have <meta name=“keywords” … /> tag\n'
	}

	return result
}

PreDefineRule3_headerCheck.prototype.go = go
module.exports = PreDefineRule3_headerCheck;
