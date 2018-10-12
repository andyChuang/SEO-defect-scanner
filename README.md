# SEO-defect-scanner

A npm module that let developers use this package to scan a HTML file and show all of the SEO defects.


## Quick Start
1. `npm install @scorpion2272/SEO-defect-scanner`
2. Use the pre-defined rule 1 mentioned above
```javascript=
var fs = require('fs');
var seoScanner = require("@scorpion2272/SEO-defect-scanner")
new seoScanner()
.addPredefinedRule1()
.scan('input.html') // html file to be scanned
```
3. The console output should be like this:
> There are 2 <img> tag without alt attribute


## Pre-defined Rules
There are 5 pre-defined SEO rules here:

#### addPredefinedRule1()
Detect if any`<img/>` tag without alt attribute
```javascript=
new seoScanner().addPredefinedRule1()
```

#### addPredefinedRule2()
Detect if any`<a />` tag without rel attribute
```javascript=
new seoScanner().addPredefinedRule2()
```

#### addPredefinedRule3()
Contains 3 subrules:

In `<head>` tag
    a. Detect if header doesn’t have `<title>` tag
    b. Detect if header doesn’t have `<meta name=“descriptions” … />` tag
    c. Detect if header doesn’t have `<meta name=“keywords” … />` tag
```javascript=
new seoScanner().addPredefinedRule3()
```

#### addPredefinedRule4(N)
Detect if there’re more than N `<strong>` tag in HTML (N is configurable)
```javascript=
new seoScanner().addPredefinedRule4(15) // Detect if there're more than 15 <strong> tag
```
#### addPredefinedRule5()
Detect if a HTML have more than one `<H1>` tag.
```javascript=
new seoScanner().addPredefinedRule5()
```


## Customized Rule
You can manage your customized rule

#### addRule(rule, id)
Register a rule to scanner

```javascript=
new seoScanner()
.addRule(CustomizedRule1, "MoreThanOneH2Tag")
```

Your customized rule should be implemented like this:
```javascript=
function CustomizedRule1($) {
    if($('h2').length > 1) {
        return "HTML have more than one <H2> tag";
    }
}
```

1. The input parameter $ will be passed by the scanner. It's similar to the jQuery DOM object, so you can search for the DOM element via jQuery selector syntax.
2. Return a message when the defect is found.

#### removeRule(id)
Remove specified registered rule in scanner
```javascript=
new seoScanner()
.addRule(CustomizedRule1, "MoreThanOneH2Tag")
.removeRule("MoreThanOneH2Tag")
```

#### resetRule()
Clear all rules registered in scanner
```javascript=
new seoScanner()
.addRule(CustomizedRule1, "MoreThanOneH2Tag")
.resetRule()
```

## Chained Rule Scanning
You can chain any pre-defined rules and customized rules to do the scan.
```javascript=
new seoScanner()
.addPredefinedRule1()
.addPredefinedRule4(10)
.addRule(CustomizedRule1, "MoreThanOneH2Tag")
.scan('input.html')
```

## Configuration
When you create an instance of the scanner, you can pass a object as config:
```javascript=
var config = {
    inputType:'file', // file (default) or stream
    outputType:'console' // console (default) or file or stream
};
new seoScanner(config)
```

#### inputType: 'file' (Default)
You should pass the file path as the first parameter of scan()
```javascript=
new seoScanner({inputType:'file'}).scan('input.html')
```

#### inputType: 'stream'
You should pass a Node readable stream as the first parameter of scan()
```javascript=
var inputStream = fs.createReadStream(inputFile)
new seoScanner({inputType:'stream'}).scan(inputStream)
```

#### outputType: 'console' (Default)
The scan output will be shown in the console.
```javascript=
new seoScanner({outputType:'console'}).scan('input.html')
```

#### outputType: 'file'
You should pass the file path as the second parameter of scan()
```javascript=
new seoScanner({outputType:'file'}).scan('input.html', 'output')
```

#### outputType: 'stream'
You should pass a Node writable stream as the second parameter of scan()
```javascript=
const outputStream = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString())
    }
});
new seoScanner({outputType:'stream'}).scan('input.html', outputStream)
```
## Appendix
#### Flexibility of pre-defined rule 3:
Use a object to define the jQuery selector, condition and message when defect is scanned, so developers who want to add additional subrules can just extend the object.

```javascript=
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

function scan($, subRules) {
    var result = [];

    subRules.forEach(function(subRule) {
        if($(subRule.selector).length!=0 != subRule.shouldExist) {
            result.push(subRule.message);
        }
    });

    return result;
}
```