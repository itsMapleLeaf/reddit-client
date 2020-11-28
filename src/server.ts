import "dotenv/config"
import fastify from "fastify"
import fastifyCookie from "fastify-cookie"
import fastifySession from "fastify-session"
import fetch from "isomorphic-fetch"
import { loginBodySchema } from "./auth/schemas"
import { encodeUriParams } from "./common/url"
import { redditRedirectUri } from "./reddit"

function getEnv(name: string) {
	const value = process.env[name]
	if (!value) throw new Error(`env variable ${name} not defined`)
	return value
}

const redditAppId = getEnv("VITE_REDDIT_APP_ID")
const redditAppSecret = getEnv("REDDIT_APP_SECRET")
const sessionSecret = getEnv("SESSION_SECRET")

const app = fastify({
	logger: {
		prettyPrint: true,
	},
})

app.register(fastifyCookie)

app.register(fastifySession, {
	secret: sessionSecret,
	cookie: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: "lax",
	},
})

app.post("/api/login", async (request, reply) => {
	const body = loginBodySchema.parse(request.body)

	try {
		const authCredentials = Buffer.from(
			`${redditAppId}:${redditAppSecret}`,
		).toString("base64")

		const response = await fetch(`https://www.reddit.com/api/v1/access_token`, {
			method: "post",
			headers: {
				"Authorization": `Basic ${authCredentials}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: encodeUriParams({
				grant_type: "authorization_code",
				code: body.authCode,
				redirect_uri: redditRedirectUri,
			}),
		})

		const data = await response.json()

		if (!response.ok || data.error) {
			throw new Error(`Auth failed: ${data.error}`)
		}

		request.session.redditAuth = data
		return data
	} catch (error) {
		reply.status(401)
		return { error: error instanceof Error ? error.message : String(error) }
	}
})

app.get("/api/session", async (request) => {
	return { session: request.session.redditAuth }
})

const port = process.env.PORT || 4000
app.listen(port, (error, address) => {
	if (error) {
		app.log.error(String(error))
		process.exit(1)
	}
	console.info(`listening on ${address}`)
})
