import AspectRatio from "features/ui/AspectRatio"
import Gallery from "features/ui/Gallery"
import "twind.macro"

export default function GalleryTest() {
	return (
		<main tw="max-w-screen-md p-4 mx-auto">
			<AspectRatio ratio={16 / 9}>
				<Gallery
					items={[1, 2, 3]}
					renderItem={(n) => (
						<div tw="grid w-full h-full text-3xl bg-gray-800 border-2 border-gray-700 place-items-center">
							{n}
						</div>
					)}
				/>
			</AspectRatio>
		</main>
	)
}
