import React from "react"
import { Box, Typography } from "@mui/material"
import Header from "./Header"
import MainContent from "./MainContent"

interface ILayoutProps {
	children: React.ReactNode
	loading: boolean
}

const Layout = ({ children, loading }: ILayoutProps) => {
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
				<MainContent children={children} loading={loading} />
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
