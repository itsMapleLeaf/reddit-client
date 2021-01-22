import preactRefresh from "@prefresh/vite"
import { defineConfig } from "vite"

export default defineConfig({
	esbuild: {
		jsxInject: `import { h, Fragment } from 'preact'`,
		jsxFactory: "h",
		jsxFragment: "Fragment",
	},
	alias: {
		"react": "preact/compat",
		"react-dom": "preact/compat",
	},
	optimizeDeps: {
		include: [
			"preact",
			"preact/compat",
			"preact/hooks",
			"react-query/devtools",
		],
	},
	plugins: [preactRefresh()],
	clearScreen: false,
})
