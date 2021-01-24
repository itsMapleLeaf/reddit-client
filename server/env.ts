import { raise } from "../src/helpers/error"

export const getRedditAppId = () =>
	process.env.VITE_REDDIT_APP_ID || raise("env VITE_REDDIT_APP_ID not defined")

export const getRedditRedirectUri = () =>
	process.env.VITE_REDDIT_APP_REDIRECT_URI ||
	raise("env VITE_REDDIT_APP_REDIRECT_URI not defined")

export const getRedditAppSecret = () =>
	process.env.REDDIT_APP_SECRET || raise("env REDDIT_APP_SECRET not defined")

export const getRedditAppUserAgent = () =>
	process.env.VITE_REDDIT_USER_AGENT ||
	raise("env VITE_REDDIT_USER_AGENT not defined")
