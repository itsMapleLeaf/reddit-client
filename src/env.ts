import { raise } from "./helpers/error"

export const getRedditAppId = () =>
	process.env.NEXT_PUBLIC_REDDIT_APP_ID ||
	raise("env NEXT_PUBLIC_REDDIT_APP_ID not defined")

export const getRedditRedirectUri = () =>
	process.env.NEXT_PUBLIC_REDDIT_APP_REDIRECT_URI ||
	raise("env NEXT_PUBLIC_REDDIT_APP_REDIRECT_URI not defined")

export const getRedditAppSecret = () =>
	process.env.REDDIT_APP_SECRET || raise("env REDDIT_APP_SECRET not defined")

export const getRedditAppUserAgent = () =>
	process.env.NEXT_PUBLIC_REDDIT_USER_AGENT ||
	raise("env NEXT_PUBLIC_REDDIT_USER_AGENT not defined")
