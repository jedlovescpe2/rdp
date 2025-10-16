// parser.js

/*
 * Recursive Descent Parser (RDP) Implementation in JavaScript
 * Each function corresponds to a nonterminal in the grammar provided.
 */

// --- Parser State & Helpers ---

// These variables will hold the token stream and the parser's current position.
let tokens = [];
let current = 0;

// Looks at the next token without consuming it.
function peek() {
  return tokens[current];
}

// Advances the cursor and returns the current token.
function advance() {
  current++;
  return tokens[current - 1];
}

// Checks if the current token matches the expected type.
// If it does, it consumes it. If not, it throws a syntax error.
function match(expectedType) {
  const currentToken = peek();
  if (currentToken?.type === expectedType) {
    return advance();
  }
  const foundType = currentToken?.type || "end of file";
  throw new Error(
    `Syntax Error: Expected '${expectedType}' but found '${foundType}'`
  );
}

// --- RDP SUBPROGRAMS --- //

// Grammar: Statement -> if ( Condition ) then Statement ElsePart | while ...
function parseStatement() {
  switch (peek()?.type) {
    case "if":
      match("if");
      match("(");
      parseCondition();
      match(")");
      match("then");
      parseStatement();
      parseElsePart();
      break;
    case "while":
      match("while");
      match("(");
      parseCondition();
      match(")");
      parseStatement();
      break;
    case "ID":
      match("ID");
      match("=");
      parseExpression();
      match(";");
      break;
    case "{":
      match("{");
      parseStatementList();
      match("}");
      break;
    default:
      const unexpected = peek();
      throw new Error(
        `Syntax Error: Unexpected token ${unexpected?.type || "end of file"}`
      );
  }
}

// Grammar: ElsePart -> else Statement | ε
function parseElsePart() {
  if (peek()?.type === "else") {
    match("else");
    parseStatement();
  }
  // If no "else" is found, do nothing (this handles the ε case).
}

// Grammar: StatementList -> Statement StatementList | ε
function parseStatementList() {
  const statementStartTokens = ["if", "while", "ID", "{"];
  // Keep parsing statements as long as we see a token that can start one. 
  // Zero or more Statement in the sequence. 
  while (peek() && statementStartTokens.includes(peek().type)) {
    parseStatement();
  }
  // If no statement-starting token is found, do nothing (this handles the ε case).
}

// Grammar: Condition -> id RelOp id (Implemented as Expression RelOp Expression)
function parseCondition() {
  parseExpression();
  parseRelOp();
  parseExpression();
}

// Grammar: RelOp -> < | > | == | !=
function parseRelOp() {
  const next = peek();
  const validOperators = ["<", ">", "==", "!="];
  if (next && validOperators.includes(next.type)) {
    advance();
  } else {
    throw new Error(
      `Syntax Error: Expected relational operator but found ${
        next?.type || "end of file"
      }`
    );
  }
}

// Grammar: Expression -> id | num
function parseExpression() {
  const next = peek();
  if (next?.type === "ID" || next?.type === "NUM") {
    advance();
  } else {
    throw new Error(
      `Syntax Error: Expected ID or NUM but found ${
        next?.type || "end of file"
      }`
    );
  }
}

// --- Main Entry Point --- //

// To run the parser, call this function with the provided array of tokens.
function runParser(inputTokens) {
  tokens = inputTokens;
  current = 0;

  // Start parsing from the top-level rule: StatementList
  parseStatementList();

  // After parsing, check if there are any unconsumed tokens left.
  if (peek()) {
    const leftover = peek();
    throw new Error(
      `Syntax Error: Unexpected token '${leftover.type}' at end of input.`
    );
  }

  return "Parsing successful! The code is syntactically correct.";
}
