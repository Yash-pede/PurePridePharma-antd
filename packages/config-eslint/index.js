module.exports = {
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["react-refresh", "@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "react-refresh/only-export-components": "warn",
  },
};
