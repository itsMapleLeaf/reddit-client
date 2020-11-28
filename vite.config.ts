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
		"/api/*": "https://localhost:4000",
	},
	optimizeDeps: {
		exclude: [
			"dotenv",
			"express",
			"express-session",
			"isomorphic-fetch",
			"ts-node",
		],
	},
}

export default config
