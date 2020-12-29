import { cloneElement, ReactElement, ReactNode } from "react"
import {
	Dialog,
	DialogBackdrop,
	DialogDisclosure,
	useDialogState,
} from "reakit/Dialog"
import tw from "twin.macro"

export default function DrawerDialog({
	label,
	trigger,
	children,
}: {
	label: string
	trigger: ReactElement
	children: ReactNode
}) {
	const dialog = useDialogState({ animated: true })
	return (
		<>
			<DialogDisclosure {...dialog}>
				{(disclosureProps) => cloneElement(trigger, disclosureProps)}
			</DialogDisclosure>

			<DialogBackdrop
				{...dialog}
				tw="fixed inset-0 z-20 transition-opacity bg-black bg-opacity-50 opacity-0"
				css={{ "&[data-enter]": tw`opacity-100` }}
			>
				<Dialog
					{...dialog}
					aria-label={label}
					tabIndex={0}
					tw="fixed inset-y-0 left-0 w-64 min-h-full overflow-y-auto transition-transform transform -translate-x-full bg-gray-800 shadow"
					css={{ "&[data-enter]": tw`translate-x-0` }}
				>
					{children}
				</Dialog>
			</DialogBackdrop>
		</>
	)
}
