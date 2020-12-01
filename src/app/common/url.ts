export type UriParamsObject = {
	[key: string]: string | number | boolean
}

export function encodeUriParams(params: UriParamsObject) {
	return Object.entries(params)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join("&")
}
