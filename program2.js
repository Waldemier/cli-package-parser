const { secondCLAParser } = require('./parse-package/options-parser')

/*

    input : node program2 --link --force --recursive
    output in JSON: 
    {
        "recursive": true,
        "force": true,
        "link": true
    }

 */

console.log(secondCLAParser(process.argv))