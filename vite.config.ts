import preactRefresh from "@prefresh/vite"
import { defineConfig } from "vite"

export default defineConfig({
	esbuild: {
		jsxInject: `import { h, Fragment } from 'preact'`,
		jsxFactory: "h",
		jsxFragment: "Fragment",
	},
	plugins: [preactRefresh()],
	clearScreen: false,
})
