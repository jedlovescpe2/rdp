/* Simple Recursive Descent Parser Implementation in JavaScript */

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
  }

  // --- CORE HELPER METHODS --- //

  peek() {
    // Return the current token without advancing the cursor
    return this.tokens[this.current];
  }

  // Advance the cursor and return the current token
  advance() {
    this.current++;
    return this.tokens[this.current - 1];
  }

  // Match the current token against the expected type
  match(expectedType) {
    const currentToken = this.peek();
    if (currentToken?.type === expectedType) {
      return this.advance();
    }

    const foundType = currentToken?.type || "end of file";
    throw new Error(
      `Syntax Error: Expected '${expectedType}' but found '${foundType}'`
    );
  }

  // --- RDP SUBPROGRAMS --- //

  parseStatement() {
    switch (this.peek()?.type) {
      case "if":
        this.match("if");
        this.match("(");
        this.parseCondition();
        this.match(")");
        this.match("then");
        this.parseStatement();
        this.parseElsePart();
        break;
      case "while":
        this.match("while");
        this.match("(");
        this.parseCondition();
        this.match(")");
        this.parseStatement();
        break;
      case "ID":
        this.match("ID");
        this.match("=");
        this.parseExpression();
        this.match(";");
        break;
      case "{":
        this.match("{");
        this.parseStatementList();
        this.match("}");
        break;
      default:
        const unexpected = this.peek();
        const foundType = unexpected?.type || "end of file";
        throw new Error(`Syntax Error: Unexpected token '${foundType}'`);
    }
  }


  parseElsePart() {
    if (this.peek()?.type === "else") {
      this.match("else");
      this.parseStatement();
    }
  }

  parseStatementList() {
    const statementStartTokens = ["if", "while", "ID", "{"];
    while (this.peek() && statementStartTokens.includes(this.peek().type)) {
      this.parseStatement();
    }
  }

    parseCondition() {
    this.parseExpression();
    this.parseRelOp();
    this.parseExpression();
  }

   parseRelOp() {
    const next = this.peek();
    const validOperators = ["<", ">", "==", "!="];
    if (next && validOperators.includes(next.type)) {
      this.advance();
    } else {
      throw new Error(
        `Syntax Error: Expected relational operator but found '${foundType}'`
      );
    }
  }

  parseExpression() {
    const next = this.peek();
    if (next?.type === "ID" || next?.type === "NUM") {
      this.advance();
    } else {
      throw new Error(
        `Syntax Error: Expected ID or NUM but found '${foundType}'`
      );
    }
  }
}
