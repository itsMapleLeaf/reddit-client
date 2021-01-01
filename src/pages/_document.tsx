import Document, { DocumentContext } from "next/document"
import * as React from "react"
import { setup } from "twind"
import { asyncVirtualSheet, getStyleTagProperties } from "twind/server"
import tailwindConfig from "../../tailwind.config"

const sheet = asyncVirtualSheet()

setup({ ...tailwindConfig, sheet })

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		sheet.reset()

		const initialProps = await Document.getInitialProps(ctx)

		const { id, textContent } = getStyleTagProperties(sheet)

		const styleProps = {
			id,
			key: id,
			dangerouslySetInnerHTML: {
				__html: textContent,
			},
		}

		return {
			...initialProps,
			styles: [
				...(initialProps.styles as any),
				React.createElement("style", styleProps),
			],
		}
	}

	// render() {
	// 	return (
	// 		<Html>
	// 			<Head />
	// 			<body>
	// 				<Main />
	// 				<NextScript />
	// 			</body>
	// 		</Html>
	// 	)
	// }
}
