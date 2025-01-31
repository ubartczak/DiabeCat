import { CustomTextField } from "@/components/inputs/CustomTextField"
import Layout from "@/components/navigation/Layout"
import { MyButton } from "@/components/inputs/MyButton"
import { SnackbarAlert } from "@/components/feedback/SnackbarAlert"
import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Box, Container, Grid2, Link, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React, { useState } from "react"

const Register = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [openSB, setOpenSB] = useState(false)
	const router = useRouter()

	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
	})

	const handleCloseSB = () => {
		setOpenSB(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})

		if (
			e.target.name === "firstName" ||
			e.target.name === "lastName" ||
			e.target.name === "email" ||
			e.target.name === "password" ||
			e.target.name === "repeatPassword"
		) {
			setError("")
		}
	}

	const handleSubmit = async () => {
		setLoading(true)

		if (
			!form.firstName ||
			!form.lastName ||
			!form.email ||
			!form.password ||
			!form.repeatPassword
		) {
			setError("wszystkie pola muszą być uzupełnione")
			setOpenSB(true)
			setLoading(false)
			return
		}

		if (form.password !== form.repeatPassword) {
			setError("hasła muszą być identyczne")
			setOpenSB(true)
			setLoading(false)
			return
		}

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
			setOpenSB(true)
			setTimeout(() => {
				router.push("/login")
			}, 3000)
		} else {
			const data = await response.json()
			setError(data.message)
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
			<Layout>
				{!error && (
					<SnackbarAlert
						open={openSB}
						message={
							"sukces - zostaniesz przeniesiony na stronę logowania"
						}
						severity="success"
					/>
				)}
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
							rejestracja
						</Typography>
					</Box>
					{error && (
						<SnackbarAlert
							open={openSB}
							message={error}
							severity="error"
							handleClose={handleCloseSB}
						/>
					)}
					<form noValidate>
						<Box sx={{ width: "100%" }}>
							<label htmlFor="email" style={labelStyle}>
								email
							</label>
							<CustomTextField
								id="email"
								name="email"
								onChange={handleChange}
							/>
						</Box>
						<Box sx={{ width: "100%" }}>
							<label htmlFor="firstName" style={labelStyle}>
								imię
							</label>
							<CustomTextField
								id="firstName"
								name="firstName"
								onChange={handleChange}
							/>
						</Box>
						<Box sx={{ width: "100%" }}>
							<label htmlFor="lastName" style={labelStyle}>
								nazwisko
							</label>
							<CustomTextField
								id="lastName"
								name="lastName"
								onChange={handleChange}
							/>
						</Box>
						<Box sx={{ width: "100%" }}>
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
						<Box sx={{ width: "100%", paddingBottom: "16px" }}>
							<label htmlFor="repeatPassword" style={labelStyle}>
								powtórz hasło
							</label>
							<CustomTextField
								id="repeatPassword"
								name="repeatPassword"
								type="password"
								onChange={handleChange}
							/>
						</Box>
						<Box
						// sx={{
						// 	display: "flex",
						// 	justifyContent: "center",
						// 	width: "100%",
						// 	mt: 2,
						// }}
						>
							<MyButton
								text="utwórz konto"
								onClick={handleSubmit}
								disabled={loading}
								fullWidth
								disableTouchRipple
							></MyButton>
						</Box>
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
									{"posiadasz już konto? zaloguj się"}
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
