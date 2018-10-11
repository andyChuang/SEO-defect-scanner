function PreDefineRule3_headerCheck() {
	// Just modify this structure to implement additional rules for <meta> tag
	this.subRules = [
	{
		selector: 'head title',
		shouldExist: true,
		message: 'Header doesn’t have <title> tag'
	},
	{
		selector: 'head meta[name="descriptions"]',
		shouldExist: true,
		message: 'Header doesn’t have <meta name=“descriptions” … /> tag'
	},
	{
		selector: 'head meta[name="keywords"]',
		shouldExist: true,
		message: 'Header doesn’t have <meta name=“keywords” … /> tag'
	}
	];
}

function scan($, subRules) {
	var result = [];

	subRules.forEach(function(subRule) {
		if($(subRule.selector).length!=0 != subRule.shouldExist) {
			result.push(subRule.message);
		}
	});
	
	return result;
}

function go($) {
	return scan($, this.subRules).join("\n");
}

PreDefineRule3_headerCheck.prototype.go = go
module.exports = PreDefineRule3_headerCheck;
