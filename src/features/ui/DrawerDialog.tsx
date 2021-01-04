import Portal from "features/ui/Portal"
import { cloneElement, ReactElement, ReactNode } from "react"
import FocusLock from "react-focus-lock"
import {
	Dialog,
	DialogBackdrop,
	DialogDisclosure,
	useDialogState,
} from "reakit"
import { tw } from "twind.macro"
import { css } from "twind/css"

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
						className={tw(
							`fixed inset-0 z-10 transition-opacity bg-black bg-opacity-50 opacity-0`,
							css({ "&[data-enter]": { opacity: 100 } }),
						)}
					>
						<Dialog
							{...dialog}
							aria-label={label}
							tabIndex={0}
							className={tw(
								`fixed inset-y-0 left-0 w-64 min-h-full overflow-y-auto transition-transform bg-gray-800 shadow`,
								css({
									"transform": `translateX(-100%)`,
									"&[data-enter]": { transform: `translateX(0)` },
								}),
							)}
						>
							{children}
						</Dialog>
					</DialogBackdrop>
				</FocusLock>
			</Portal>
		</>
	)
}
