/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FBFBF9',
        surface: '#FFFFFF',
        'surface-subtle': '#F4F2EB',
        'border-subtle': '#EBE8E0',
        'ink-primary': '#18181B',
        'ink-secondary': '#71717A',
        'accent-terracotta': '#C2410C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', 'Inter', 'sans-serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
