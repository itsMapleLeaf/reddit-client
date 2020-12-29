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
			transitionDuration: {
				DEFAULT: "250ms",
			},
			boxShadow: {
				DEFAULT: "0px 3px 8px rgba(0, 0, 0, 0.5)",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
