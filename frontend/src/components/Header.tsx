import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
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
		localStorage.removeItem("token") // Usuwamy token
		router.push("/login") // Przekierowanie na stronę logowania
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Container>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{/* Logo po lewej stronie */}
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Avatar sx={{ marginRight: 1 }}>
							<FontAwesomeIcon icon={faPaw} />
						</Avatar>
						<Typography variant="h6">Diabecat</Typography>
					</Box>

					{/* Menu po prawej stronie */}
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Link href="/testresults">
							wyniki
							<Button sx={{ marginRight: 2 }}>Wyniki</Button>
						</Link>
						<Button sx={{ marginRight: 2 }}>Wykresy</Button>
						<Button sx={{ marginRight: 2 }}>Terminarz</Button>

						{/* Menu rozwijane */}
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
							<MenuItem onClick={handleCloseMenu}>
								Moje dane
							</MenuItem>
							<MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</Box>
	)
}

export default Header
