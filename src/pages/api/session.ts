import { fetchRefreshedTokens } from "features/reddit/helpers"
import { getSession, setSession } from "features/session/helpers"
import { NextApiRequest, NextApiResponse } from "next"

export default async function session(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const session = getSession(req)

		if (!session) {
			res.json({ session: undefined })
			return
		}

		if (Date.now() > session.expirationDate) {
			const redditAuth = await fetchRefreshedTokens(
				session.redditAuth.refresh_token,
			)

			setSession(res, redditAuth)
		}

		res.json({
			session: {
				redditAccessToken: session.redditAuth.access_token,
			},
		})
	} catch (error) {
		res.status(500).json({ error: String(error) })
	}
}
