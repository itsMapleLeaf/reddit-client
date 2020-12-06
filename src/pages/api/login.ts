import { setSession } from "app/api-session"
import * as reddit from "app/reddit/auth"
import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"

const loginBodySchema = z.object({
	authCode: z.string(),
})

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	const body = loginBodySchema.parse(req.body)
	const redditAuth = await reddit.getAccessToken(body.authCode)
	setSession(res, redditAuth)
	res.json({ success: true })
}
