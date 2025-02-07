import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": ts,
      "prettier": true,
      "eslint-plugin-tsdoc": true,
      "eslint-plugin-tsdoc-comment": true,
      "eslint-plugin-tsdoc-comment-format": true,
      "eslint-plugin-tsdoc-type": true,
      "eslint-plugin-tsdoc-type-format": true,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "no-console": "off",
      semi: ["off", "always"],
      quotes: ["off", "double"],
    },
  },
];
