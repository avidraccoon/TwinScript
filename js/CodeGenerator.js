"use strict";
class CodeGenerator {
    constructor() {
        this.generatedCode = "";
        this.customImplementationUsage = new CustomImplementationUsage();
        this.customImplementations = "";
        this.indentation = 0;
    }
    generateCode(parsed_code) {
        this.generatedCode = "";
        this.customImplementations = "";
        this.indentation = 0;
        this.handleWriting(parsed_code);
        return new GeneratedCode(this.customImplementations + this.generatedCode);
    }
    increaseIndent() {
        this.indentation++;
    }
    decreaseIndent() {
        this.indentation--;
    }
    writeEndLine() {
        this.writeCode(";");
        this.newLine();
    }
    handleWriting(code) {
        switch (code.type) {
            case "Program":
                this.handleWriting(code.body);
                break;
            case "Lines":
                for (let line of code.body) {
                    this.handleWriting(line);
                }
                break;
            case "Line":
                this.handleWriting(code.statement);
                break;
            case "SINGLE_LINE_IF":
                this.writeSingleIf(code);
                break;
            case "MULTI_LINE_IF":
                this.writeIf(code);
                break;
            case "SINGLE_LINE_ELSE":
                this.writeSingleElse(code);
                break;
            case "MULTI_LINE_ELSE":
                this.writeElse(code);
                break;
            case "SINGLE_LINE_WHILE":
                this.writeSingleWhile(code);
                break;
            case "MULTI_LINE_WHILE":
                this.writeWhile(code);
                break;
            case "ExpressionStatement":
                this.handleWriting(code.expression);
                this.writeEndLine();
                break;
            case "BinaryExpression":
                this.handleWriting(code.left);
                switch (code.operator) {
                    case "==":
                        this.writeEquals();
                        break;
                    case "!=":
                        this.writeNotEquals();
                        break;
                    case "<=":
                        this.writeLessEquals();
                        break;
                    case ">=":
                        this.writeGreaterEquals();
                        break;
                    case "<":
                        this.writeLess();
                        break;
                    case ">":
                        this.writeGreater();
                        break;
                    case "||":
                        this.writeOr();
                        break;
                    case "&&":
                        this.writeAnd();
                        break;
                    case "+":
                        this.writePlus();
                        break;
                    case "-":
                        this.writeMinus();
                        break;
                    case "*":
                        this.writeMultiply();
                        break;
                    case "/":
                        this.writeDivide();
                        break;
                }
                this.handleWriting(code.right);
                break;
            case "Negate":
                this.writeNegate(code);
                break;
            case "NOT":
                this.writeNot(code);
                break;
            case "Parentheses":
                this.writeParentheses(code);
                break;
            case "FunctionDefinition":
                this.writeFunction(code);
                break;
            case "Variable":
            case "MemberAccess":
                this.handleVariable(code);
                break;
            case "NumericLiteral":
            case "StringLiteral":
                this.writeElse(code.value);
                break;
        }
    }
    handleVariable(code) {
        // @ts-ignore
        if (code.type == "MemberAccess") {
            this.writeMemberAccess(code);
            // @ts-ignore
            this.handleVaraible(code.member_access);
        }
        else {
            this.writeVariable(code);
        }
    }
    writeVariable(code) {
        // @ts-ignore
        this.writeCode(`${code.value}`);
    }
    writeMemberAccess(code) {
        // @ts-ignore
        this.writeCode(`${code.value}.`);
    }
    writeEquals() {
        this.writeCode("==");
    }
    writeNotEquals() {
        this.writeCode("!=");
    }
    writeLessEquals() {
        this.writeCode("<=");
    }
    writeGreaterEquals() {
        this.writeCode(">=");
    }
    writeLess() {
        this.writeCode("<");
    }
    writeGreater() {
        this.writeCode(">");
    }
    writeAnd() {
        this.writeCode("&&");
    }
    writeOr() {
        this.writeCode("||");
    }
    writePlus() {
        this.writeCode("+");
    }
    writeMinus() {
        this.writeCode("-");
    }
    writeNegate(code) {
        this.writeMinus();
        // @ts-ignore
        this.handleWriting(code.inner);
    }
    writeMultiply() {
        this.writeCode("*");
    }
    writeDivide() {
        this.writeCode("/");
    }
    writeParentheses(code) {
        this.writeCode("(");
        // @ts-ignore
        this.handleWriting(code.inner);
        this.writeCode(")");
    }
    writeNot(code) {
        this.writeCode("!");
        // @ts-ignore
        this.handleWriting(code.inner);
    }
    writeCode(text) {
        this.generatedCode += text;
    }
    newLine() {
        this.writeCode("\n");
        for (let i = 0; i < this.indentation; i++) {
            this.writeCode("  ");
        }
    }
    writeFunction(_function) {
    }
    writeIf(_if) {
    }
    writeSingleIf(_if) {
        this.writeIf(_if);
    }
    writeElse(_else) {
    }
    writeSingleElse(_else) {
        this.writeElse(_else);
    }
    writeWhile(_while) {
    }
    writeSingleWhile(_while) {
        this.writeWhile(_while);
    }
    useCustomImplementation(implementation) {
        this.customImplementations += this.customImplementationUsage.useCustomImplemtation(implementation);
    }
}
class JavaScriptCodeGenerator extends CodeGenerator {
    generateCode(parsed_code) {
        this.customImplementationUsage = new CustomImplementationUsage();
        return super.generateCode(parsed_code);
    }
    writeFunction(_function) {
        this.writeCode(`function ${_function.name}(`);
        //TODO handle parameters
        this.writeCode(") {");
        this.newLine();
        //TODO write code
        this.writeCode("}");
        this.newLine();
    }
}
class GeneratedCode {
    constructor(code) {
        this.code = code;
        this.code = code;
    }
}
