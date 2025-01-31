import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import Link from "next/link"

const Header = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [openMenu, setOpenMenu] = useState(false)
	const router = useRouter()

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
		setOpenMenu(true)
	}

	const handleCloseMenu = () => {
		setAnchorEl(null)
		setOpenMenu(false)
	}

	const handleLogout = () => {
		console.log("logout")
		localStorage.removeItem("token")
		router.push("/login")
	}

	const getButtonStyle = (path: string) => ({
		backgroundColor: router.pathname === path ? "#303030" : "inherit",
		borderRadius: router.pathname === path ? "20px" : "inherit",
		color: router.pathname === path ? "white" : "#303030",
		fontFamily: "Ubuntu, sans-serif",
		textTransform: "none",
	})

	return (
		<Box
			sx={{
				flexGrow: 1,
				borderRadius: "20px",
				overflow: "hidden",
				boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
				backgroundColor: "white",
				marginBottom: "8px",
			}}
		>
			<Toolbar
				sx={{
					position: "relative",
					display: "flex",
					backgroundColor: "white",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Link className="navbar-brand" href={"/dashboard"}>
						<img
							src={"/images/cat1.png"}
							alt="logo-diabecat"
							height="40px"
						/>
					</Link>
					<Typography
						variant="h6"
						style={{
							marginLeft: "8px",
							fontWeight: "bold",
							fontFamily: "Ubuntu, sans-serif",
							color: "#303030",
						}}
					>
						diabecat
					</Typography>
				</Box>

				<Box
					sx={{
						position: "absolute",
						left: "50%",
						transform: "translateX(-50%)",
						display: "flex",
						alignItems: "center",
						backgroundColor: "#d7d7e3",
						borderRadius: "20px",
						boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
						zIndex: 2,
					}}
				>
					<Link href="/cats">
						<Button sx={getButtonStyle("/cats")} disableTouchRipple>
							cats
						</Button>
					</Link>
					<Link href="/testresults">
						<Button
							sx={getButtonStyle("/testresults")}
							disableTouchRipple
						>
							results
						</Button>
					</Link>
					<Link href="/testchart">
						<Button
							sx={getButtonStyle("/testchart")}
							disableTouchRipple
						>
							charts
						</Button>
					</Link>
					<Link href="/calendar">
						<Button
							sx={getButtonStyle("/calendar")}
							disableTouchRipple
						>
							calendar
						</Button>
					</Link>
				</Box>

				<Box sx={{ marginLeft: "auto" }}>
					<Button onClick={handleMenuClick}>
						<Avatar sx={{ width: 30, height: 30 }}>
							<FontAwesomeIcon icon={faPaw} />
						</Avatar>
					</Button>

					<Menu
						anchorEl={anchorEl}
						open={openMenu}
						onClose={handleCloseMenu}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem onClick={handleCloseMenu}>Moje dane</MenuItem>
						<MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</Box>
	)
}

export default Header
