export type UriParamsObject = {
	[key: string]: string | number | boolean
}

/**
 * @example
 * // input
 * encodeUriParams({
 *   someString: "someString",
 *   someNumber: 123,
 *   empty: "",
 *   isTrue: true, // encoded as just the key, without a value
 *   trueString: "true",
 *   isFalse: false, // excluded
 *   isUndefined: undefined, // excluded
 *   isNull: null, // excluded
 * })
 *
 * // output
 * "someString=someString&someNumber=123&empty=&isTrue&trueString=true"
 */
export function encodeUriParams(params: UriParamsObject) {
	return Object.entries(params)
		.filter(([, value]) => value != null && value !== false)
		.map(([key, value]) =>
			value === true ? key : `${key}=${encodeURIComponent(value)}`,
		)
		.join("&")
}
