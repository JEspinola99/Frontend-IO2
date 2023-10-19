module.exports = {
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {},
  },
};
