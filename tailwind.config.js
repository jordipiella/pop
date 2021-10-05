module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
