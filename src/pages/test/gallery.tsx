import AspectRatio from "features/ui/AspectRatio"
import Gallery from "features/ui/Gallery"
import "twin.macro"

export default function GalleryTest() {
	return (
		<main tw="max-w-screen-md mx-auto p-4">
			<AspectRatio ratio={16 / 9}>
				<Gallery
					items={[1, 2, 3]}
					renderItem={(n) => (
						<div tw="w-full h-full bg-gray-800 border-2 border-gray-700 grid place-items-center text-3xl">
							{n}
						</div>
					)}
				/>
			</AspectRatio>
		</main>
	)
}
