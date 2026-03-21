import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Colors ───────────────────────────────────────────────
      colors: {
        espresso: {
          DEFAULT: '#2C1810',
          50:  '#F5EDE9',
          100: '#E8D0C5',
          200: '#D4A98F',
          300: '#B97F5A',
          400: '#8B4E2E',
          500: '#2C1810',
          600: '#231410',
          700: '#1A0F0C',
          800: '#120A07',
          900: '#090503',
        },
        gold: {
          DEFAULT: '#C9A84C',
          50:  '#FCF7EB',
          100: '#F5E8C0',
          200: '#EDD48A',
          300: '#E3BB55',
          400: '#C9A84C',
          500: '#A8863A',
          600: '#87672C',
          700: '#65491E',
          800: '#432C10',
          900: '#211505',
        },
        cream: {
          DEFAULT: '#FAF8F5',
          50:  '#FFFFFF',
          100: '#FAF8F5',
          200: '#F2EDE5',
          300: '#E8DDD0',
          400: '#DACAB8',
          500: '#C8B49E',
          600: '#B09881',
          700: '#947B64',
          800: '#745D49',
          900: '#4A3A2D',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          50:  '#F5F5F5',
          100: '#E8E8E8',
          200: '#D0D0D0',
          300: '#ADADAD',
          400: '#808080',
          500: '#5A5A5A',
          600: '#3D3D3D',
          700: '#2E2E2E',
          800: '#1A1A1A',
          900: '#0D0D0D',
        },
        warmgray: {
          DEFAULT: '#6B6B6B',
          50:  '#F7F7F7',
          100: '#EBEBEB',
          200: '#D4D4D4',
          300: '#B5B5B5',
          400: '#8F8F8F',
          500: '#6B6B6B',
          600: '#525252',
          700: '#3D3D3D',
          800: '#292929',
          900: '#141414',
        },
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg':  ['3rem',   { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md':  ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm':  ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'display-xs':  ['1.5rem',  { lineHeight: '1.3', letterSpacing: '0' }],
      },

      // ─── Spacing ─────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ─── Border Radius ────────────────────────────────────────────────
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // ─── Shadows ──────────────────────────────────────────────────────
      boxShadow: {
        'premium':    '0 4px 24px -4px rgba(44, 24, 16, 0.12), 0 2px 8px -2px rgba(44, 24, 16, 0.08)',
        'premium-lg': '0 12px 48px -8px rgba(44, 24, 16, 0.18), 0 4px 16px -4px rgba(44, 24, 16, 0.10)',
        'gold':       '0 4px 20px -4px rgba(201, 168, 76, 0.3)',
        'card':       '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.10)',
        'inner-warm': 'inset 0 1px 3px rgba(44, 24, 16, 0.08)',
      },

      // ─── Animations ───────────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(201, 168, 76, 0)' },
        },
      },
      animation: {
        'fade-in':         'fade-in 0.4s ease-out forwards',
        'fade-in-up':      'fade-in-up 0.5s ease-out forwards',
        'slide-in-right':  'slide-in-right 0.4s ease-out forwards',
        'scale-in':        'scale-in 0.3s ease-out forwards',
        'shimmer':         'shimmer 2s linear infinite',
        'pulse-gold':      'pulse-gold 2s ease-in-out infinite',
      },

      // ─── Aspect Ratios ────────────────────────────────────────────────
      aspectRatio: {
        'pinterest': '2 / 3',
        'hero':      '16 / 7',
        'product':   '4 / 5',
        'square':    '1 / 1',
      },

      // ─── Max Widths ───────────────────────────────────────────────────
      maxWidth: {
        'prose-wide': '75ch',
        'content':    '1280px',
        'narrow':     '640px',
      },

      // ─── Backgrounds ──────────────────────────────────────────────────
      backgroundImage: {
        'gradient-warm':   'linear-gradient(135deg, #FAF8F5 0%, #F2EDE5 100%)',
        'gradient-espresso': 'linear-gradient(135deg, #2C1810 0%, #431F12 100%)',
        'gradient-gold':   'linear-gradient(135deg, #C9A84C 0%, #E3BB55 100%)',
        'hero-texture':    "url('/images/hero-texture.jpg')",
      },

      // ─── Screen sizes ─────────────────────────────────────────────────
      screens: {
        'xs': '375px',
        '3xl': '1600px',
      },

      // ─── Z-index scale ────────────────────────────────────────────────
      zIndex: {
        '60':  '60',
        '70':  '70',
        '80':  '80',
        '90':  '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}

export default config
