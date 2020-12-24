import { ComponentType, ExoticComponent, Fragment } from "react"

/**
 * Wrap around a component to make it return nothing on the server.
 * Useful for components that have `use[Layout]Effect`, event handlers, etc.
 */
export function isomorphicComponent<P>(
	component: ComponentType<P>,
): IsomorphicComponent<P> {
	return typeof window !== "undefined" ? component : Fragment
}

type IsomorphicComponent<P> = ComponentType<P> | ExoticComponent<P>
