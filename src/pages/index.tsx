import React from "react"
import { useSessionQuery } from "../app/client-session"
import { encodeUriParams } from "../app/common/url"
import { redditAppId, redditRedirectUri } from "../app/env"

const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?${encodeUriParams(
	{
		client_id: redditAppId(),
		response_type: `code`,
		state: `.`,
		redirect_uri: redditRedirectUri(),
		duration: `permanent`,
		scope: "identity read",
	},
)}`

export default function Index() {
	const { data, isLoading } = useSessionQuery()

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (!data?.session) {
		return (
			<main className="container p-4 mx-auto">
				<a
					href={redditAuthUrl}
					className="inline-block p-3 font-medium leading-none tracking-wide text-white transition duration-200 rounded shadow-md bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
				>
					Login
				</a>
			</main>
		)
	}

	return (
		<div>
			<header className="flex bg-gray-800">
				<button type="button" className="p-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				<div className="py-2 space-y-1">
					<h1 className="text-lg font-medium leading-none">Home</h1>
					<p className="text-sm leading-none text-gray-400">Best</p>
				</div>
			</header>
		</div>
	)
}
