module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    indent: [
      2,
      2,
      {
        ignoredNodes: ["TemplateLiteral"],
        SwitchCase: 1,
      },
    ],
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  },
};
