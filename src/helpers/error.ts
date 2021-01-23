export function raise(
	error: string | Error = "something unexpected happened!",
): never {
	throw typeof error === "string" ? new Error(error) : error
}
