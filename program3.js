const { thirdCLAParser } = require('./parse-package/options-parser')

/*

    input : node program3 --attempts=5 --timeout=300 fetch
    output: 
    {
        "attempts": 5,
        "timeout": 300,
        "useHttps": true,
        "method": "fetch"
    }

 */

console.log(thirdCLAParser(process.argv))