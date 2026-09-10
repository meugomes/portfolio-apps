/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0B0F14',
        'bg-surface': '#121820',
        'bg-elevated': '#171F29',
        'border-subtle': '#e8edf217',
        amber: '#FFB020',
        'amber-soft': '#ffb02024',
        teal: '#2DD4B8',
        'text-primary': '#E8EDF2',
        'text-muted': '#8A96A3',
        danger: '#FF6B6B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        // Animação para o Telefone Traseiro (Inclinado para a ESQUERDA)
        'float-left': {
          '0%, 100%': { transform: 'rotate(-12deg) translateX(-60px) translateY(8px)' },
          '50%': { transform: 'rotate(-12deg) translateX(-60px) translateY(-2px)' },
        },
        // Animação para o Telefone Frontal (Inclinado para a DIREITA)
        'float-right': {
          '0%, 100%': { transform: 'rotate(12deg) translateX(55px) translateY(-8px)' },
          '50%': { transform: 'rotate(12deg) translateX(55px) translateY(-18px)' },
        },
      },
      animation: {
        'float-left': 'float-left 5s ease-in-out infinite',
        'float-right': 'float-right 5s ease-in-out infinite 1.2s',
      },
    },
  },
  plugins: [],
};