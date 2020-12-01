import { raise } from "./common/error"

export const redditAppId = () =>
	process.env.NEXT_PUBLIC_REDDIT_APP_ID ||
	raise(`NEXT_PUBLIC_REDDIT_APP_ID not defined`)

export const redditRedirectUri = () =>
	process.env.NEXT_PUBLIC_REDDIT_APP_REDIRECT_URI ||
	raise(`NEXT_PUBLIC_REDDIT_APP_REDIRECT_URI not defined`)

export const redditAppSecret = () =>
	process.env.REDDIT_APP_SECRET || raise(`REDDIT_APP_SECRET not defined`)

export const sessionSecret = () =>
	process.env.SESSION_SECRET || raise(`SESSION_SECRET not defined`)
