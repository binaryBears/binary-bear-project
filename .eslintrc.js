module.exports = {
  extends: ["@it-incubator/eslint-config", "next/core-web-vitals"],
  plugins: ["perfectionist"],
  rules: {
    "comma-dangle": ["error", "never"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        css: "always",
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "max-lines": [
      "error",
      {
        max: 350
      }
    ]
  }
}
