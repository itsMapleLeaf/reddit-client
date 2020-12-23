import {
	ComponentType,
	ExoticComponent,
	Fragment,
	useEffect,
	useRef,
} from "react"

export function useEffectRef<T>(value: T): { readonly current: T } {
	const ref = useRef(value)
	useEffect(() => {
		ref.current = value
	})
	return ref
}

/**
 * Wrap around a component to make it return nothing on the server.
 * Useful for components that have `use[Layout]Effect`, event handlers, etc.
 */
export const isomorphicComponent = <P>(
	component: ComponentType<P>,
): IsomorphicComponent<P> =>
	typeof window !== "undefined" ? component : Fragment

type IsomorphicComponent<P> = ComponentType<P> | ExoticComponent<P>
