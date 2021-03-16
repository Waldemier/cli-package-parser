// Case 3:
// Command "node myCommandLineApp3.js --attempts=5 --timeout=60 --useHttps=false send"
//  1) Operant should have a name "send", be a string, be mandatory, list of acceptable values=["send", "ping", "fetch"]
//  2) Option "attempts" should be optional, be a number with integer value, js variable name is also "attempts", has a 3 as a value by default
//  3) Option "timeout" should be optional, be a number with integer value, has a 120 as a value by default, js variable name is "number"
//  4) Option "useHttps" should be optional, be a boolean, has a boolean "true" as a value by default, js variable name is "useHttps"

//FIXME: send mandatory (completed)

module.exports.thirdCLAParser = argv => {
    
    const InvalidException = () => { throw new Error("Invalid parameter") }
    var values = ["send", "ping", "fetch"];
    let attempts = 3;
    let number = 120;
    let useHttps = true;
    let send;

    const checkPrefix = argv.slice(2, argv.length-1).every(x => x.includes('--'))

    if(argv.length > 6 || !checkPrefix) {
        InvalidException();
    }
    else {
        const mainStroke = argv.slice(2).join(' ')
        const mandatoryChecker = mainStroke.endsWith(values[0]) || mainStroke.endsWith(values[1]) || mainStroke.endsWith(values[2])
        if(!mandatoryChecker) {
            InvalidException();
        }

        send = argv[argv.length-1];

        [...argv.slice(2)].map(curr => curr.includes('=') ? curr.split('='): curr).forEach(op => {

            if(typeof op === 'object') //check if op is array of values
            {    
                if(op[0] === '--attempts') {
                    attempts = op[1];
                }
                else if(op[0] === '--timeout') {
                    number = op[1];
                }
                else if(op[0] === '--useHttps') {
                    useHttps = (() => { 
                        if(op[1] === 'true')
                        {
                            return true;
                        }
                        if(op[1] === 'false')
                        {
                            return false;
                        }
                        InvalidException()
                    })()
                }
                else {
                    InvalidException()
                }
            }
        
            })
            
            attempts = !isNaN(Number.parseInt(attempts)) ? Number.parseInt(attempts): InvalidException()
            number = !isNaN(Number.parseInt(number)) ? Number.parseInt(number): InvalidException()
        
            return JSON.stringify({
                attempts,
                'timeout': number,
                useHttps,
                'method': send
            }, null, 3)
    }
}
    