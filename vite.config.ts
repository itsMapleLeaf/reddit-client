import * as babel from "@babel/core"
import reactRefresh from "@vitejs/plugin-react-refresh"
import { defineConfig, Plugin } from "vite"

export default defineConfig({
	esbuild: {
		jsxInject: `import * as React from 'react'`,
	},
	alias:
		process.env.NODE_ENV === "production"
			? { "react": "preact/compat", "react-dom": "preact/compat" }
			: {},
	optimizeDeps: {
		include: ["react-query/devtools", "twind/css"],
		exclude: ["reakit"],
	},
	plugins: [reactRefresh(), babelMacros()],
	clearScreen: false,
})

function babelMacros(): Plugin {
	const plugins = [
		require.resolve("@babel/plugin-syntax-jsx"),
		[require.resolve("@babel/plugin-syntax-typescript"), { isTSX: true }],
		require.resolve("babel-plugin-macros"),
	]

	return {
		name: "babel-macros",
		transform(code, filename) {
			if (/(j|t)sx?$/.test(filename)) {
				return babel.transformAsync(code, {
					filename,
					plugins,
					configFile: false,
					babelrc: false,
					ast: false,
					sourceMaps: true,
				})
			}
		},
	}
}
