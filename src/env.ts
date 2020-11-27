declare global {
	interface ImportMeta {
		env: { [key: string]: string | undefined }
	}
}

function getEnv(name: string) {
	const value = import.meta.env[name]
	if (!value) {
		throw new Error(`env variable ${name} not defined`)
	}
	return value
}

export const redditAppId = getEnv("VITE_REDDIT_APP_ID")
export const redditAppSecret = getEnv("VITE_REDDIT_APP_SECRET")
