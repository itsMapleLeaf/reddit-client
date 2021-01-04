import { tw } from "twind.macro"
import { css } from "twind/css"

export const activePress = tw(
	css({
		":active": {
			transform: "translateY(1px)",
			transition: "none",
		},
	}),
)
