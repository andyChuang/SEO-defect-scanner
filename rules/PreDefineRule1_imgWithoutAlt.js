function PreDefineRule1_imgWithoutAlt() {
}

function scan($) {
	var defectNum = 0
	$('img').each(function() {
		if(!$(this).attr('alt')) {
			defectNum++
		}
	})

	return defectNum
}

function go($) {
	defectNum = scan($)
	if(defectNum > 0) {
		return 'There are ' + defectNum + ' <img> tag without alt attribute';	
	}
	
	return "";
}

PreDefineRule1_imgWithoutAlt.prototype.go = go
module.exports = PreDefineRule1_imgWithoutAlt;
