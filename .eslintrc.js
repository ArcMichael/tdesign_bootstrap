module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: false,
    // 👇 支持微信小程序全局变量，如 wx, App, Page 等
    wx: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // 如果你配了 Prettier
    "prettier",
  ],
  rules: {
    // 可根据你项目习惯微调
    "no-console": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  overrides: [
    {
      files: ["*.wxml", "*.wxss"],
      rules: {
        // 忽略小程序模板文件
      },
    },
  ],
  globals: {
    wx: "readonly",
    App: "readonly",
    Page: "readonly",
    getApp: "readonly",
    getCurrentPages: "readonly",
    Component: "readonly",
  },
};
