const { firstCLAParser } = require('./parse-package/options-parser')

/*

    input : node program1 --path=/some/path/in/unix/system --force install
    output: 
    {
        "path": "/some/path/in/unix/system",
        "force": true,
        "command": "install"
    }

 */

console.log(firstCLAParser(process.argv))