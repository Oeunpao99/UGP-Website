/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        fg: 'var(--fg)',
        blue: 'var(--blue)',
        'blue-lite': 'var(--blue-lite)',
        yellow: 'var(--yellow)',
        'yellow-deep': 'var(--yellow-deep)',
        red: 'var(--red)',
        paper: 'var(--paper)',
        'paper-2': 'var(--paper-2)',
        card: 'var(--card)',
        grey: 'var(--grey)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        'c-upvc': 'var(--c-upvc)',
        'c-ppr': 'var(--c-ppr)',
        'c-hdpe': 'var(--c-hdpe)',
        'c-conduit': 'var(--c-conduit)',
        'c-corr': 'var(--c-corr)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Arial Narrow"', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'ui-monospace', 'monospace'],
        kh: ['"Kantumruy Pro"', '"Noto Sans Khmer"', '"Space Grotesk"', 'sans-serif'],
        'kh-head': ['"Khmer OS Moul"', '"Moul"', '"Kantumruy Pro"', '"Noto Sans Khmer"', 'serif'],
      },
      maxWidth: {
        shell: '1240px',
      },
      borderRadius: {
        brand: '14px',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(.22,.8,.28,1)',
      },
      aria: {
        current: 'current="page"',
      },
      keyframes: {
        rise: {
          from: { transform: 'translateY(60px) scaleY(.9)', opacity: 0 },
          to: { transform: 'none', opacity: 1 },
        },
        slide: { to: { transform: 'translateX(-50%)' } },
        pageIn: {
          from: { opacity: 0, transform: 'translateY(26px) scale(.986)' },
          to: { opacity: 1, transform: 'none' },
        },
        dotPulse: {
          '70%': { boxShadow: '0 0 0 9px rgba(59,211,126,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(59,211,126,0)' },
        },
        dotBounce: {
          '0%,60%,100%': { opacity: .28, transform: 'translateY(0)' },
          '30%': { opacity: 1, transform: 'translateY(-4px)' },
        },
        chatIn: {
          from: { opacity: 0, transform: 'translateY(24px) scale(.97)' },
          to: { opacity: 1, transform: 'none' },
        },
        teaserIn: {
          from: { opacity: 0, transform: 'translateY(12px) scale(.96)' },
          to: { opacity: 1, transform: 'none' },
        },
        fabFloat: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pingSoft: {
          '0%': { boxShadow: '0 0 0 0 rgba(255,209,0,.55)' },
          '70%': { boxShadow: '0 0 0 14px rgba(255,209,0,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255,209,0,0)' },
        },
      },
      animation: {
        rise: 'rise .9s cubic-bezier(.22,.8,.28,1) both',
        slide: 'slide 90s linear infinite',
        pageIn: 'pageIn .5s cubic-bezier(.22,.8,.28,1) both',
        dotPulse: 'dotPulse 2.4s infinite',
        dotBounce: 'dotBounce 1.3s infinite',
        chatIn: 'chatIn .34s cubic-bezier(.22,.8,.28,1) both',
        teaserIn: 'teaserIn .45s cubic-bezier(.22,.8,.28,1) both',
        fabFloat: 'fabFloat 3.4s ease-in-out infinite',
        pingSoft: 'pingSoft 2.2s infinite',
      },
    },
  },
  plugins: [],
}
