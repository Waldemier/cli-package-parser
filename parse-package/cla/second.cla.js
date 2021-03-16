// Case 2:
// Command "node myCommandLineApp2.js -rfL" or "node myCommandLineApp2.js --recursive --force --link"
//  1) Operant is not defined for this command
//  2) Option "recursive" should be optional, has short form as "r", be a boolean, has a a boolean "false" as a value by default, js variable name is "isRecursive"
//  3) Option "force" should be optional, has short form as "f", be a boolean, has a a boolean "false" as a value by default, js variable name is "isForce"
//  4) Option "link" should be optional, has short form as "L", be a boolean, has a a boolean "false" as a value by default, js variable name is "isLink"

// Note: "-rfL" == "-Lfr" == "-fLr" == .... (order of letters doesn't affect a result)
// Note2: "-rf" means that "L" is not passes, so default value is used
// Note3: command can be executed without any option, so everything will be using default values

//FIXME: takes any parameters (completed)


var InvalidException = () => {throw new Error("Invalid parameter")}

module.exports.secondCLAParser = argv => {

    let isRecursive = false //short -r, command recursive
    let isForce = false //short -f , command --force
    let isLink = false //short -L , command --link

    if (argv.length === 3 && argv[2].length <= 4) {
        
        const options = argv[2].includes('-') ? argv[2].split(''): InvalidException();
        options.shift(); //delete '-'
        
        options.forEach(current => {
            if(current === 'r') {
                isRecursive = true;
            }
            else if(current === 'L') {
                isLink = true;
            }
            else if(current === 'f') {
                isForce = true;
            }
            else {
                InvalidException();
            }
        })
    }
    else if(argv.length <= 5 && argv.slice(2).every(x => x.includes('--'))) {

        const mainStroke = argv.slice(2).join(' ') + ' '
        const hasRecursive = mainStroke.match(/--recursive?\s/);
        const hasForce = mainStroke.match(/--force?\s/);
        const hasLink = mainStroke.match(/--link?\s/);
        isRecursive = hasRecursive ? true: isRecursive;
        isForce = hasForce ? true: isForce;
        isLink = hasLink ? true: isLink;

        if(mainStroke.trim() !== "") {
            const conflictParametersChecker = mainStroke.trim().split(' ').every(x => x.includes('recursive')  || x.includes('force') || x.includes('link'));
            if(!conflictParametersChecker)
            {
                InvalidException();
            }
        }
    }
    else {
        InvalidException();
    }

    return JSON.stringify({
        'recursive': isRecursive,
        'force': isForce,
        'link': isLink
    }, null, 3)
}