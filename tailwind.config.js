/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'xv-bg': '#fef3e2',
        'xv-cream': '#fff8f0',
        'xv-rose': '#c2410c',
        'xv-rose-dark': '#b91c1c',
        'xv-gold': '#d97706',
        'xv-rose-gold': '#ea580c',
        'xv-wine': '#7c2d12',
        'xv-pink': '#fcd34d',
        'xv-green': '#15803d',
        'xv-red': '#dc2626',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        pinyon: ['Pinyon Script', 'cursive'],
        mont: ['Montserrat', 'sans-serif'],
        // keep old aliases for compatibility if needed
        cinzel: ['Cormorant Garamond', 'serif'],
        vibes: ['Pinyon Script', 'cursive'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        sway: 'sway 3s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        sway: {
          '0%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
