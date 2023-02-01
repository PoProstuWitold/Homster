/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {},
	},
	plugins: [
        require('daisyui'),
        require('@tailwindcss/typography')
    ],
	daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        themes: [
            "light", "dark", "emerald"
        ]
    }
}
