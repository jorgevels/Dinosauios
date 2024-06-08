module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-restricted-globals": "off", // Desactiva la regla globalmente
  },
  overrides: [
    {
      files: ["src/serviceWorker.js"],
      rules: {
        "no-restricted-globals": "off", // Desactiva la regla específicamente para este archivo
      },
    },
  ],
};
