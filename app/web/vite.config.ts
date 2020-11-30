import preactRefresh from "@prefresh/vite"
import type { UserConfig } from "vite"

const config: UserConfig = {
	jsx: "preact",
	plugins: [preactRefresh()],
	alias: {
		"preact": "preact/src/index.js",
		"preact/hooks": "preact/hooks/src/index.js",
		"react": "preact/compat/src/index.js",
		"react-dom": "preact/compat/src/index.js",
	},
	proxy: {
		"/api/*": { target: "http://localhost:4000/", changeOrigin: true },
	},
	sourcemap: true,
}

export default config
