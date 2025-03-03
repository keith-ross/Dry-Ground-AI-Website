/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2D3748',
          850: '#1A202C',
        },
        brand: {
          primary: '#00A3E0',    // Primary blue from drygroundpartners.com
          secondary: '#005A84',  // Darker blue for secondary elements
          accent: '#F7941D',     // Orange accent color
          dark: '#1E293B',       // Dark background
          darker: '#0F172A',     // Darker background
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};