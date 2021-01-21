import express from "express"
import { readFile } from "fs/promises"
import { join } from "path"
import * as vite from "vite"

async function main() {
	const app = express()

	if (process.env.NODE_ENV === "production") {
		app.use("/", express.static(join(__dirname, "dist")))
	} else {
		const viteServer = await vite.createServer({
			server: {
				middlewareMode: true,
			},
		})

		app.use(viteServer.middlewares)

		app.use("*", async (req, res) => {
			const indexContent = await readFile(
				join(__dirname, "index.html"),
				"utf-8",
			)
			const viteClientScript = `<script type="module" src="/@vite/client"></script>`
			res.send(indexContent.replace(`</head>`, `${viteClientScript}</head>`))
		})
	}

	const port = 3000
	app.listen(port, () => {
		console.info(`🚀 Running on http://localhost:${port}`)
	})
}

main().catch(console.error)
