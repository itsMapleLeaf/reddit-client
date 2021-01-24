import type { ComponentType, ReactNode } from "react"
import { useEffect, useState } from "react"
import { useMatch } from "react-router-dom"
import type { ParamsFromString } from "./types"

export type LazyRouteProps<
	Path extends string,
	Props extends ParamsFromString<Path>
> = {
	path: Path
	loader: () => Promise<LoaderResult<ComponentType<Props>>>
	placeholder: ReactNode
}

type LoaderResult<Component> =
	| Component
	| { [key: string]: Component | undefined }

const cache = new Map<string, ComponentType<any>>()

export function LazyRoute<
	Path extends string,
	Props extends ParamsFromString<Path>
>({ path, loader, placeholder }: LazyRouteProps<Path, Props>) {
	const [Component, setComponent] = useState(() => cache.get(path))

	const match = useMatch(path)
	const hasMatch = match != null

	useEffect(() => {
		if (hasMatch) {
			let cancelled = false

			loader().then((result) => {
				if (cancelled) return

				const component =
					typeof result === "function"
						? result
						: result.default ??
						  Object.values(result).find<ComponentType<any>>(isFunction)

				if (component) {
					setComponent(() => component)
					cache.set(path, component)
				}
			})

			return () => {
				cancelled = true
			}
		}
	})

	if (!match) {
		return null
	}

	if (!Component) {
		return <>{placeholder}</>
	}

	return <Component {...match.params} />
}

function isFunction(value: unknown): value is (...args: any[]) => any {
	return typeof value === "function"
}
