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
		localStorage.removeItem("token")
		router.push("/login")
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Link className="navbar-brand" href={"/dashboard"}>
						<img
							src={"/images/cat1.png"}
							alt="logo-diabecat"
							height="40px"
						/>
					</Link>
					<Typography variant="h6">diabecat</Typography>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Link href="/testresults">
						<Button sx={{ marginRight: 2 }}>Wyniki</Button>
					</Link>
					<Link href="/testchart">
						<Button sx={{ marginRight: 2 }}>Wykresy</Button>
					</Link>
					<Button sx={{ marginRight: 2 }}>Terminarz</Button>

					<Button sx={{ padding: 1 }} onClick={handleMenuClick}>
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
