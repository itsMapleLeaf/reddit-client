/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		public: "/",
		src: "/src",
	},
	plugins: [
		"./plugins/dotenv.js",
		"@snowpack/plugin-babel",
		"@snowpack/plugin-typescript",
		"@snowpack/plugin-postcss",
		"@prefresh/snowpack",
	],
	alias: {
		"react": "preact/compat",
		"react-dom": "preact/compat",
	},
	devOptions: {
		port: 3000,
		open: "false",
	},
	install: ["preact/jsx-runtime"],
	proxy: {
		"/api": "http://localhost:4000/api",
	},
}
