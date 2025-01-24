import React from "react"
import { Typography } from "@mui/material"
import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Header />

			<main>{children}</main>

			<footer style={{ textAlign: "center", padding: "10px" }}>
				<Typography variant="body2" color="textSecondary">
					copyright © 2025 MyApp
				</Typography>
			</footer>
		</div>
	)
}

export default Layout
