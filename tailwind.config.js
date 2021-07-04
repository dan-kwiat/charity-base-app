const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: [
    "./components/**/*.js",
    "./components/**/*.tsx",
    "./components/**/*.mdx",
    "./pages/**/*.js",
    "./pages/**/*.tsx",
    "./pages/**/*.mdx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto Mono"', "monospace", ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
