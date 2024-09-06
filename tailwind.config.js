import defaultTheme from 'tailwindcss/defaultTheme';
import daisyUI from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Open Sans Variable', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	daisyui: {
		themes: [
			{
				theme: {
					primary: '#16a34a',
					secondary: '#84cc16',
					accent: '#84cc16',
					neutral: '#e5e7eb',
					'base-100': '#111827',
					info: '#0000ff',
					success: '#15803d',
					warning: '#f59e0b',
					error: '#e11d48'
				}
			}
		]
	},
	plugins: [daisyUI]
};
