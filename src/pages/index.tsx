import React from "react"
import LoginPage from "../app/auth/LoginPage"
import { SessionProvider, useSessionQuery } from "../app/client-session"
import RouterRoot from "../app/core/RouterRoot"
import { RouteProvider } from "../app/router"

export default function Index() {
	const { data, isLoading } = useSessionQuery()

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (!data?.session) {
		return <LoginPage />
	}

	return (
		<SessionProvider session={data.session}>
			<RouteProvider>
				<RouterRoot />
			</RouteProvider>
		</SessionProvider>
	)
}
