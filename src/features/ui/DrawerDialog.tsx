import Portal from "features/ui/Portal"
import { cloneElement, ReactElement, ReactNode } from "react"
import FocusLock from "react-focus-lock"
import {
	Dialog,
	DialogBackdrop,
	DialogDisclosure,
	useDialogState,
} from "reakit"
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
	const dialog = useDialogState({ modal: false, animated: true })
	return (
		<>
			<DialogDisclosure {...dialog}>
				{(disclosureProps) => cloneElement(trigger, disclosureProps)}
			</DialogDisclosure>

			<Portal>
				<FocusLock returnFocus>
					<DialogBackdrop
						{...dialog}
						tw="fixed inset-0 z-10 transition-opacity bg-black bg-opacity-50 opacity-0"
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
				</FocusLock>
			</Portal>
		</>
	)
}
