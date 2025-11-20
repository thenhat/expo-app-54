const nativewindPreset = require('nativewind/dist/tailwind/index.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,tsx}',
    './src/app/**/*.{js,ts,tsx}',
    './src/components/**/*.{js,ts,tsx}',
  ],
  presets: [nativewindPreset],
  theme: {
    extend: {
      fontFamily: {
        mono: ['SpaceMono'],
        defaultBold: ['montserrat700'],
        defaultSemiBold: ['montserrat600'],
        defaultMedium: ['montserrat500'],
        defaultRegular: ['montserrat400'],
        montserrat700: ['montserrat700'],
        montserrat600: ['montserrat600'],
        montserrat500: ['montserrat500'],
        montserrat400: ['montserrat400'],
        oswald600: ['oswald600'],
      },
      filter: {
        dropShadowDark: 'drop-shadow(0 1px 1px rgb(255 255 255 / 1))',
        dropShadowLight: 'drop-shadow(0 1px 1px rgb(0 0 0 / 1))',
      },
      backgroundColor: {
        white25: 'rgba(255, 255, 255, 0.25)',
        white75: 'rgba(255, 255, 255, 0.75)',
        blue15: 'rgba(10, 158, 232, 0.15)',
        green15: 'rgba(96, 241, 174, 0.15)',
        pink1: 'rgba(243, 53, 113, 0.1)',
        gradient1: 'linear-gradient(348.37deg, #2F265D 4.26%, #6350C3 132.75%)',
        gradientFilter: 'linear-gradient(180deg, #2F265D 0%, #6350C3 118.33%)',
      },
      colors: {
        border: '#1a332a',
        input: '#243f34',
        ring: '#274b36',
        background: '#0d1c11',
        foreground: '#a9ffea',
        primary: {
          DEFAULT: '#62dfa0',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#1cd7a2',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#26a879',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1a1e19',
          foreground: '#b3b3c0',
        },
        accent: {
          DEFAULT: '#eaffff',
          foreground: '#1a1a1a',
        },
        popover: {
          DEFAULT: '#1c1e19',
          foreground: '#e4f3f4',
        },
        card: {
          DEFAULT: '#102314',
          foreground: '#e4f3f4',
        },
        'crypto-bg': '#1f2838',
        'crypto-border': '#343a4e',
        'crypto-text': '#adb9e1',
      },
      borderRadius: {
        '2xl': '16px',
        xl: '12px',
        lg: '8px',
        md: '6px',
        sm: '2px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {},
    },
  },
  plugins: [],
};
