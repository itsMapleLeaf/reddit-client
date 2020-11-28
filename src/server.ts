import "dotenv/config"
import express from "express"
import expressSession from "express-session"
import fetch from "isomorphic-fetch"
import { redditRedirectUri } from "./reddit"
import { encodeUriParams } from "./url"

function getEnv(name: string) {
	const value = process.env[name]
	if (!value) throw new Error(`env variable ${name} not defined`)
	return value
}

const redditAppId = getEnv("VITE_REDDIT_APP_ID")
const redditAppSecret = getEnv("REDDIT_APP_SECRET")
const sessionSecret = getEnv("SESSION_SECRET")

const app = express()

app.use(express.json())

app.set("trust proxy", 1) // trust first proxy
app.use(
	expressSession({
		secret: sessionSecret,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			secure: true,
			path: "/",
		},
	}),
)

app.post("/api/login", async (req, res) => {
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
				code: req.body.authCode,
				redirect_uri: redditRedirectUri,
			}),
		})

		const data = await response.json()

		if (!response.ok || data.error) {
			throw new Error(`Auth failed: ${data.error}`)
		}

		req.session.redditAuth = data
		res.send(data)
	} catch (error) {
		res
			.status(401)
			.send({ error: error instanceof Error ? error.message : String(error) })
	}
})

app.get("/api/session", async (req, res) => {
	res.send({ session: req.session.redditAuth })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
	console.info(`listening on http://localhost:${port}`)
})
