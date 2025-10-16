document.addEventListener("DOMContentLoaded", () => {
  const codeInput = document.getElementById("codeInput");
  const lineNumbers = document.getElementById("lineNumbers");
  const parseButton = document.getElementById("parseButton");
  const lexerOutput = document.getElementById("lexerOutput");
  const parserOutput = document.getElementById("parserOutput");

  const updateLineNumbers = () => {
    const lines = codeInput.value.split("\n");
    lineNumbers.innerHTML = Array.from(
      { length: lines.length },
      (_, i) => i + 1
    ).join("\n");
    // Sync scroll
    lineNumbers.scrollTop = codeInput.scrollTop;
  };

  codeInput.addEventListener("input", updateLineNumbers);
  codeInput.addEventListener("scroll", () => {
    lineNumbers.scrollTop = codeInput.scrollTop;
  });

  // Initial line numbers
  updateLineNumbers();

  parseButton.addEventListener("click", () => {
    const code = codeInput.value;
    lexerOutput.textContent = "";
    parserOutput.textContent = "";

    try {
      // 1. Lexer
 const tokens = lex(code);
      lexerOutput.textContent = tokens
        .map((t) => `( ${t.type}, "${t.value}" )`)
        .join("\n");

      // 2. Parser - Call the standalone function
      const successMessage = runParser(tokens);

      parserOutput.textContent = successMessage;
      parserOutput.classList.remove("text-red-400");

    } catch (error) {
      parserOutput.textContent = `Error: ${error.message}`;
      parserOutput.classList.add("text-red-400");
    }
  });
});
