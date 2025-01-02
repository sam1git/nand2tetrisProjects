class SymbolTable {
    constructor() {
        this.table = [];
        this.staticIndex = 0;
        this.fieldIndex = 0;
        this.argIndex = 0;
        this.varIndex = 0;
    }

    reset() {
        this.name = [];
        this.fieldIndex = 0;
        this.staticIndex = 0;
        this.argIndex = 0;
        this.varIndex = 0;
    }

    define(name, type, kind) {
        let index;
        if (kind === "STATIC") {
            index = this.staticIndex++;
        } else if (kind === "FIELD") {
            index = this.fieldIndex++;
        } else if (kind === "ARG") {
            index = this.argIndex++;
        } else if (kind === "VAR") {
            index = this.varIndex++;
        }
        if (["STATIC", "FIELD", "ARG", "VAR"].includes(kind)) {
            this.table.push({
                "name": name,
                "type": type,
                "kind": kind,
                "index": index
            });   
        } else {
            throw new Error("Symbol type ill-defined.");
        }
    }

    varCount(kind) {
        if (kind === "STATIC") {
            return this.staticIndex;
        } else if (kind === "FIELD") {
            return this.fieldIndex;
        } else if (kind === "ARG") {
            return this.argIndex;
        } else if (kind === "VAR") {
            return this.varIndex;
        }
    }

    kindOf(name) {
        this.table.forEach((each) => {
            if (each.name === name) {
                return each.kind;
            }
        })
        return "NONE";
    }

    typeOf(name) {
        this.table.forEach((each) => {
            if (each.name === name) {
                return each.type;
            }
        })
        return "NONE";
    }

    indexOf(name) {
        this.table.forEach((each) => {
            if (each.name === name) {
                return each.index;
            }
        })
        return "NONE";
    }
}

module.exports = SymbolTable;