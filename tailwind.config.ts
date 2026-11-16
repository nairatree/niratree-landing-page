import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCFAF7",
          100: "#FAF7F2",
          200: "#F3EDE2",
          300: "#E9DFCE",
          400: "#D8C5A8",
        },
        forest: {
          950: "#091F16",
          900: "#0B2E20",
          800: "#00472B",
          700: "#005C37",
          600: "#007345",
          500: "#008953", // Official NairaTree Brand Green
          400: "#00A865",
          300: "#33BC84",
          200: "#80D6AF",
          100: "#D4EFE3",
          50: "#EBF7F1",
        },
        brand: {
          DEFAULT: "#008953", // Official NairaTree Brand Green
          hover: "#007345",
          dark: "#005C37",
          deep: "#003822",
          light: "#EBF7F1",
          subtle: "#F0FAF5",
        },
        bamboo: {
          100: "#F7EFE1",
          200: "#EBDAC0",
          300: "#DEC199",
          400: "#CCA36B",
          500: "#B88746",
          600: "#9A6D33",
          700: "#7A5325",
        },
        cta: {
          DEFAULT: "#E25822", // High converting flame amber/coral
          hover: "#C94815",
          light: "#FFF1EB",
        },
        gold: {
          DEFAULT: "#D4971A",
          dark: "#B87E0E",
          light: "#FEF7E6",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        'warm': '0 8px 30px rgba(0, 137, 83, 0.08)',
        'warm-lg': '0 20px 45px rgba(0, 137, 83, 0.12)',
        'cta': '0 10px 25px rgba(226, 88, 34, 0.35)',
        'brand': '0 10px 25px rgba(0, 137, 83, 0.25)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        }
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        pulseSlow: 'pulseSlow 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;
