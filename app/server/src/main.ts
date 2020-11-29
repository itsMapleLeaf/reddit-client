import fastify, { FastifyRequest } from "fastify"
import fastifyCookie from "fastify-cookie"
import fastifySession from "fastify-session"
import * as z from "zod"
import * as env from "./env"
import { getAccessToken, getRefreshedTokens, RedditAuthData } from "./reddit"
import { createRedisSessionStore } from "./redis-session-store"

function updateRedditDataInSession(
	session: FastifyRequest["session"],
	data: RedditAuthData,
) {
	// expire in a bit of time before the actual expiration date
	session.expirationDate = Date.now() + data.expires_in * 1000 - 5 * 60 * 1000
	session.redditTokens = data
}

async function main() {
	const app = fastify({
		logger: {
			prettyPrint: true,
		},
	})

	app.register(fastifyCookie)

	app.register(fastifySession, {
		secret: env.sessionSecret,
		store: createRedisSessionStore(),
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "lax",
		},
	})

	app.post("/api/login", async (request, reply) => {
		const loginBodySchema = z.object({
			authCode: z.string(),
		})
		const body = loginBodySchema.parse(request.body)

		try {
			updateRedditDataInSession(
				request.session,
				await getAccessToken(body.authCode),
			)

			return { success: true }
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
			updateRedditDataInSession(
				request.session,
				await getRefreshedTokens(request.session.redditTokens.refresh_token),
			)
		}

		const session = request.session
			? {
					redditAccessToken: request.session.redditTokens.access_token,
			  }
			: undefined

		return { session }
	})

	await app.listen(process.env.PORT || 4000)
}

main().catch(console.error)
