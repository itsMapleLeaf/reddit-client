import dotenv from "dotenv"
import { join } from "path"

dotenv.config({ path: join(__dirname, "../../../.env") })

function getEnv(name: string) {
	const value = process.env[name]
	if (!value) throw new Error(`env variable ${name} not defined`)
	return value
}

export const redditAppId = getEnv("SNOWPACK_PUBLIC_REDDIT_APP_ID")
export const redditAppSecret = getEnv("REDDIT_APP_SECRET")
export const redditRedirectUri = getEnv(
	"SNOWPACK_PUBLIC_REDDIT_APP_REDIRECT_URI",
)
export const sessionSecret = getEnv("SESSION_SECRET")
