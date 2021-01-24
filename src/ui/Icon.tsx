import "@twind/macro"
import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement> & {
	/** Use an export from ./icons.ts */
	name: string
}

/**
 * Add a `w-*` class to customize the icon size
 */
export function Icon({ name, ...props }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" tw="w-6 h-auto" {...props}>
			<path d={name} />
		</svg>
	)
}
