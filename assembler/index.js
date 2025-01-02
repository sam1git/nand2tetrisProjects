const fs = require('fs');
const path = require('path');

let jumpBits = JSON.parse(fs.readFileSync('jumpBits.json'));
let destBits = JSON.parse(fs.readFileSync('destBits1.json'));
let compBits = JSON.parse(fs.readFileSync('compBits.json'));

class Parser {
    constructor(filepath) {
        this.file = fs.readFileSync(filepath, {encoding: 'ascii'})
                    .split('\r\n').map(each => {
                        return each.replace(/\s/g, "");
                    })
                    .filter((each) => {
                        return each.length > 0
                    });  // loads file as a string
        this.linePointer = 0;
        this.instructionPointer = 0;
        this.currentInstruction = null;
    }

    reset() {
        this.linePointer = 0;
        this.instructionPointer = 0;
        this.currentInstruction = null;
    }

    hasMoreLines() {
        if (this.linePointer >= this.file.length) {
            return false;
        }
        return true;
    }

    advance() {
        if (this.hasMoreLines()) {
            let line = this.file[this.linePointer];
            let firstchar = this.file[this.linePointer][0];
            this.linePointer++;
            if (firstchar != '@' && firstchar != '0' && firstchar != 'A' && firstchar != 'D' && firstchar != 'M' && firstchar != '(') {
                this.advance();
            } else {
                if (!line.includes("(")) {
                    this.instructionPointer++;
                }
                this.currentInstruction = line;
            }
        } else {
            this.currentInstruction = null;
        }
    }

    instructionType() {
        let firstchar = this.currentInstruction[0];
        if(firstchar == '@') {
            return "A_INSTRUCTION";
        } else if(firstchar == '0' || firstchar == 'A' || firstchar == 'D' || firstchar == 'M') {
            return "C_INSTRUCTION";
        } else if(firstchar == '(') {
            return "L_INSTRUCTION";
        }
    }

    symbol() {
        let line = this.currentInstruction;
        if (line[0] == '(') {
            return line.substring(1,line.indexOf(')'))
        } else if (line[0] == '@') {
            return line.substring(1,line.length);
        }
    }

    dest() {
        let eqIndex = this.currentInstruction.indexOf('=');
        if (eqIndex >= 0) {
            return this.currentInstruction.substring(0, eqIndex);
        } else {
            return "null";
        }
    }

    comp() {
        let eqIndex = this.currentInstruction.indexOf('=');
        let scIndex = this.currentInstruction.indexOf(';');
        if (eqIndex >=0 && scIndex >= 0) {
            return this.currentInstruction.substring(eqIndex+1, scIndex);
        } else if (eqIndex < 0 && scIndex >= 0) {
            return this.currentInstruction.substring(0, scIndex);
        } else if (eqIndex >= 0 && scIndex < 0) {
            return this.currentInstruction.substring(eqIndex+1);
        } else if (eqIndex < 0 && scIndex < 0) {
            return this.currentInstruction;
        }
    }

    jump() {
        let scIndex = this.currentInstruction.indexOf(';');
        if (scIndex >= 0) {
            return this.currentInstruction.substring(scIndex+1);
        } else {
            return "null";
        }
    }
}

const asmFiles = [
                    path.resolve("../nand2tetris/projects/06/add/Add.asm"),
                    path.resolve("../nand2tetris/projects/06/max/Max.asm"),
                    path.resolve("../nand2tetris/projects/06/max/MaxL.asm"),
                    path.resolve("../nand2tetris/projects/06/pong/Pong.asm"),
                    path.resolve("../nand2tetris/projects/06/pong/PongL.asm"),
                    path.resolve("../nand2tetris/projects/06/rect/Rect.asm"),
                    path.resolve("../nand2tetris/projects/06/rect/RectL.asm")
                ];

asmFiles.forEach((filepath) => {
    let symbolTable = JSON.parse(fs.readFileSync('symbolTable.json'));
    let a = new Parser(filepath);
    let writeFilePath = filepath.replace(/\.asm$/,"_my.hack");
    let firstPass = true;
    let allotAddress = 16;
    for (let i=0; i < 2; i++) {
        while (a.hasMoreLines())  {
            a.advance();
            if (a.currentInstruction) {
                if (a.instructionType() == 'A_INSTRUCTION') {
                    if (!firstPass) {
                        let symbol = a.symbol();
                        let binaryLine;
                        if (Object.keys(symbolTable).indexOf(symbol) >= 0) {
                            binaryLine = parseInt(symbolTable[symbol]).toString(2).padStart(16, '0');
                        } else if (!isNaN(symbol)) {
                            binaryLine = parseInt(symbol).toString(2).padStart(16, '0');
                        } else {
                            symbolTable[symbol] = allotAddress;
                            allotAddress++;
                            binaryLine = parseInt(symbolTable[symbol]).toString(2).padStart(16, '0');
                        }
                        fs.appendFileSync(writeFilePath, binaryLine + '\n', { encoding: 'ascii' });
                    }
                } else if (a.instructionType() == 'L_INSTRUCTION') {
                    if (firstPass) {
                        let symbol = a.symbol();
                        symbolTable[symbol] = a.instructionPointer;
                    }
                } else if (a.instructionType() == 'C_INSTRUCTION') {
                    if (!firstPass) {
                        let binaryLine = "111" + compBits[a.comp()] + destBits[a.dest()] + jumpBits[a.jump()];
                        fs.appendFileSync(writeFilePath, binaryLine + '\n', { encoding: 'ascii' });
                    }
                }
            }    
        }
        a.reset();
        firstPass = false;
    }
})