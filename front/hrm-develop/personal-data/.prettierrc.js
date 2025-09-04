module.exports = {
  // Use single quotes instead of double quotes.
  singleQuote: true,
  // Add trailing commas where valid in ES5 (objects, arrays, etc.).
  trailingComma: 'es5',
  // Use 2 spaces for indentation.
  tabWidth: 2,
  // Wrap lines at 100 characters.
  printWidth: 100,
  // Disallow console.log statements.
  noConsole: 'error',
  // Enforce the use of === and !== instead of == and !=.
  eqeqeq: 'error',
  // Enforce consistent spacing around keywords.
  keywordSpacing: 'error',
  // Apply these options to all *.tsx files.
  overrides: [
    {
      files: '*.ts',
      options: {
        // Use the TypeScript parser.
        parser: 'typescript',
        // Wrap lines at 100 characters.
        printWidth: 100,
        // Use single quotes instead of double quotes.
        singleQuote: true,
        // Add trailing commas where valid in ES5 (objects, arrays, etc.).
        trailingComma: 'es5',
        // Disallow console.log statements.
        noConsole: 'error',
        // Enforce the use of === and !== instead of == and !=.
        eqeqeq: 'error',
        // Enforce consistent spacing around keywords.
        keywordSpacing: 'error',
        // Enforces two spaces for indentation.
        indent: ['error', 2],
        // Do not require semicolons.
        semi: false,
        // Enforce consistent spacing around unary operators.
        spaceUnaryOps: 'error'
      },
    },
  ],
}