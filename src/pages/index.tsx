import { Menu } from "@headlessui/react"
import PostCard from "features/reddit/PostCard"
import { useRedditHotQuery } from "features/reddit/queries"
import Icon from "features/ui/Icon"
import { filterIcon, menuIcon } from "features/ui/icons"
import Link from "next/link"
import "twin.macro"

export default function Index() {
	const listing = useRedditHotQuery()

	return (
		<div tw="space-y-4">
			<header
				tw="sticky top-0 grid items-center gap-3 p-3 bg-gray-800 shadow-md bg-opacity-80 z-10"
				style={{
					backdropFilter: `blur(4px)`,
					gridTemplateColumns: "auto 1fr auto",
				}}
			>
				<button type="button" title="Menu" tw="p-2 -m-2 block">
					<Icon name={menuIcon} tw="w-6" />
				</button>

				<div tw="grid gap-1">
					<h1 tw="text-lg leading-none font-condensed">Home</h1>
					<p tw="text-sm leading-none text-gray-400">Hot</p>
				</div>

				<div tw="relative">
					<Menu>
						<Menu.Button title="Filter" tw="p-2 -m-2 block">
							<Icon name={filterIcon} tw="w-5" />
						</Menu.Button>

						<div tw="absolute right-0">
							<Menu.Items tw="relative top-2 grid w-max bg-gray-700 shadow-lg">
								{[
									{ name: "Best" },
									{ name: "Hot" },
									{ name: "New" },
									{ name: "Top" },
								].map((link, index) => (
									<Menu.Item key={index}>
										<Link href="/" passHref>
											<a tw="px-3 py-2 leading-none hover:bg-gray-600">
												{link.name}
											</a>
										</Link>
									</Menu.Item>
								))}
							</Menu.Items>
						</div>
					</Menu>
				</div>
			</header>

			<main>
				{listing.isLoading && <p>Loading...</p>}
				{listing.error && <p>{String(listing.error)}</p>}
				{listing.data && (
					<ul tw="space-y-4">
						{listing.data.pages
							.flatMap((page) => page.data.children)
							.map((post) => (
								<li key={post.data.id}>
									<PostCard {...post} />
								</li>
							))}
						<button onClick={() => listing.fetchNextPage()}>load more</button>
					</ul>
				)}
			</main>
		</div>
	)
}
