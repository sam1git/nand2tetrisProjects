class codeWriter {

    static commandSign = {
                            'add': '+',
                            'sub': '-',
                            'and': '&',
                            'or': '|',
                            'neg': '-',
                            'not': '!',
                            'eq': 'JEQ',
                            'gt': 'JGT',
                            'lt': 'JLT',
                        };
    static labelSuffix = -1;

    constructor(filename, comment, cmdType, arg1, arg2) {
        this.filename = filename;
        this.cmdType = cmdType;
        if (arg2 != null) {
            this.comment = '// ' + comment;
            this.arg1 = arg1;
            this.arg2 = arg2;
        } else {
            this.arg1 = arg1;
        }
    }

    reset() {
        codeWriter.labelSuffix = -1;
    }

    writeArithematic() {
        if (this.cmdType === 'C_PUSH' || this.cmdType === 'C_POP') {
            return `${this.comment}${this.writePushPop()}`;
        } else {
            let sign = codeWriter.commandSign[this.arg1];

            if (this.arg1 === 'add' || this.arg1 === 'sub' || this.arg1 === 'and' || this.arg1 === 'or') {
                return `@SP\nM=M-1\nA=M\nD=M\n@R13\nM=D\n@SP\nM=M-1\nA=M\nD=M\n@R13\nD=D${sign}M\n@SP\nA=M\nM=D\n@SP\nM=M+1\n`;
            } else if (this.arg1 === 'neg' || this.arg1 === 'not') {
                return `@SP\nM=M-1\nA=M\nM=${sign}M\n@SP\nM=M+1\n`
            } else if (this.arg1 === 'eq' || this.arg1 === 'gt' || this.arg1 === 'lt') {
                codeWriter.labelSuffix++;
                return `@START.${codeWriter.labelSuffix}
                    0;JMP
                (TRUE.${codeWriter.labelSuffix})
                    D=-1
                    @MYEND.${codeWriter.labelSuffix}
                    0;JMP
                (START.${codeWriter.labelSuffix})
                    @SP
                        M=M-1
                        A=M
                        D=M
                    @R13
                        M=D
                    @SP
                        M=M-1
                        A=M
                        D=M
                    @R13
                        D=D-M
                    @TRUE.${codeWriter.labelSuffix}
                        D;${sign}
                        D=0
                    (MYEND.${codeWriter.labelSuffix})
                        @SP
                        A=M
                        M=D
                        @SP
                        M=M+1`;
            }
        }
    }

    writePushPop() {
        let keyword;
        if (this.cmdType === 'C_PUSH') {
            if (this.arg1 === 'argument') {
                keyword = 'ARG';
            } else if (this.arg1 === 'local') {
                keyword = 'LCL';
            } else if (this.arg1 === 'static') {
                return `@${this.filename}.${this.arg2}\nD=M\n@SP\nA=M\nM=D\n@SP\nM=M+1\n`; // checked
            } else if (this.arg1 === 'constant') {
                return `@${this.arg2}\nD=A\n@SP\nA=M\nM=D\n@SP\nM=M+1\n` // checked
            } else if (this.arg1 === 'this') {
                keyword = 'THIS';
            } else if (this.arg1 === 'that') {
                keyword = 'THAT';
            } else if (this.arg1 === 'temp') {
                return `@${this.arg2}\nD=A\n@5\nA=D+A\nD=M\n@SP\nA=M\nM=D\n@SP\nM=M+1\n`
            } else if (this.arg1 === 'pointer') {
                if (this.arg2 == 0) {
                    keyword = 'THIS'
                } else {
                    keyword = 'THAT'
                }
                return `\n@${keyword}\nD=M\n@SP\nA=M\nM=D\n@SP\nM=M+1\n`;
            }
            return `@${keyword}\nD=M\n@${this.arg2}\nA=A+D\nD=M\n@SP\nA=M\nM=D\n@SP\nM=M+1\n`  // checked
        } else {
            if (this.arg1 === 'argument') {
                keyword = 'ARG';
            } else if (this.arg1 === 'local') {
                keyword = 'LCL';
            } else if (this.arg1 === 'static') {
                return `@SP\nM=M-1\nA=M\nD=M\n@${this.filename}.${this.arg2}\nM=D\n`; // checked
            } else if (this.arg1 === 'this') {
                keyword = 'THIS';
            } else if (this.arg1 === 'that') {
                keyword = 'THAT';
            } else if (this.arg1 === 'temp') {
                return `@${this.arg2}\nD=A\n@5\nD=D+A\n@R13\nM=D\n@SP\nM=M-1\nA=M\nD=M\n@R13\nA=M\nM=D\n`
            } else if (this.arg1 === 'pointer') {
                if (this.arg2 == 0) {
                    keyword = 'THIS'
                } else {
                    keyword = 'THAT'
                }
                return `\n@SP\nM=M-1\nA=M\nD=M\n@${keyword}\nM=D\n`;
            }
            return `@${this.arg2}\nD=A\n@R13\nM=D\n@${keyword}\nD=M\n@R13\nM=M+D\n@SP\nM=M-1\nA=M\nD=M\n@R13\nA=M\nM=D\n` // checked    
        }
    }

    writeEndLoop() {
        return '(END)\n@END\n0;JMP'
    }

}

module.exports = codeWriter;