/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,       // центрируем
      padding: '1rem',    // внутренние отступы
      screens: {
        DEFAULT: '400px', // 👈 глобальная ширина для всего
        sm: '400px',
        md: '480px',
        lg: '480px',
        xl: '480px',
      },
    },
    extend: {},
  },
  plugins: [],
}
