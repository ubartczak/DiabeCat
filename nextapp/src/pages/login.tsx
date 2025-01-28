import Layout from "@/components/Layout"
import { MyButton } from "@/components/MyButton"
import { SnackbarAlert } from "@/components/SnackbarAlert"
import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	Avatar,
	Box,
	CircularProgress,
	Container,
	Grid2,
	Link,
	TextField,
	Typography,
} from "@mui/material"
import router from "next/router"
import React, { useState } from "react"

const Login = () => {
	const [loading, setLoading] = useState(false)
	const [openSB, setOpenSB] = useState(false)
	const [error, setError] = useState("")
	const [form, setForm] = useState({
		email: "",
		password: "",
	})

	const handleCloseSB = () => {
		setOpenSB(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleLogin = async () => {
		setError("")
		setLoading(true)

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: form.email,
					password: form.password,
				}),
			})

			if (!res.ok) {
				const { error } = await res.json()
				throw new Error(error || "Failed to login")
			}

			const { token } = await res.json()

			localStorage.setItem("token", token)

			router.push("/dashboard")
		} catch (error: any) {
			setError(error.message)
			setLoading(false)
			setOpenSB(true)
		}
	}

	return (
		<>
			<Layout>
				<Container
					component="main"
					maxWidth="xs"
					style={{ paddingBottom: "15px" }}
				>
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
							sign in
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
							style={{ fontFamily: "Ubuntu, sans-serif" }}
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
							autoComplete="current-password"
							onChange={handleChange}
							style={{ fontFamily: "Ubuntu, sans-serif" }}
						/>
						{/* <FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="remember me"
						/> */}
						<MyButton
							text="sign in"
							onClick={handleLogin}
							disabled={loading}
							fullWidth
							disableTouchRipple
						>
							{loading ? (
								<CircularProgress
									size={24}
									sx={{ color: "white", mr: 1 }}
								/>
							) : null}
						</MyButton>
						<Grid2
							container
							columnGap={2}
							style={{
								justifyContent: "space-around",
								paddingTop: "8px",
							}}
						>
							<Grid2>
								<Link
									href="#"
									variant="body2"
									underline="hover"
									style={{ fontFamily: "Ubuntu, sans-serif" }}
								>
									forgot password?
								</Link>
							</Grid2>
							<Grid2>
								<Link
									href="/register"
									variant="body2"
									underline="hover"
									style={{ fontFamily: "Ubuntu, sans-serif" }}
								>
									{"don't have an account? sign up"}
								</Link>
							</Grid2>
						</Grid2>
					</form>
				</Container>
			</Layout>
		</>
	)
}

export default Login
