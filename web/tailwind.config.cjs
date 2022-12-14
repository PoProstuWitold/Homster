module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
	],
	darkMode: "class",
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
}
