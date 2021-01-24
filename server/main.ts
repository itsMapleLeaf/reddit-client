import cookieSession from "cookie-session"
import "dotenv/config"
import express from "express"
import Router from "express-promise-router"
import { authRoutes } from "./auth-routes"

function createErrorHandler(): express.ErrorRequestHandler {
	return (error, req, res, next) => {
		console.warn(error)
		res.status(500).json({ error: "An internal error occurred" })
	}
}

const router = Router()

router.use(express.json())

router.use(
	cookieSession({
		name: "clientSession",
		keys: [process.env.COOKIE_SECRET!],
		path: "/",
		httpOnly: true,
		sameSite: "lax",
	}),
)

router.use("/api", authRoutes)
router.use(createErrorHandler())

const port = process.env.PORT || 4000
express()
	.use(router)
	.listen(port, () => {
		console.info(`🚀 Api server running at http://localhost:${port}`)
	})
