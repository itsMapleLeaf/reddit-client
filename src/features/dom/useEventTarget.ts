import { useEffect } from "react"

export function useEventTarget<E extends keyof WindowEventMap>(
	target: Window,
	event: E,
	callback: (event: WindowEventMap[E]) => void,
): void

export function useEventTarget<E extends keyof DocumentEventMap>(
	target: Document,
	event: E,
	callback: (event: DocumentEventMap[E]) => void,
): void

export function useEventTarget<E extends keyof HTMLElementEventMap>(
	target: HTMLElement,
	event: E,
	callback: (event: HTMLElementEventMap[E]) => void,
): void

export function useEventTarget(
	target: EventTarget,
	event: string,
	callback: (event: Event) => void,
) {
	useEffect(() => {
		target.addEventListener(event, callback)
		return () => target.removeEventListener(event, callback)
	})
}
