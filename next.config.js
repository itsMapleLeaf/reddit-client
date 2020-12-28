module.exports = {
	webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
		if (!isServer) {
			config.node = { fs: "empty" }
		}

		return config
	},

	async rewrites() {
		return [
			{ source: "/", destination: "/home/hot" },
			{ source: "/home", destination: "/home/hot" },
			{ source: "/r/:subreddit", destination: "/r/:subreddit/hot" },
		]
	},
}
