import { Box, CircularProgress } from "@mui/material"

interface IMainContentProps {
	children: React.ReactNode
	loading: boolean
}

const MainContent = ({ children, loading }: IMainContentProps) => {
	return (
		<Box
			sx={{
				position: "relative",
				borderRadius: "20px",
				overflow: "hidden",
				boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
				backgroundColor: "white",
				padding: "24px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "200px",
			}}
		>
			{loading && (
				<Box
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(255, 255, 255, 0.7)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 10,
					}}
				>
					<CircularProgress color="success" />
				</Box>
			)}
			<Box sx={{ opacity: loading ? 0.5 : 1, width: "100%" }}>
				{children}
			</Box>
		</Box>
	)
}

export default MainContent
