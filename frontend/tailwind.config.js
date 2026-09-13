/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090D",
        foreground: "#EDEDED",
        industrial: {
          950: "#06080B",
          900: "#0A0E14",
          850: "#0E131C",
          800: "#131A24",
          750: "#18212D",
          700: "#1E2A3A",
          600: "#2B3B50",
          500: "#41556E",
          400: "#69809E",
          300: "#98A9BF",
          200: "#C9D4E2",
          100: "#EAF0F6",
        },
        mineral: {
          gold: "#F59E0B",
          copper: "#D97706",
          bronze: "#92400E",
          earth: "#785338",
          strata: "#3B2E24",
        },
        telemetry: {
          cyan: "#00E5FF",
          cyanDim: "#00B4D8",
          emerald: "#10B981",
          amber: "#F59E0B",
          radar: "#38BDF8",
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'topo-grid': "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.05) 0%, transparent 70%)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.96)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'scan': 'scanline 8s linear infinite',
        'radar': 'radarSweep 12s linear infinite',
      },
    },
  },
  plugins: [],
};
