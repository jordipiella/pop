module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#13c1ac',
      'secondary': '#253238',
      'text': '#607D8B',
      'background': '#ECEFF1',
      'hover': '#0F9989'
     })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
