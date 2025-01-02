const fs = require('fs');
const path = require('path');
const Tokenizer = require('./tokenizer.js');
const SymbolTable = require('./symbolTable.js');
const VMWriter = require('./vmWriter.js');

let charset = JSON.parse(fs.readFileSync('charset.json'));

const dir = [
    //path.resolve("../nand2tetris/projects/11/Average"),
    //path.resolve("../nand2tetris/projects/11/ComplexArrays"),
    //path.resolve("../nand2tetris/projects/11/ConvertToBin"),
    //path.resolve("../nand2tetris/projects/11/Pong"),
    //path.resolve("../nand2tetris/projects/11/Seven"),
    //path.resolve("../nand2tetris/projects/11/Square"),
    path.resolve("../nand2tetris/projects/12/OutputTest"),
];
let filepaths = [];
dir.forEach((dir) => {
    filepaths = filepaths.concat(fs.readdirSync(dir).filter(file => file.endsWith('.jack')).map((each) => path.join(dir, each)));
});


let tokenizerObject;
let currentTokenObj;
let classTable;
let routineTable;
let vmCode;
let className;
let functionName;
let functionKind;
filepaths.forEach((filepath) => {
    let writeFilePath = filepath.replace(/\.jack$/,".vm");

    tokenizerObject = new Tokenizer(filepath);
    currentTokenObj = tokenizerObject.tokens[tokenizerObject.currentToken];

    vmCode = new VMWriter();
    className = path.basename(filepath.replace(/\.jack$/,""));
    compileClass();
    writeString = "";
    vmCode.code.forEach((each) => {
        writeString += each + "\n";
    })
    fs.appendFileSync(writeFilePath, writeString, { encoding: 'ascii' });

    classTable = null;
    routineTable = null;
});

//

function variableCheck(name) {
    let obj = null;
    if (routineTable) {
        routineTable.table.forEach(each => {
            if (each.name === name) {
                obj = each;
            }
        })
        if (obj === null) {
            classTable.table.forEach(each => {
                if (each.name === name) {
                    obj = each;
                }
            })
        }
    } else if (classTable) {
        classTable.table.forEach(each => {
            if (each.name === name) {
                obj = each;
            }
        })
    }
    if (obj != null) {
        if (obj.kind === "FIELD") {
            obj.segment = "this";
        } else if (obj.kind === "STATIC") {
            obj.segment = "static";
        } else if (obj.kind === "ARG") {
            obj.segment = "argument";
        } else if (obj.kind === "VAR") {
            obj.segment = "local";
        }
    }
    return obj;
}

// token pusher generic function
function tokenAdvancer(times) {
    console.log(tokenizerObject.tokens[tokenizerObject.currentToken])
    let i = 0;
    while (i < times) {
        tokenizerObject.advance();
        currentTokenObj = tokenizerObject.tokens[tokenizerObject.currentToken];
        i++;
    }
}

// chain of recursive functions
function compileClass() {
        tokenAdvancer(3); // push class classname {
        compileClassVarDec();
        while (["constructor", "method", "function"].includes(currentTokenObj.value)) {
            compileSubroutine();
        }
        tokenAdvancer(1); // push class classname }
}

function compileClassVarDec() {
    classTable = new SymbolTable();
    while(currentTokenObj.value != 'constructor' && currentTokenObj.value != 'function' && currentTokenObj.value != 'method') {
        let obj = {};
        let flag = "kind";    
        while (currentTokenObj.value != ";") {
            if (flag === "kind") {
                obj.kind = currentTokenObj.value.toUpperCase();
                flag = "type";
            } else if (flag === "type") {
                obj.type = currentTokenObj.value;
                flag = "name";
            } else if (flag === "name" && currentTokenObj.value != ",") {
                obj.name = currentTokenObj.value;
                classTable.define(obj.name, obj.type, obj.kind);
            }
            tokenAdvancer(1); // push class var declaration until ;
        }
        tokenAdvancer(1); // push ; after class var declaration
    }
}

function compileSubroutine() {
    functionKind = currentTokenObj.value;
    if (functionKind === "method") {
        routineTable = new SymbolTable();
        routineTable.define("this", className, "ARG");
    }
    tokenAdvancer(2); // push function/method/constructor void/output type
    functionName = currentTokenObj.value;
    tokenAdvancer(2); // push functionName parameter list opening (
    compileParameterList();
    tokenAdvancer(1); // push functionName parameter list closing )
    compileSubroutineBody();
    routineTable = null;
}

function compileParameterList() {
    let obj = {};
    let flag = "type";
    if (functionKind != "method") {
        routineTable = new SymbolTable();
    }    
    while (currentTokenObj.value != ")") {
        if (currentTokenObj.value === ",") {
            flag = "type";
        } else {
            if (flag === "type") {
                obj.kind = "ARG"
                obj.type = currentTokenObj.value;
                flag = "name";
            } else if (flag === "name") {
                obj.name = currentTokenObj.value;
                routineTable.define(obj.name, obj.type, obj.kind);
            }    
        }
        tokenAdvancer(1); // push parameter list elements before encountering closing )
    }
}

function compileSubroutineBody() {
    tokenAdvancer(1); // push subroutine body opening {
    compileVarDec();
    compileStatements();
    tokenAdvancer(1); // push subroutine body closing }
}

function compileVarDec() {
    let nVars = 0;
    while(!["while", "let", "if", "do", "return"].includes(currentTokenObj.value)) {
        let obj = {};
        let flag = "kind";    
        while (currentTokenObj.value != ";") {
            if (flag === "kind") {
                obj.kind = currentTokenObj.value.toUpperCase();
                flag = "type";
            } else if (flag === "type") {
                obj.type = currentTokenObj.value;
                flag = "name";
            } else if (flag === "name" && currentTokenObj.value != ",") {
                nVars++;
                obj.name = currentTokenObj.value;
                routineTable.define(obj.name, obj.type, obj.kind);
            }
            tokenAdvancer(1); // push subroutine var dec until closing ;
        }
        tokenAdvancer(1); // push closing subroutine var dec closing ;
    }
    vmCode.writeFunction(`${className}.${functionName}`, nVars);
    if (functionKind === "method") {
        vmCode.writePush("argument", 0);
        vmCode.writePop("pointer", 0);
    }
    if (functionKind === "constructor") {
        let fields = classTable.fieldIndex;
        vmCode.writePush("constant", fields);
        vmCode.writeCall("Memory.alloc", 1);
        vmCode.writePop("pointer", 0);
    }
}

function compileStatements() {
    while (currentTokenObj.value != "}") {
        if (currentTokenObj.value === "let") {
            compileLet();
        } else if (currentTokenObj.value === "if") {
            compileIf();
        } else if (currentTokenObj.value === "while") {
            compileWhile();
        } else if (currentTokenObj.value === "do") {
            compileDo();
        } else if (currentTokenObj.value === "return") {
            compileReturn();
        }    
    }
}

function compileLet() {
    //while (currentTokenObj.value != "[" && currentTokenObj.value != "=") {
        tokenAdvancer(1); // push let
        let varObj = variableCheck(currentTokenObj.value);
        tokenAdvancer(1); // push varName
    //}
    if (currentTokenObj.value === "[") {
        vmCode.writePush(varObj.segment, varObj.index);
        tokenAdvancer(1); // push [
        compileExpression();
        vmCode.writeArithematic("add");
        tokenAdvancer(2); // push ]=
        compileExpression();
        vmCode.writePop("temp", 0);
        vmCode.writePop("pointer", 1);
        vmCode.writePush("temp", 0);
        vmCode.writePop("that", 0);
        tokenAdvancer(1); // push ;
    } else if (currentTokenObj.value === "=") {
        tokenAdvancer(1); // push =
        compileExpression();
        vmCode.writePop(varObj.segment, varObj.index);
        tokenAdvancer(1); // push ;
    }
}

function compileIf() {
    let counter = vmCode.counter;
    vmCode.counter += 2;
    tokenAdvancer(2); // push if and opnening (
    compileExpression();
    vmCode.writeArithematic("not");

    
    vmCode.writeIf(`L${counter}`); // write if-goto L0

    tokenAdvancer(2); // push closing ) and opening {
    compileStatements();

    counter++;
    vmCode.writeGoto(`L${counter}`);  // write goto L1

    tokenAdvancer(1); // push closing }
    counter--;
    vmCode.writeLabel(`L${counter}`);   // write label L0
    counter++;
    if (currentTokenObj.value === "else") {
        tokenAdvancer(2); // push else and opnening {
        compileStatements();
        tokenAdvancer(1); // push closing }
    }
    vmCode.writeLabel(`L${counter}`)    // write label L1
}

function compileWhile() {
    let counter = vmCode.counter;
    vmCode.counter += 2;
    tokenAdvancer(2); // push while and opening (
    vmCode.writeLabel(`L${counter}`); // write label L0
    compileExpression();
    vmCode.writeArithematic("not");
    counter++;
    vmCode.writeIf(`L${counter}`); // goes to L1

    tokenAdvancer(2); // push closing ) and opening {
    compileStatements();

    counter--;
    vmCode.writeGoto(`L${counter}`); // goes to L0

    tokenAdvancer(1); // push closing }

    counter++;
    vmCode.writeLabel(`L${counter}`); // write label L1
}

function compileDo() {
    tokenAdvancer(1);
    compileExpressionList();
    tokenAdvancer(1);
    vmCode.writePop("temp", 0);
}

function compileReturn() {
    tokenAdvancer(1); // push return
    if (currentTokenObj.value === ";") {
        tokenAdvancer(1); // push ;
        vmCode.writePush("constant", 0)
        vmCode.writeReturn();
    } else {
        compileExpression();
        tokenAdvancer(1);  // push ;
        vmCode.writeReturn();
    }
}

function compileExpression() {
    var operations = []
    while (currentTokenObj.value != ")" && currentTokenObj.value != ";" && currentTokenObj.value != "]" && currentTokenObj.value != ",") {
        compileTerm();
        if (["+", "-", "*", "/", "&amp;", "|", "&lt;", "&gt;", "="].includes(currentTokenObj.value)) {
            operations.unshift(currentTokenObj.value);
            tokenAdvancer(1);
        }
    }
    operations.forEach((each) => {
        if (each === "+") {
            vmCode.writeArithematic("add");
        } else if (each === "-") {
            vmCode.writeArithematic("sub");
        } else if (each === "*") {
            vmCode.writeCall("Math.multiply", 2);
        } else if (each === "/") {
            vmCode.writeCall("Math.divide", 2);
        } else if (each === "&amp;") {
            vmCode.writeArithematic("and");
        } else if (each === "|") {
            vmCode.writeArithematic("or");
        } else if (each === "&lt;") {
            vmCode.writeArithematic("lt");
        } else if (each === "&gt;") {
            vmCode.writeArithematic("gt");
        } else if (each === "=") {
            vmCode.writeArithematic("eq");
        }
    })
}

function compileTerm() {
    if (tokenizerObject.lookahead(1).value === "[") {
        let varObj = variableCheck(currentTokenObj.value);
        vmCode.writePush(varObj.segment, varObj.index);
        tokenAdvancer(2); // pushes varName and opening [
        compileExpression();
        vmCode.writeArithematic("add");
        tokenAdvancer(1); // pushes closing ]
        vmCode.writePop("pointer", 1);
        vmCode.writePush("that", 0);
    } else if (tokenizerObject.lookahead(1).value === "(" && currentTokenObj.tag === "identifier") {
        let functionName = `${className}.${currentTokenObj.value}`;
        tokenAdvancer(2);
////
        vmCode.writePush("pointer", 0);
////
        let nArgs = compileExpressionList();
        vmCode.writeCall(functionName, nArgs + 1);
        tokenAdvancer(1);
    } else if (tokenizerObject.lookahead(1).value === "." && currentTokenObj.tag === "identifier") {
        let varObj = variableCheck(currentTokenObj.value);
        let nArgs = 0;
        let functionName;
        if (varObj != null) {
            nArgs = 1;
            vmCode.writePush(varObj.segment, varObj.index);
            functionName = varObj.type;
        } else {
            functionName = currentTokenObj.value;
        }
        tokenAdvancer(2);
        functionName = `${functionName}.${currentTokenObj.value}`;
        tokenAdvancer(2);
        nArgs += compileExpressionList();
        tokenAdvancer(1);
        vmCode.writeCall(functionName, nArgs);
    } else if (currentTokenObj.value === "-") {
        tokenAdvancer(1);
        compileTerm();
        vmCode.writeArithematic("neg");
    } else if (currentTokenObj.value === "~") {
        tokenAdvancer(1);
        compileTerm();
        vmCode.writeArithematic("not");
    } else if (currentTokenObj.value === "(") {
        tokenAdvancer(1);
        compileExpression();
        tokenAdvancer(1);
    } else {
        if (currentTokenObj.tag === "integerConstant") {
            vmCode.writePush("constant", currentTokenObj.value);
        } else if (currentTokenObj.tag === "stringConstant") {
            let string = currentTokenObj.value;
            let length = string.length;
            vmCode.writePush("constant", length);
            vmCode.writeCall("String.new", 1);
            let i =0;
            while (i < length) {
                vmCode.writePush("constant", charset[string[i]]);
                vmCode.writeCall("String.appendChar", 2);
                i++;    
            }
        } else {
            let varObj = variableCheck(currentTokenObj.value);
            if (varObj === null && currentTokenObj.value === "this") {
                vmCode.writePush("pointer", 0);
            } else if (varObj === null && currentTokenObj.value === "true") {
                vmCode.writePush("constant", 1);
                vmCode.writeArithematic("neg");
            } else if (varObj === null && (currentTokenObj.value === "false" || currentTokenObj.value === "null")) {
                vmCode.writePush("constant", 0);
            } else {
                vmCode.writePush(varObj.segment, varObj.index);
            }
        }
        tokenAdvancer(1);
    }
}

function compileExpressionList() {
    let count = 0;
    while (currentTokenObj.value != ")" && currentTokenObj.value != ";") {
        compileExpression();
        count++;
        if (currentTokenObj.value === ",") {
            tokenAdvancer(1);
        }
    }
    return count;
}