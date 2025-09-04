/*module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'], // Exécute ESLint et Prettier sur les fichiers TypeScript.
};*/
module.exports = {
  'src/**/*.ts': ['eslint', 'prettier --write'],
  'tests/**/*.ts': ['eslint', 'prettier --write'],
  // Ajoutez d'autres règles lint-staged si nécessaire
};
