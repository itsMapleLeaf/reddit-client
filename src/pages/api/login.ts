import { NextApiRequest, NextApiResponse } from "next"
import { setCookie } from "nookies"
import * as z from "zod"
import * as reddit from "../../app/reddit/auth"

const loginBodySchema = z.object({
	authCode: z.string(),
})

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	const body = loginBodySchema.parse(req.body)

	const redditAuth = await reddit.getAccessToken(body.authCode)

	const session = {
		redditAuth,
		expirationDate: Date.now() + redditAuth.expires_in * 1000 - 5 * 60 * 1000,
	}

	setCookie({ res }, "session", JSON.stringify(session), {
		httpOnly: true,
		sameSite: true,
		path: "/",
	})

	res.json({ success: true })
}
