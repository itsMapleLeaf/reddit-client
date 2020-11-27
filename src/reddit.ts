const params = {
	client_id: `6Sn-r8GU1jcSig`,
	response_type: `code`,
	state: `.`,
	redirect_uri: `http://localhost:3000/auth_redirect`,
	duration: `permanent`,
	scope: "identity read",
}

const encodedParams = Object.entries(params)
	.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
	.join("&")

export const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodedParams}`
