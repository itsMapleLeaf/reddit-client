import dotenv from "dotenv"
import fastify from "fastify"
import fastifyCookie from "fastify-cookie"
import fastifySession from "fastify-session"
import Redis from "ioredis"
import fetch from "isomorphic-fetch"
import { join } from "path"
import * as z from "zod"

function encodeUriParams(params: { [key: string]: string }) {
	return Object.entries(params)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join("&")
}

dotenv.config({ path: join(__dirname, "../../../.env") })

function getEnv(name: string) {
	const value = process.env[name]
	if (!value) throw new Error(`env variable ${name} not defined`)
	return value
}

const redditAppId = getEnv("VITE_REDDIT_APP_ID")
const redditAppSecret = getEnv("REDDIT_APP_SECRET")
const redditRedirectUri = getEnv("VITE_REDDIT_APP_REDIRECT_URI")
const sessionSecret = getEnv("SESSION_SECRET")

const redis = new Redis()

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
	store: {
		get: (id, callback) => {
			redis.get(id, (err, res) => {
				callback(err || undefined, res && JSON.parse(res))
			})
		},

		set: (id, session, callback) => {
			redis.set(id, JSON.stringify(session), (err) => {
				callback(err || undefined)
			})
		},

		destroy: (id, callback) => {
			redis.del(id, (err) => callback(err || undefined))
		},
	},
})

app.post("/api/login", async (request, reply) => {
	const loginBodySchema = z.object({
		authCode: z.string(),
	})
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

		request.session.redditTokens = data

		// expire in a bit of time before the actual expiration date
		request.session.expirationDate =
			Date.now() + data.expires_in * 1000 - 5 * 60 * 1000

		return data
	} catch (error) {
		reply.status(401)
		return { error: error instanceof Error ? error.message : String(error) }
	}
})

app.get("/api/session", async (request) => {
	if (!request.session) {
		return { session: undefined }
	}

	if (
		!request.session.expirationDate ||
		Date.now() > request.session.expirationDate
	) {
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
				grant_type: "refresh_token",
				refresh_token: request.session.redditTokens.refresh_token,
			}),
		})

		const data = await response.json()

		request.session.redditTokens = data

		// expire in a bit of time before the actual expiration date
		request.session.expirationDate =
			Date.now() + data.expires_in * 1000 - 5 * 60 * 1000
	}

	const session = request.session
		? {
				redditAccessToken: request.session.redditTokens.access_token,
		  }
		: undefined

	return { session }
})

const port = process.env.PORT || 4000
app.listen(port).catch(console.error)
