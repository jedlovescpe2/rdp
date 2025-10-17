# Recursive Descent Parser

This project is a web-based, interactive demonstration of a **Recursive Descent Parser (RDP)** for a simple, C-like programming language. It provides a hands-on environment to visualize the two core phases of a compiler's front-end: lexical analysis and syntactic analysis.

The entire application is built with vanilla HTML, JavaScript, and Tailwind CSS, running directly in the browser with no dependencies.

## Live Demo

**Try it live:** [**rdp-jed.netlify.app**](https://rdp-jed.netlify.app/)

## Features

-   **Live Code Editor**: Write code in a simple editor with line numbers.
-   **Real-time Analysis**: The code is automatically parsed as you type, providing instant feedback.
-   **Dual Output**: Clearly see the output from both the **Lexer** (token stream) and the **Parser** (syntax validation).
-   **Example Generators**: Instantly load correct or incorrect code snippets to test the parser's behavior.
-   **Clear Error Reporting**: The parser identifies syntax errors and reports what it expected vs. what it found.

## How It Works

The application demonstrates a two-stage process:

1.  **Lexical Analysis (`lexer.js`)**: The **Lexer** scans the raw source code and breaks it down into a sequence of "tokens." Each token is a meaningful unit, like a keyword (`if`), an identifier (`x`), an operator (`>`), or a number (`100`).

2.  **Syntactic Analysis (`parser.js`)**: The **Parser** takes this stream of tokens and validates its structure against a predefined grammar. It uses a "Recursive Descent" strategy, where each grammar rule is implemented as a function that may recursively call other functions to process nested structures.

## Language Grammar

The parser is designed to validate the following context-free grammar:

```
Statement      -> if ( Condition ) then Statement ElsePart
                | while ( Condition ) Statement
                | id = Expression ;
                | { StatementList }

ElsePart       -> else Statement | ε

StatementList  -> Statement StatementList | ε

Condition      -> Expression RelOp Expression

RelOp          -> < | > | == | !=

Expression     -> id | num
```
*(Note: ε represents an empty production, meaning the rule can produce nothing.)*
