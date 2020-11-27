import preactRefresh from "@prefresh/vite"
import type { UserConfig } from "vite"

const config: UserConfig = {
	jsx: "preact",
	plugins: [preactRefresh()],
	alias: {
		"react": "preact/compat",
		"react-dom": "preact/compat",
	},
}

export default config
