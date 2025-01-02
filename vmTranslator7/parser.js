const fs = require('fs');

class Parser {

    static memorySegments = ['argument', 'local', 'static', 'constant', 'this', 'that', 'pointer', 'temp'];

    constructor(filepath) {
        this.file = fs.readFileSync(filepath, {encoding: 'ascii'})
                    .split('\n').map(each => {
                        return each.replace(/\s|\r/g, "");
                    })
                    .filter((each) => {
                        return each.length > 0
                    });  // loads file as a string
        this.linePointer = 0;
        this.instructionPointer = 0;
        this.currentInstruction = null;
    }
/*
    reset() {
        this.linePointer = 0;
        this.instructionPointer = 0;
        this.currentInstruction = null;
    }
*/
    hasMoreLines() {
        if (this.linePointer >= this.file.length) {
            return false;
        }
        return true;
    }

    advance() {
        if (this.hasMoreLines()) {
            let line = this.file[this.linePointer];
            let firstTwoChars = this.file[this.linePointer].substring(0,2);
            this.linePointer++;
            if (firstTwoChars == '//') {
                this.advance();
            } else {
                this.instructionPointer++;
                this.currentInstruction = line;
            }
        } else {
            this.currentInstruction = null;
        }
    }

    commandType() {
        let inst = this.currentInstruction;
        let arithLogCmd = ['add', 'sub', 'neg','eq', 'gt', 'lt', 'and', 'or', 'not'];

        if (arithLogCmd.includes(inst)) {
            return 'C_ARITHEMATIC';
        } else if (inst.includes('push')) {
            return 'C_PUSH';
        } else if (inst.includes('pop')) {
            return 'C_POP';
        }
    }

    arg1() {
        let arg1;
        Parser.memorySegments.forEach((each) => {
            if (this.currentInstruction.includes(each)) {
                arg1 = each;
            }
        })
        if (arg1) {
            return arg1;
        } else {
            return this.currentInstruction;
        }
    }

    arg2() {
        let arg1 = this.arg1();
        let arg2 = this.currentInstruction.split(arg1)[1];
        if (arg2.length >= 1) {
            return parseInt(arg2);
        } else {
            return null;
        }
    }
}

module.exports = Parser;