/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./app_page/**/*.html",
    "./page_terms_privacy/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        // Identidade visual MEUGOMES
        "brand": "#056CF2",
        "brand-deep": "#123C73",
        "brand-ink": "#0D0D0D",
        "bg-base": "#0D0D0D",
        "bg-surface": "#111923",
        "bg-elevated": "#172333",
        "border-subtle": "rgba(148, 171, 199, 0.16)",
        // Aliases mantidos para não quebrar as páginas existentes.
        "amber": "#056CF2",
        "amber-soft": "rgba(5, 108, 242, 0.16)",
        "teal": "#56A0FF",
        "text-primary": "#F4F7FB",
        "text-muted": "#9AA9BA",
        "danger": "#FF6B6B",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        "brand-glow": "0 18px 60px rgba(5, 108, 242, 0.20)",
        "card": "0 18px 50px rgba(0, 0, 0, 0.24)",
      },
      keyframes: {
        "float-left": {
          "0%, 100%": { transform: "rotate(-12deg) translateX(-60px) translateY(8px)" },
          "50%": { transform: "rotate(-12deg) translateX(-60px) translateY(-2px)" },
        },
        "float-right": {
          "0%, 100%": { transform: "rotate(12deg) translateX(55px) translateY(-8px)" },
          "50%": { transform: "rotate(12deg) translateX(55px) translateY(-18px)" },
        },
      },
      animation: {
        "float-left": "float-left 5s ease-in-out infinite",
        "float-right": "float-right 5s ease-in-out infinite 1.2s",
      },
    },
  },
  plugins: [],
};
