/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          forest: '#2f6b4f',
          'forest-light': '#4a8f6a',
          leaf: '#6b9e78',
          moss: '#8fbc9a',
          sky: '#5a8f9c',
          sun: '#c4a35a',
          bark: '#3d4f42',
          mist: '#e6efe4',
          cream: '#f4f8f2',
          night: '#0f1a14',
        },
      },
      fontFamily: {
        sans: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      backgroundImage: {
        'nature-gradient': 'linear-gradient(135deg, #2f6b4f 0%, #6b9e78 50%, #5a8f9c 100%)',
        'canopy-wash': 'linear-gradient(180deg, #d4e8d8 0%, #e6efe4 40%, #f0f5ed 100%)',
      },
      animation: {
        'leaf-drift': 'leafDrift 14s ease-in-out infinite',
        'float': 'float 7s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        leafDrift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(10px, -16px) rotate(3deg)' },
          '66%': { transform: 'translate(-8px, 8px) rotate(-2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'nature': '0 8px 28px rgba(26, 46, 36, 0.08)',
        'nature-lg': '0 16px 48px rgba(26, 46, 36, 0.12)',
        'nature-hover': '0 12px 36px rgba(47, 107, 79, 0.14)',
      },
    },
  },
  plugins: [],
};
