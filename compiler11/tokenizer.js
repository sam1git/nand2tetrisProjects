const fs = require('fs');

let tokenData;
try {
    tokenData = JSON.parse(fs.readFileSync('tokenData.json'));
} catch(err) {
    console.error('Error reading token data: ', err.message);
}

class Tokenizer {

    constructor(filepath) {
        this.tokens = Tokenizer.extractTokens(Tokenizer.processFile(filepath));
        this.currentToken = 0;
    }

    advance() {
        if (this.hasMoreTokens()) {
            this.currentToken++;
        }
    }

    lookahead(steps) {
        let i = this.currentToken + steps;
        return this.tokens[i];
    }

    hasMoreTokens() {
        if (this.currentToken >= ( this.tokens.length - 1)) {
            return false;
        } else {
            return true;
        }
    }

    static processFile(filepath) {
        let fileAsString = fs.readFileSync(filepath, {encoding: 'ascii'})
                    .split("\n")
                    .filter((each) => {
                        return (each.length > 0 && !each.startsWith('//'));
                    })
                    .map((each) => {
                        if (each.includes('//')) {
                            return each.replace(/\/\/.*/g, "");
                        } else {
                            return each;
                        }
                    })
                    .join("")
                    .replace(/\/\*[\s\S]*?\*\/|\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/g, " ")
        return ` ${fileAsString}`;
    }

    static extractTokens(string) {
        let tokens = [];
        let exclusionListArray = tokenData["keyword"];
        tokenData["keyword"].forEach(keyword => {
            let regex = new RegExp(`(?<=[(\\W])${keyword}(?=[\\W])`, 'g');
            let match;
            while ((match = regex.exec(string)) !== null) {
                tokens.push({"index": match.index,"tag": "keyword", "value": keyword});
            }
        });
        tokenData["symbol"].forEach(symbol => {
            let regex;
            if (symbol === ";") {
                regex = /;(?=(?:[^"]|"[^"]*")*$)/gi;
            } else {
                regex = new RegExp('\\' + symbol, 'gi');
            }
            let match;
            while ((match = regex.exec(string)) !== null) {
                if (match[0] === "<") {
                    tokens.push({"index": match.index, "tag": "symbol", "value": "&lt;"}); 
                } else if (match[0] === ">") {
                    tokens.push({"index": match.index, "tag": "symbol", "value": "&gt;"}); 
                } else if (match[0] === "&") {
                    tokens.push({"index": match.index, "tag": "symbol", "value": "&amp;"}); 
                } else {
                    tokens.push({"index": match.index, "tag": "symbol", "value": symbol});
                }
            }
        });
        (() => {
            let regex = new RegExp(/"([^"]*)"/, 'gi');
            let match;
            while ((match = regex.exec(string)) !== null) {
                tokens.push({"index": match.index, "tag": "stringConstant", "value": match[0].substring(1, match[0].length - 1 )});
                // adding match to exclusion list array
                if (!exclusionListArray.includes(match[0])) {
                    exclusionListArray.push(match[0]);
                }
            }
        })();

        //let exclusionAdditionArray = [];
        (() => {
            let regex = new RegExp(/[a-z_]+[0-9]*[a-z_]*(?=(?:[^"]*"[^"]*")*[^"]*$)/, 'gi');
            let match;
            while ((match = regex.exec(string)) !== null) {
                if (!exclusionListArray.includes(match[0].toLowerCase())) {
                    tokens.push({"index": match.index, "tag": "identifier", "value": match[0]});
                    /*
                    for (let i = 0; i < exclusionListArray.length; i++) {
                        if (match[0].includes(exclusionListArray[i])) {
                            if (match[0].startsWith(exclusionListArray[i])) {
                                match[0] = match[0].replace(exclusionListArray[i],"");
                                match.index = match.index + exclusionListArray[i].length;
                            } else {
                                match[0] = match[0].replace(exclusionListArray[i],"");
                            }
                        }
                    };
                    if (match[0].length > 0) {
                        tokens[`${match.index}`] = {"tag": "identifier", "value": match[0]};
                        exclusionAdditionArray.push(match[0]);    
                    }
                    */
                }
                
            }
        })();
        //exclusionListArray = exclusionListArray.concat(Array.from(new Set(exclusionAdditionArray)));

        (() => {
            let regex = new RegExp(/[0-9]+(?=(?:[^"]*"[^"]*")*[^"]*$)/, 'gi');
            let match;
            while ((match = regex.exec(string)) !== null) {
                if (!exclusionListArray.includes(match[0])) {
                    tokens.push({"index": match.index, "tag": "integerConstant", "value": match[0]});
                }
                
            }
        })();
        tokens.sort((a, b) => {
            if (a["index"] < b["index"]) {
                return -1;
            } else {
                return 1;
            }
        });
        return tokens;
    }

}

module.exports = Tokenizer;