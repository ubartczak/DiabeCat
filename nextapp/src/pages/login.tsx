import { CustomTextField } from "@/components/inputs/CustomTextField"
import Layout from "@/components/navigation/Layout"
import { MyButton } from "@/components/inputs/CustomButton"
import { SnackbarAlert } from "@/components/feedback/SnackbarAlert"
import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	Avatar,
	Box,
	CircularProgress,
	Container,
	Grid2,
	Link,
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

	const labelStyle = {
		fontSize: "14px",
		lineHeight: "30px",
		color: "#303030",
	}

	return (
		<>
			<Layout loading={loading}>
				<Container
					component="main"
					maxWidth="xs"
					style={{ width: "100%" }}
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
							logowanie
						</Typography>
					</Box>
					<SnackbarAlert
						open={openSB}
						message={error}
						severity="error"
						handleClose={handleCloseSB}
					/>
					<form noValidate>
						<Box>
							<label htmlFor="email" style={labelStyle}>
								email
							</label>
							<CustomTextField
								id="email"
								name="email"
								onChange={handleChange}
							/>
						</Box>
						<Box
							sx={{
								width: "100%",
								paddingBottom: "16px",
							}}
						>
							<label htmlFor="password" style={labelStyle}>
								hasło
							</label>
							<CustomTextField
								id="password"
								name="password"
								type="password"
								onChange={handleChange}
							/>
						</Box>
						{/* TO DO - <FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="remember me"
						/> */}
						<MyButton
							text="zaloguj się"
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
									zapomniałeś hasła?
								</Link>
							</Grid2>
							<Grid2>
								<Link
									href="/register"
									variant="body2"
									underline="hover"
									style={{ fontFamily: "Ubuntu, sans-serif" }}
								>
									{"nie masz konta? zarejestruj się"}
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
