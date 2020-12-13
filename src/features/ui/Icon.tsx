import { SVGProps } from "react"
import "twin.macro"

type IconProps = SVGProps<SVGSVGElement> & {
	/** Use an export from ./icons.ts */
	name: string
}

export default function Icon({ name, ...props }: IconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" tw="w-auto h-auto" {...props}>
			<path d={name} />
		</svg>
	)
}
