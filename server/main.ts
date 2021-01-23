import "dotenv/config"
import express from "express"
import Router from "express-promise-router"
import { readFile } from "fs/promises"
import { join } from "path"
import * as vite from "vite"
import { authRoutes } from "./auth-routes"

async function createViteServerMiddleware() {
	const router = Router()

	const viteServer = await vite.createServer({
		server: {
			middlewareMode: true,
		},
	})

	router.use(viteServer.middlewares)

	router.use(async (req, res) => {
		const content = await readFile(join(__dirname, "../index.html"), "utf-8")
		const viteClientScript = `<script type="module" src="/@vite/client"></script>`
		res.send(content.replace(`</head>`, `${viteClientScript}</head>`))
	})

	return router
}

function createErrorHandler(): express.ErrorRequestHandler {
	return (error, req, res, next) => {
		console.warn(error)
		res.status(500).json({ error: "An internal error occurred" })
	}
}

async function main() {
	const router = Router()

	router.use(express.json())
	router.use(authRoutes)

	if (process.env.NODE_ENV === "production") {
		router.use(express.static(join(__dirname, "../dist")))
	} else {
		router.use(await createViteServerMiddleware())
	}

	router.use(createErrorHandler())

	const port = Number(process.env.PORT) || 3000
	express()
		.use(router)
		.listen(port, () => console.info(`🚀 Running on http://localhost:${port}`))
}

main().catch(console.error)
