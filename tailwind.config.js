const colors = require("tailwindcss/colors")

module.exports = {
	purge: ["./src/**/*.{ts,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		boxShadow: {
			DEFAULT: "0px 2px 4px rgba(0, 0, 0, 0.3)",
		},

		extend: {
			colors: {
				blue: colors.lightBlue,
				gray: colors.blueGray,
			},
			fontFamily: {
				sans: `"Fira Sans", sans-serif`,
				condensed: `"Fira Sans Condensed", sans-serif`,
			},
			transitionDuration: {
				DEFAULT: "250ms",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
