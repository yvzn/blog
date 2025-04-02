const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./*.html', './_includes/**/*.{html,njk}', './_layouts/**/*.{html,njk}'],
	darkMode: 'class',
	plugins: [],
	theme: {
		colors: {
			// https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500
			transparent: 'transparent',
			current: 'currentColor',
			white: colors.white,
			skyblue: {
				DEFAULT: '#8ecae6',
				700: '#257EA7',
				800: '#217197',
				900: '#1A5875',
			},
			bluegreen: {
				100: '#eef9fc',
				DEFAULT: '#219ebc',
				800: '#18748B',
				900: '#0F4857',
			},
			prussianblue: '#023047',
			selectiveyellow: {
				300: '#FFD15C',
				DEFAULT: '#ffb703',
			},
			utorange: '#FB8500',
		},
		extend: {},
	},
};
