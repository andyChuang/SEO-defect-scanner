function PreDefineRule2_aWithoutRel() {
}

function scan($) {
	var defectNum = 0
	$('a').each(function() {
		if(!$(this).attr('rel')) {
			defectNum++
		}
	})

	return defectNum
}

function go($) {
	defectNum = scan($)
	if(defectNum > 0) {
		return 'There are ' + defectNum + ' <a> tag without rel attribute';
	}
	
	return "";
}

PreDefineRule2_aWithoutRel.prototype.go = go
module.exports = PreDefineRule2_aWithoutRel;
