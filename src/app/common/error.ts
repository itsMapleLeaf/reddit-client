export function raise(errorMessage: string): never {
	throw new Error(errorMessage)
}
