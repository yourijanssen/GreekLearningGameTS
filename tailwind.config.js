/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/**/**.{js,ts,jsx,tsx,mdx}", // Adjust based on your project structure
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "greek-blue": "#2166ac",
        "greek-light": "#f5f9fb",
        "greek-accent": "#e3e6eb",
        "greek-border": "#396096",
      },
      backgroundImage: {
        "greek-background": "var(--greek-light)",
      },
      boxShadow: {
        greek: "0 4px 24px 0 rgba(33, 102, 172, 0.09)",
      },
      borderRadius: {
        greek: "16px",
      },
      borderWidth: {
        greek: "3.5px",
        "greek-bottom": "8px",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      transitionProperty: {
        background: "background 0.13s",
      },
    },
  },
  plugins: [],
};