import { raise } from "./common/error"

function getEnv(name: string) {
	return import.meta.env[name] ?? raise(`env variable ${name} not defined`)
}

export const redditAppId = getEnv("SNOWPACK_PUBLIC_REDDIT_APP_ID")
export const redditRedirectUri = getEnv(
	"SNOWPACK_PUBLIC_REDDIT_APP_REDIRECT_URI",
)