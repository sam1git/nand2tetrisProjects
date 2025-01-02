const fs = require('fs');
const path = require('path');
const Parser = require('./parser.js');
const codeWriter = require('./codeWriter.js')

// parser used only works for calls and functions with single digit nArgs and nVars

const vmDir = [
    path.resolve("../nand2tetris/projects/08/FunctionCalls/FibonacciElement"),
    path.resolve("../nand2tetris/projects/08/FunctionCalls/NestedCall"),
    path.resolve("../nand2tetris/projects/08/FunctionCalls/SimpleFunction"),
    path.resolve("../nand2tetris/projects/08/FunctionCalls/StaticsTest"),
    path.resolve("../nand2tetris/projects/08/ProgramFlow/BasicLoop"),
    path.resolve("../nand2tetris/projects/08/ProgramFlow/FibonacciSeries"),
];

vmDir.forEach((dir) => {
    let writeFilePath = path.join(dir, path.basename(dir) + ".asm");
    let files = fs.readdirSync(dir).filter(file => file.endsWith('.vm')).map((each) =>path.join(dir, each));
    files.forEach((each) => {
        if (each.includes('Sys.vm')) {
            let chunk = new codeWriter('sys', 'call Sys.init 0', 'CALL', 'Sys.init', 0);
            asmString = chunk.writeCall().replace(/ /g,'') + '\n\n'
            fs.appendFileSync(writeFilePath, `@256\nD=A\n@SP\nM=D\n\n` + asmString, { encoding: 'ascii' });
        }
    })

    files.forEach((filepath) => {
        let fileTextString = new Parser(filepath);
        while(fileTextString.hasMoreLines()) {
            fileTextString.advance();
            let inst = fileTextString.currentInstruction;
            let filename = filepath.substring(filepath.lastIndexOf('/') + 1, filepath.lastIndexOf('.')).toLocaleLowerCase();
            let cmdType = fileTextString.commandType();
            let arg1 = fileTextString.arg1();
            let arg2 = fileTextString.arg2();
            let chunk = new codeWriter(filename, inst, cmdType, arg1, arg2);
            let asmString;
            if (chunk.cmdType === 'C_PUSH' || chunk.cmdType === 'C_POP') {
                asmString = chunk.writePushPop();
            } else if (chunk.cmdType === 'C_ARITHEMATIC') {
                asmString = chunk.writeArithematic().replace(/ /g,'');
            } else if (chunk.cmdType === 'LABEL') {
                asmString = chunk.writeLabel();
            } else if (chunk.cmdType === 'GOTO') {
                asmString = chunk.writeGoto();
            } else if (chunk.cmdType === 'IFGOTO') {
                asmString = chunk.writeIf();
            } else if (chunk.cmdType === 'CALL') {
                asmString = chunk.writeCall().replace(/ /g,'');
            } else if (chunk.cmdType === 'FUNCTION') {
                codeWriter.functionName = arg1;
                asmString = chunk.writeFunction().replace(/ /g,'');
            } else if (chunk.cmdType === 'RETURN') {
                asmString = chunk.writeReturn().replace(/ /g,'');
                codeWriter.functionName = null;
            }
            fs.appendFileSync(writeFilePath, asmString + '\n', { encoding: 'ascii' });
        }
    })
    codeWriter.reset();
});