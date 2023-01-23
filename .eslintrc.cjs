// it's safe to ignore the ESLint parsing error here
module.exports = {
  env: {
    mocha: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: `./tsconfig.json`,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  rules: {
    "no-invalid-this": "error",
    "no-underscore-dangle": ["error", { allowAfterThis: true }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "injectable" },
    ],
    "comma-dangle": ["error", "always-multiline"],
  },
  overrides: [
    {
      files: ["*test.ts"],
      rules: {
        "@typescript-eslint/no-unused-expressions": "off",
        "no-unused-vars": "off",
        "no-underscore-dangle": "off",
        "func-names": "off",
        "prefer-arrow-callback": "off",
        "@typescript-eslint/unbound-method": "off",
      },
    },
  ],
};
