export function encodeUriParams(params: { [key: string]: string }) {
	return Object.entries(params)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join("&")
}
