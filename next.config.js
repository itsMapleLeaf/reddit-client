const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
})

const config = {
	async rewrites() {
		return [
			{ source: "/", destination: "/home/hot" },
			{ source: "/home", destination: "/home/hot" },
			{ source: "/r/:subreddit", destination: "/r/:subreddit/hot" },
		]
	},
}

module.exports = withBundleAnalyzer(config)
