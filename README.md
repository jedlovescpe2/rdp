# Recursive Descent Parser Demo

This project is a simple, web-based demonstration of a recursive descent parser for a small, educational programming language. It includes a lexer to tokenize the source code and a parser to validate its syntax according to a predefined grammar.

The entire application is built with plain HTML, CSS (via Tailwind CSS), and JavaScript, and can be run directly in any modern web browser.

## Live Demo

You can view a live demo of this project here: [rdp-jed.netlify.app](https://rdp-jed.netlify.app/)

## Features

-   **Recursive Descent Parser:** A handwritten parser that directly implements the language's grammar rules.
-   **Lexer:** A simple tokenizer that converts source code into a stream of tokens.
-   **Web Interface:** An interactive UI to enter code, view the token stream (Lexer Output), and see the validation result (Parser Output).
-   **Syntax Highlighting:** A simple line-numbering system for the code editor.
-   **Error Reporting:** The parser provides clear error messages when it encounters a syntax violation.

## Grammar

The parser is designed to validate the following grammar:

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
*(ε represents an empty production)*

## How to Use

Since this is a static web project, no build step is required.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/jedlovescpe2/rdp
2.  **Navigate to the directory:**
    ```sh
    cd rdp
    ```
3.  **Open the `index.html` file** in your favorite web browser.

You can now type code into the source code editor and click "Parse" to see the results.