import { NextApiRequest, NextApiResponse } from "next"
import { parseCookies, setCookie } from "nookies"
import { getRefreshedTokens, RedditAuthData } from "../../server/reddit/auth"

type Session = {
	redditAuth: RedditAuthData
	expirationDate: number
}

export default async function session(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const cookies = parseCookies({ req })

	let session: Session | undefined =
		cookies.session && JSON.parse(cookies.session)

	if (!session) {
		res.json({ session: undefined })
		return
	}

	if (Date.now() > session.expirationDate) {
		const redditAuth = await getRefreshedTokens(
			session.redditAuth.refresh_token,
		)

		session = {
			redditAuth,
			expirationDate: Date.now() + redditAuth.expires_in * 1000 - 5 * 60 * 1000,
		}

		setCookie({ res }, "session", JSON.stringify(session), {
			httpOnly: true,
			sameSite: true,
			path: "/",
		})
	}

	res.json({
		session: {
			redditAccessToken: session.redditAuth.access_token,
		},
	})
}
