import express from "express"
import { join } from "path"
import vite from "vite"

async function main() {
	const app = express()

	// create vite dev server in middleware mode
	// so vite creates the hmr websocket server on its own.
	// the ws server will be listening at port 24678 by default, and can be
	// configured via server.hmr.port
	const viteServer = await vite.createServer({
		server: {
			middlewareMode: true,
		},
	})

	// use vite's connect instance as middleware
	app.use(viteServer.middlewares)

	app.use("*", (req, res) => {
		res.sendFile(join(__dirname, "index.html"))
	})

	const port = 3000
	app.listen(port, () => {
		console.info(`🚀 Running on http://localhost:${port}`)
	})
}

main().catch(console.error)
