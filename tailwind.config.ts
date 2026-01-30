import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0d13',
        steel: '#131826',
        glow: '#42f5d3',
        aurora: '#3de0ff',
        ember: '#ff6b4a',
        haze: '#8c96b2'
      },
      boxShadow: {
        panel: '0 20px 45px rgba(11,13,19,0.35)',
        glow: '0 0 30px rgba(66,245,211,0.25)'
      }
    }
  },
  plugins: []
};

export default config;
