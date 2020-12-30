import { useEffectRef } from "features/react/useEffectRef"
import { useEffect } from "react"

const animationFrame = () => new Promise(requestAnimationFrame)

export function useAnimationLoop(callback: (elapsedSeconds: number) => void) {
	const callbackRef = useEffectRef(callback)

	useEffect(() => {
		let running = true

		;(async () => {
			let prevTime = await animationFrame()
			while (running) {
				const currentTime = await animationFrame()
				const elapsedSeconds = (currentTime - prevTime) / 1000
				prevTime = currentTime
				callbackRef.current(elapsedSeconds)
			}
		})()

		return () => {
			running = false
		}
	}, [callbackRef])
}
