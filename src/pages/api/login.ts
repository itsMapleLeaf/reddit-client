import { fetchAccessToken } from "features/reddit/helpers"
import { setSession } from "features/session/helpers"
import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"

const loginBodySchema = z.object({
	authCode: z.string(),
})

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	const body = loginBodySchema.parse(req.body)
	const redditAuth = await fetchAccessToken(body.authCode)
	setSession(res, redditAuth)
	res.json({ success: true })
}
