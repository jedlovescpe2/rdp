document.addEventListener("DOMContentLoaded", () => {
  // --- Element References ---
  const codeInput = document.getElementById("codeInput");
  const lineNumbers = document.getElementById("lineNumbers");
  const lexerOutput = document.getElementById("lexerOutput");
  const parserOutput = document.getElementById("parserOutput");
  const generateCorrectBtn = document.getElementById("generateCorrectBtn");
  const generateWrongBtn = document.getElementById("generateWrongBtn");

  // --- Example Code Snippets ---
  const correctExamples = [
    `x = 100;`,
    `if (a < 50) then
  b = 1;`,
    `if (status == 1) then {
  x = 10;
  y = 20;
} else {
  x = 0;
}`,
    `a = 5;
b = a;
if (b > 2) then
  c = b;`,
    `while (count > 0) {
  status = 0;
}`,
  ];

  const wrongExamples = [
    `x = 10`, // Missing semicolon
    `if (x > 5 then y = 1;`, // Missing closing parenthesis
    `if (a == b) { c = 1; }`, // Missing 'then'
    `while (i < 10)
  i = i + 1`, // Invalid expression and missing semicolon
    `if (x > 1) then {
  y = 10;
  z = 20;`, // Missing closing brace
  ];

  // --- Core Functions ---
  const parseCode = () => {
    const code = codeInput.value;
    lexerOutput.textContent = "";
    parserOutput.textContent = "";
    parserOutput.classList.remove("text-red-400", "text-green-400");

    if (!code.trim()) {
      lexerOutput.textContent = "Awaiting input...";
      parserOutput.textContent = "Awaiting input...";
      return;
    }

    try {
      // 1. Lexer
      const tokens = lex(code);
      lexerOutput.textContent = tokens
        .map((t) => `( ${t.type}, "${t.value}" )`)
        .join("\n");

      // 2. Parser
      const successMessage = runParser(tokens);
      parserOutput.textContent = successMessage;
      parserOutput.classList.add("text-green-400");
    } catch (error) {
      parserOutput.textContent = `Error: ${error.message}`;
      parserOutput.classList.add("text-red-400");
    }
  };

  const updateLineNumbers = () => {
    const lines = codeInput.value.split("\n").length;
    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join("\n");
    lineNumbers.scrollTop = codeInput.scrollTop;
  };

  const populateTextarea = (examples) => {
    const randomIndex = Math.floor(Math.random() * examples.length);
    codeInput.value = examples[randomIndex].trim();
    updateLineNumbers();
    parseCode(); // Automatically parse after populating
  };

  // --- Event Listeners ---
  codeInput.addEventListener("input", () => {
    updateLineNumbers();
    parseCode(); // Automatically parse on input
  });

  codeInput.addEventListener("scroll", () => {
    lineNumbers.scrollTop = codeInput.scrollTop;
  });


  generateCorrectBtn.addEventListener("click", () => {
    populateTextarea(correctExamples);
  });

  generateWrongBtn.addEventListener("click", () => {
    populateTextarea(wrongExamples);
  });

  // --- Initial Setup ---
  updateLineNumbers();
  parseCode(); // Parse the initial code on load
});