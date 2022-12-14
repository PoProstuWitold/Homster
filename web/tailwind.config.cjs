module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/line-clamp"),
		require("daisyui"),
		require("prettier-plugin-tailwindcss")
	],
	daisyui: {
		styled: true,
		themes: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		themes: [
			'default',
			'light',
			'dark',
			'emerald',
			'synthwave',
			'retro',
			'halloween',
			'forest',
			'winter'
		]
	},
	fontFamily: {
		'sans': ['Montserrat', 'sans-serif']
	}
}
