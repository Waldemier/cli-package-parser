// Case 1:
// Command "node myCommandLineApp1.js --path="/some/path/in/unix/system" --force install"
//  1) Operant should have a name "command", be a string, be mandatory, list of acceptable values=["install", "uninstall"]
//  2) Option "path" should be optional, be a string, js variable name is also "path"
//  3) Option "force" should be optional, be a boolean, has a a boolean "false" as a value by default, js variable name is "isForce"

//FIXME: Review and rebuild all program (completed)


var InvalidException = () => {throw new Error("Invalid parameter")}

module.exports.firstCLAParser = argv => {
    const values = ["install", "uninstall"]
    let command;
    let path;
    let isForce = false;

    if(argv.length > 5) {
        InvalidException();
    }
    else {
        let checkPrefix = argv.slice(2, argv.length-1).every(x => x.includes('--path') || x.includes('--force'));
        let checkMandatoryParameter = argv.slice(2).join(' ').trim().endsWith(values[0] || values[1]);

        if(checkPrefix && checkMandatoryParameter) {
            const mainStroke = argv.slice(2).join(' ').trim()
            const checkPath = mainStroke.match(/--path=/) ? true: false
            path = checkPath ? mainStroke.match(/--path\s*=\s*([\S\s]+?\s)/)[1].trim(): null

            if(Number.parseInt(path)) InvalidException();

            isForce = !!mainStroke.match(/--force?\s/) || isForce
            
            command = argv[argv.length-1]

            return JSON.stringify({
                path,
                'force': isForce,
                command
            }, null, 3)

        } else {
            InvalidException();
        }
    }
}