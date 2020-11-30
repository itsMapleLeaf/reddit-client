const fs = require("fs")
const { dirname, join } = require("path")

// custom dotenv plugin that walks up the directory tree for additional .env files,
// but only if they're beside package.json files
module.exports = function dotenvPlugin(config, options) {
	const { NODE_ENV } = process.env

	// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
	const dotenvFiles = [
		NODE_ENV && `.env.${NODE_ENV}.local`,
		// Don't include `.env.local` for `test` environment
		// since normally you expect tests to produce the same
		// results for everyone
		NODE_ENV !== "test" && `.env.local`,
		NODE_ENV && `.env.${NODE_ENV}`,
		".env",
	].filter(Boolean)

	// Load environment variables from .env* files. Suppress warnings using silent
	// if this file is missing. dotenv will never modify any environment variables
	// that have already been set.  Variable expansion is supported in .env files.
	// https://github.com/motdotla/dotenv
	// https://github.com/motdotla/dotenv-expand
	let currentFolder = process.cwd()

	while (currentFolder !== "/") {
		if (fs.existsSync(join(currentFolder, "package.json"))) {
			dotenvFiles.forEach((dotenvFile) => {
				if (fs.existsSync(join(currentFolder, dotenvFile))) {
					require("dotenv-expand")(
						require("dotenv").config({
							path: join(currentFolder, dotenvFile),
						}),
					)
				}
			})
		}

		currentFolder = dirname(currentFolder)
	}

	return {
		name: "@snowpack/plugin-dotenv",
	}
}
