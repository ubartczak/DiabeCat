import React from "react"
import { Box, Typography } from "@mui/material"
import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Header />
			<Box sx={{ flexGrow: 1 }} padding={"0 24px"}>
				<main>{children}</main>
			</Box>
			<footer style={{ textAlign: "center", padding: "10px" }}>
				<Typography variant="body2" color="textSecondary">
					copyright ©2025 diabecat
				</Typography>
			</footer>
		</div>
	)
}

export default Layout
