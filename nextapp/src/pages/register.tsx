import Layout from "@/components/Layout"
import { MyButton } from "@/components/MyButton"
import { SnackbarAlert } from "@/components/SnackbarAlert"
import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	Alert,
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	Grid2,
	Input,
	InputBase,
	Link,
	TextField,
	Typography,
} from "@mui/material"
import React, { useState } from "react"

const Register = () => {
	const [loading, setLoading] = useState(false)

	// ma być w typie User
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
	})
	const [error, setError] = useState("")
	const [openSB, setOpenSB] = useState(false)

	const handleCloseSB = () => {
		setOpenSB(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		setLoading(true)

		const response = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: form.firstName,
				lastName: form.lastName,
				email: form.email,
				password: form.password,
				repeatPassword: form.repeatPassword,
			}),
		})

		if (response.ok) {
			alert("Registration successful")
		} else {
			const data = await response.json()
			setError(data.message)
			setLoading(false)
			setOpenSB(true)
		}
	}

	const ariaLabel = {
		"aria-label": "description",
		"font-family": "Ubuntu, sans-serif",
		font: "Ubuntu, sans-serif",
	}

	return (
		<>
			<Layout>
				<Container component="main" maxWidth="xs">
					<Box display="flex" justifyContent="center" mb={1} mt={1}>
						<Avatar>
							<FontAwesomeIcon icon={faPaw} />
						</Avatar>
					</Box>
					<Box display="flex" justifyContent="center" mb={1}>
						<Typography
							component="h1"
							variant="h5"
							style={{ fontFamily: "Ubuntu, sans-serif" }}
						>
							register
						</Typography>
					</Box>
					<SnackbarAlert
						open={openSB}
						message={error}
						severity="error"
						handleClose={handleCloseSB}
					/>
					<form noValidate>
						<TextField
							size="small"
							variant="standard"
							margin="normal"
							required
							fullWidth
							id="email"
							label="email address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={handleChange}
						/>
						<TextField
							size="small"
							variant="standard"
							margin="normal"
							required
							fullWidth
							name="firstName"
							label="first name"
							type="text"
							id="firstName"
							onChange={handleChange}
						/>
						<TextField
							size="small"
							variant="standard"
							margin="normal"
							required
							fullWidth
							name="lastName"
							label="last name"
							type="text"
							id="lastName"
							onChange={handleChange}
						/>
						<TextField
							size="small"
							variant="standard"
							margin="normal"
							required
							fullWidth
							name="password"
							label="password"
							type="password"
							id="password"
							onChange={handleChange}
						/>
						<TextField
							size="small"
							variant="standard"
							margin="normal"
							required
							fullWidth
							name="repeatPassword"
							label="repeat password"
							type="password"
							id="repeatPassword"
							onChange={handleChange}
						/>
						<MyButton
							text="sign up"
							onClick={handleSubmit}
							disabled={loading}
							fullWidth
							disableTouchRipple
						></MyButton>
						<Grid2
							container
							justifyContent="center"
							style={{ paddingTop: "8px" }}
						>
							<Grid2>
								<Link
									href="/login"
									variant="body2"
									underline="hover"
									style={{ fontFamily: "Ubuntu, sans-serif" }}
								>
									{"already have an account? sign in"}
								</Link>
							</Grid2>
						</Grid2>
					</form>
				</Container>
			</Layout>
		</>
	)
}

export default Register
