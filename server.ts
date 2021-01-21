import { readFile } from "fs/promises"
import Koa from "koa"
import koaConnect from "koa-connect"
import koaStatic from "koa-static"
import { join } from "path"
import * as vite from "vite"

async function main() {
	const app = new Koa()

	app.use(async (ctx, next) => {
		try {
			await next()
		} catch (error) {
			console.warn(error)
			ctx.status = 500
			ctx.body = { error: "An internal error occurred" }
		}
	})

	if (process.env.NODE_ENV === "production") {
		app.use(koaStatic(join(__dirname, "dist")))
	} else {
		const viteServer = await vite.createServer({
			server: {
				middlewareMode: true,
			},
		})

		app.use(koaConnect(viteServer.middlewares))

		app.use(async (ctx) => {
			const content = await readFile(join(__dirname, "index.html"), "utf-8")
			const viteClientScript = `<script type="module" src="/@vite/client"></script>`
			ctx.body = content.replace(`</head>`, `${viteClientScript}</head>`)
		})
	}

	const port = 3000
	app.listen(port, () => {
		console.info(`🚀 Running on http://localhost:${port}`)
	})
}

main().catch(console.error)
