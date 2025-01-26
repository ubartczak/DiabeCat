import { Html, Head, Main, NextScript } from "next/document"
import "../styles/globals.css"

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body
				style={{
					margin: 0,
					padding: "8px 0 0 0",
					minHeight: "100vh",
					backgroundColor: "#d7d7e3",
				}}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
