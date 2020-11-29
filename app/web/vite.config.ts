import preactRefresh from "@prefresh/vite"
import type { UserConfig } from "vite"

const config: UserConfig = {
	jsx: "preact",
	plugins: [preactRefresh()],
	alias: {
		"react": "preact/compat",
		"react-dom": "preact/compat",
	},
	proxy: {
		"/api/*": { target: "http://localhost:4000/", changeOrigin: true },
	},
	sourcemap: true,
}

export default config
