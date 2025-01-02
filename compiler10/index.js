const fs = require('fs');
const path = require('path');
const Tokenizer = require('./tokenizer.js');

const dir = [
    path.resolve("../nand2tetris/projects/10/ArrayTest"),
    path.resolve("../nand2tetris/projects/10/ExpressionLessSquare"),
    path.resolve("../nand2tetris/projects/10/Square"),
];
let filepaths = [];
dir.forEach((dir) => {
    filepaths = filepaths.concat(fs.readdirSync(dir).filter(file => file.endsWith('.jack')).map((each) => path.join(dir, each)));
});


let tokenizerObject;
let compilationObjectArray = [];
let currentTokenObj;

filepaths.forEach((filepath) => {
    //let filepath = path.resolve("/Users/macos/Desktop/okotoksWebDesign/nandToTetris/nand2tetris/projects/10/Square/SquareGame.jack");
    // writing token file
    let fileName = path.basename(filepath.replace(/\.jack$/,"_T_my.xml"));
    let writeFilePath = path.join(filepath, '..', "my_files", fileName);

    tokenizerObject = new Tokenizer(filepath);
    let fileTokenSortedArray = tokenizerObject.tokens;
    let writeString = "<tokens>";
    fileTokenSortedArray.forEach((each) => {
        writeString += `\n<${each.tag}> ${each.value} </${each.tag}>`
    })
    writeString += `\n</tokens>`;
    fs.appendFileSync(writeFilePath, writeString, { encoding: 'ascii' });

    // writing xml file
    fileName = path.basename(filepath.replace(/\.jack$/,"_my.xml"));
    writeFilePath = path.join(filepath, '..', "my_files", fileName);
    currentTokenObj = tokenizerObject.tokens[tokenizerObject.currentToken];
    while(tokenizerObject.hasMoreTokens()) {
        compileClass();
    }
    writeString = "";
    compilationObjectArray.forEach((each) => {
        if (each.value) {
            writeString += `<${each.tag}> ${each.value} </${each.tag}>\n`
        } else {
            writeString += `<${each.tag}>\n`
        }
    })
    fs.appendFileSync(writeFilePath, writeString, { encoding: 'ascii' });
    compilationObjectArray = [];
});

function tokenPusher(times) {
    let i = 0;
    while (i < times) {
        compilationObjectArray.push({
            "tag": tokenizerObject.tokens[tokenizerObject.currentToken]["tag"],
            "value": tokenizerObject.tokens[tokenizerObject.currentToken]["value"]
        });
        tokenizerObject.advance();
        currentTokenObj = tokenizerObject.tokens[tokenizerObject.currentToken];
        i++;
    }
}

function compileClass() {
    if (currentTokenObj.tag === 'keyword' && currentTokenObj.value === 'class') {
        compilationObjectArray.push({"tag": "class", "value": null});
        tokenPusher(3);
        compileClassVarDec();
        while (["constructor", "method", "function"].includes(currentTokenObj.value)) {
            compileSubroutine();
        }
        tokenPusher(1);
        compilationObjectArray.push({"tag": "/class", "value": null});
    } else {
        console.log("Error compiling class.");
    }
}

function compileClassVarDec() {
    if (currentTokenObj.tag === 'keyword' && (currentTokenObj.value === 'static' || currentTokenObj.value === 'field')) {
        while(currentTokenObj.value != 'constructor' && currentTokenObj.value != 'function' && currentTokenObj.value != 'method') {
            compilationObjectArray.push({"tag": "classVarDec", "value": null});
            while (currentTokenObj.value != ";") {
                tokenPusher(1);
            }
            tokenPusher(1);
            compilationObjectArray.push({"tag": "/classVarDec", "value": null});
        }
    } else {
        console.log("Not compiling class variable declaration.");
    }
}

function compileSubroutine() {
    compilationObjectArray.push({"tag": "subroutineDec", "value": null});
    tokenPusher(4);
    compileParameterList();
    tokenPusher(1);
    compileSubroutineBody();
    compilationObjectArray.push({"tag": "/subroutineDec", "value": null});

}

function compileParameterList() {
    compilationObjectArray.push({"tag": "parameterList", "value": null});
    while (currentTokenObj.value != ")") {
        tokenPusher(1);
    }
    compilationObjectArray.push({"tag": "/parameterList", "value": null});
}

function compileSubroutineBody() {
    compilationObjectArray.push({"tag": "subroutineBody", "value": null});
    tokenPusher(1);
    compileVarDec();
    compileStatements();
    tokenPusher(1);
    compilationObjectArray.push({"tag": "/subroutineBody", "value": null});
}

function compileVarDec() {
    if (currentTokenObj.tag === 'keyword' && currentTokenObj.value === 'var') {
        while(!["while", "let", "if", "do", "return"].includes(currentTokenObj.value)) {
            compilationObjectArray.push({"tag": "varDec", "value": null});
            while (currentTokenObj.value != ";") {
                tokenPusher(1);
            }
            tokenPusher(1);
            compilationObjectArray.push({"tag": "/varDec", "value": null});
        }
    } else {
        console.log("Not compiling subroutine variable declaration.");
    }
}

function compileStatements() {
    compilationObjectArray.push({"tag": "statements", "value": null});
    while (currentTokenObj.value != "}") {  // ensure all statement closing } are handled before returning control
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
    compilationObjectArray.push({"tag": "/statements", "value": null});
}

function compileLet() {
    compilationObjectArray.push({"tag": "letStatement", "value": null});
    while (currentTokenObj.value != "[" && currentTokenObj.value != "=") {
        tokenPusher(1)
    }
    if (currentTokenObj.value === "[") {
        tokenPusher(1); // push [
        compileExpression();
        tokenPusher(2); // push ]=
        compileExpression();
        tokenPusher(1); // push ;
    } else if (currentTokenObj.value === "=") {
        tokenPusher(1); // push =
        compileExpression();
        tokenPusher(1); // push ;
    }
    compilationObjectArray.push({"tag": "/letStatement", "value": null});
}

function compileIf() {
    compilationObjectArray.push({"tag": "ifStatement", "value": null});
    tokenPusher(2);
    compileExpression();
    tokenPusher(2);
    compileStatements();
    tokenPusher(1);
    if (currentTokenObj.value === "else") {
        tokenPusher(2);
        compileStatements();
        tokenPusher(1);
    }
    compilationObjectArray.push({"tag": "/ifStatement", "value": null});
}

function compileWhile() {
    compilationObjectArray.push({"tag": "whileStatement", "value": null});
    tokenPusher(2);
    compileExpression();
    tokenPusher(2);
    compileStatements();
    tokenPusher(1);
    compilationObjectArray.push({"tag": "/whileStatement", "value": null});
}

function compileDo() {
    compilationObjectArray.push({"tag": "doStatement", "value": null});
    while (currentTokenObj.value != "(") {
        tokenPusher(1);
    }
    tokenPusher(1);
    compileExpressionList();
    tokenPusher(2);
    compilationObjectArray.push({"tag": "/doStatement", "value": null});
}

function compileReturn() {
    compilationObjectArray.push({"tag": "returnStatement", "value": null});
    tokenPusher(1);
    if (currentTokenObj.value === ";") {
        tokenPusher(1);
    } else {
        compileExpression();
        tokenPusher(1);
    }
    compilationObjectArray.push({"tag": "/returnStatement", "value": null});
}

function compileExpression() {
    compilationObjectArray.push({"tag": "expression", "value": null});
    while (currentTokenObj.value != ")" && currentTokenObj.value != ";" && currentTokenObj.value != "]" && currentTokenObj.value != ",") {
        compileTerm();
        if (["+", "-", "*", "/", "&amp;", "|", "&lt;", "&gt;", "="].includes(currentTokenObj.value)) {
            tokenPusher(1);
        }
    }
    compilationObjectArray.push({"tag": "/expression", "value": null});
}

function compileTerm() {
    compilationObjectArray.push({"tag": "term", "value": null});
    if (tokenizerObject.lookahead(1).value === "[") {
        tokenPusher(2);
        compileExpression();
        tokenPusher(1);
    } else if (tokenizerObject.lookahead(1).value === "(" && currentTokenObj.tag === "identifier") {
        tokenPusher(2);
        compileExpressionList();
        tokenPusher(1);
    } else if (tokenizerObject.lookahead(1).value === "." && currentTokenObj.tag === "identifier") {
        tokenPusher(4);
        compileExpressionList();
        tokenPusher(1);
    } else if (["-", "~"].includes(currentTokenObj.value)) {
        tokenPusher(1);
        compileTerm();
    } else if (currentTokenObj.value === "(") {
        tokenPusher(1);
        compileExpression();
        tokenPusher(1);
    } else {
        tokenPusher(1);
    }
    compilationObjectArray.push({"tag": "/term", "value": null});
}

function compileExpressionList() {
    let count = 0;
    compilationObjectArray.push({"tag": "expressionList", "value": null});
    while (currentTokenObj.value != ")") {
        compileExpression();
        count++;
        if (currentTokenObj.value === ",") {
            tokenPusher(1);
        }
    }
    compilationObjectArray.push({"tag": "/expressionList", "value": null});
    return count;
}
