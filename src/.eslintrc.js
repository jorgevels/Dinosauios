module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended", // Activar el plugin eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["eslint-plugin"],
  rules: {
    // Permitir el uso de 'self' en Service Workers
    "no-restricted-globals": [
      "error",
      {
        name: "self",
        message: 'Use "self" instead.',
      },
    ],
  },
};
