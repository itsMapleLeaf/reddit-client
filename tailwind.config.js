const colors = require("tailwindcss/colors")

module.exports = {
	purge: ["./src/**/*.{ts,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blue: colors.lightBlue,
				gray: colors.blueGray,
			},
			fontFamily: {
				sans: `"Fira Sans", sans-serif`,
				condensed: `"Fira Sans Condensed", sans-serif`,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
