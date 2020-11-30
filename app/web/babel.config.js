module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{ targets: { esmodules: true }, bugfixes: true, modules: false },
		],
		["@babel/preset-react", { runtime: "automatic", importSource: "preact" }],
		"@babel/preset-typescript",
	],
}
