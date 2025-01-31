import React from "react"
import { Box, Typography } from "@mui/material"
import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div style={{ margin: 0, padding: 0 }}>
			<Box
				sx={{
					flexGrow: 1,
					padding: "0 24px",
					backgroundColor: "#d7d7e3",
					fontFamily: "Ubuntu, sans-serif",
				}}
			>
				<Header />
				<main
					style={{
						borderRadius: "20px",
						overflow: "hidden",
						boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
						backgroundColor: "white",
						padding: "24px",
					}}
				>
					{children}
				</main>
				<footer
					style={{
						textAlign: "center",
						padding: "10px",
					}}
				>
					<Typography
						variant="body2"
						color="textSecondary"
						style={{ fontFamily: "Ubuntu, sans-serif" }}
					>
						copyright ©2025 diabecat
					</Typography>
				</footer>
			</Box>
		</div>
	)
}

export default Layout
