import tw from "twin.macro"
import { activePress } from "./utilities"

export const buttonSolid = [
	tw`inline-block p-3 font-medium leading-none tracking-wide text-white transition duration-200 bg-gray-700 rounded shadow-md`,
	activePress,
]
