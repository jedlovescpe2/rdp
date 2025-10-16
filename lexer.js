/* Simple Lexer Implementation in JavaScript */

function lex(sourceCode) {
  const tokens = [];

  // A list of keywords to check against
  const keywords = ["if", "then", "else", "while"];

  let cursor = 0;
  let line = 1;
  let column = 1;

  const addToken = (type, value) => {
    tokens.push({ type, value: value || type, line, column });
    column += (value || type).length;
  };

  const isDigit = (char) => char >= "0" && char <= "9";
  const isLetter = (char) =>
    (char >= "a" && char <= "z") ||
    (char >= "A" && char <= "Z") ||
    char === "_";
  const isWhitespace = (char) => " \t\r".includes(char);

  while (cursor < sourceCode.length) {
    let char = sourceCode[cursor];

    if (char === "\n") {
      cursor++;
      line++;
      column = 1;
      continue;
    }

    if (isWhitespace(char)) {
      cursor++;
      column++;
      continue;
    }

    // Operators and Delimiters
    const twoCharOp = sourceCode.substring(cursor, cursor + 2);
    if (twoCharOp === "==" || twoCharOp === "!=") {
      addToken(twoCharOp, twoCharOp);
      cursor += 2;
      continue;
    }

    const singleCharTokens = ["<", ">", "=", "(", ")", "{", "}", ";"];
    if (singleCharTokens.includes(char)) {
      addToken(char, char);
      cursor++;
      continue;
    }

    if (isDigit(char)) {
      let num = "";
      const startColumn = column;
      while (cursor < sourceCode.length && isDigit(sourceCode[cursor])) {
        num += sourceCode[cursor];
        cursor++;
      }
      tokens.push({ type: "NUM", value: num, line, column: startColumn });
      column += num.length;
      continue;
    }

    if (isLetter(char)) {
      let word = "";
      const startColumn = column;
      while (
        cursor < sourceCode.length &&
        (isLetter(sourceCode[cursor]) || isDigit(sourceCode[cursor]))
      ) {
        word += sourceCode[cursor];
        cursor++;
      }
      // If the word is a keyword, its type is the word itself. Otherwise, it's an ID.
      const type = keywords.includes(word) ? word : "ID";
      tokens.push({ type, value: word, line, column: startColumn });
      column += word.length;
      continue;
    }

    throw new Error(
      `Lexer Error: Unrecognized character '${char}' at line ${line}, column ${column}`
    );
  }

  return tokens;
}