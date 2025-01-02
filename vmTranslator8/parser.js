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
                    })
                    .map((each) => {
                        if (!each.startsWith('//') && each.includes('//')) {
                            return each.split('//')[0];
                        } else {
                            return each;
                        }
                    });   // loads file as a string
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
        let inst = this.currentInstruction.toLowerCase();
        let arithLogCmd = ['add', 'sub', 'neg','eq', 'gt', 'lt', 'and', 'or', 'not'];

        if (arithLogCmd.includes(inst)) {
            return 'C_ARITHEMATIC';
        } else if (inst.startsWith('push')) {
            return 'C_PUSH';
        } else if (inst.startsWith('pop')) {
            return 'C_POP';
        } else if (inst.startsWith('label')) {
            return 'LABEL';
        } else if (inst.startsWith('goto')) {
            return 'GOTO';
        } else if (inst.startsWith('if-goto')) {
            return 'IFGOTO';
        } else if (inst.startsWith('call')) {
            return 'CALL';
        } else if (inst.startsWith('function')) {
            return 'FUNCTION';
        } else if (inst.startsWith('return')) {
            return 'RETURN';
        }
    }

    arg1() {
        if (this.currentInstruction.toLowerCase().startsWith('label')) {
            return this.currentInstruction.substring(5);
        } else if (this.currentInstruction.toLowerCase().startsWith('goto')) {
            return this.currentInstruction.substring(4);
        } else if (this.currentInstruction.toLowerCase().startsWith('if-goto')) {
            return this.currentInstruction.substring(7);
        } else if (this.currentInstruction.toLowerCase().startsWith('function')) {
            let inst = this.currentInstruction;
            let li = inst.lastIndexOf(inst.match(/\d$/)[0]);
            return this.currentInstruction.substring(8, li);
        } else if (this.currentInstruction.toLowerCase().startsWith('call')) {
            let inst = this.currentInstruction;
            let li = inst.lastIndexOf(inst.match(/\d$/)[0]);
            return this.currentInstruction.substring(4, li); 
        } else if (this.currentInstruction.toLowerCase().startsWith('return')) {
            return 'return'
        }
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