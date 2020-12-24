module.exports = {
	presets: [
		[
			require.resolve("next/babel"),
			{
				"preset-react": {
					runtime: "automatic",
					importSource: "@emotion/react",
				},
			},
		],
	],
	plugins: [
		require.resolve("@emotion/babel-plugin"),
		require.resolve("babel-plugin-macros"),
	],
}
