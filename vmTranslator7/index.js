const fs = require('fs');
const path = require('path');
const Parser = require('./parser.js');
const codeWriter = require('./codeWriter.js')

const vmFiles = [
    path.resolve("../nand2tetris/projects/07/MemoryAccess/BasicTest/BasicTest.vm"),
    path.resolve("../nand2tetris/projects/07/MemoryAccess/PointerTest/PointerTest.vm"),
    path.resolve("../nand2tetris/projects/07/MemoryAccess/StaticTest/StaticTest.vm"),
    path.resolve("../nand2tetris/projects/07/StackArithmetic/SimpleAdd/SimpleAdd.vm"),
    path.resolve("../nand2tetris/projects/07/StackArithmetic/StackTest/StackTest.vm"),
];


vmFiles.forEach((filepath) => {
    let writeFilePath = filepath.replace(/\.vm$/,".asm");
    let fileTextString = new Parser(filepath);
    let chunk;
    while(fileTextString.hasMoreLines()) {
        fileTextString.advance();
        let inst = fileTextString.currentInstruction;
        let filename = filepath.substring(filepath.lastIndexOf('/') + 1, filepath.lastIndexOf('.')).toLocaleLowerCase();
        let cmdType = fileTextString.commandType();
        let arg1 = fileTextString.arg1();
        let arg2 = fileTextString.arg2();
        chunk = new codeWriter(filename, inst, cmdType, arg1, arg2);
        let asmString;
        if (chunk.cmdType === 'C_PUSH' || chunk.cmdType === 'C_POP') {
            asmString = chunk.writePushPop();
        } else {
            asmString = chunk.writeArithematic().replace(/ /g,'');
        }
        fs.appendFileSync(writeFilePath, asmString + '\n', { encoding: 'ascii' });
    }
    fs.appendFileSync(writeFilePath, chunk.writeEndLoop() + '\n', { encoding: 'ascii' });
    chunk.reset();
});