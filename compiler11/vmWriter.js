class VMWriter {
    constructor() {
        this.code = [];
        this.counter = 0;
    }

    writePush(segment, index) {
        this.code.push(`push ${segment.toLowerCase()} ${index}`);
    }

    writePop(segment, index) {
        this.code.push(`pop ${segment.toLowerCase()} ${index}`);
    }

    writeArithematic(cmd) {
        this.code.push(`${cmd.toLowerCase()}`);
    }

    writeLabel(string) {
        this.code.push(`label ${string}`);
    }

    writeGoto(string) {
        this.code.push(`goto ${string}`);
    }

    writeIf(string) {
        this.code.push(`if-goto ${string}`);
    }

    writeCall(string, nArgs) {
        this.code.push(`call ${string} ${nArgs}`);
    }

    writeFunction(string, nVars) {
        this.code.push(`function ${string} ${nVars}`);
    }

    writeReturn() {
        this.code.push("return");
    }

}

module.exports = VMWriter;