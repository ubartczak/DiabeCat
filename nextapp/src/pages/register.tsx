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
	Link,
	TextField,
	Typography,
} from "@mui/material"
import React, { useState } from "react"

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"copyright © "}
			<Link color="inherit" href="https://mui.com/">
				diabecat
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

const Register = () => {
	// ma być w typie User
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
	})
	const [error, setError] = useState("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

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
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div>
				<Box display="flex" justifyContent="center" mb={2} mt={4}>
					<Avatar>
						<FontAwesomeIcon icon={faPaw} />
					</Avatar>
				</Box>
				<Box display="flex" justifyContent="center" mb={2}>
					<Typography component="h1" variant="h5">
						register
					</Typography>
				</Box>
				{error && (
					<Alert severity="error" sx={{ mt: 2, mb: 2 }}>
						{error}
					</Alert>
				)}
				<form noValidate>
					<TextField
						variant="outlined"
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
						variant="outlined"
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
						variant="outlined"
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
						variant="outlined"
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
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="repeatPassword"
						label="repeat password"
						type="password"
						id="repeatPassword"
						onChange={handleChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						sign up
					</Button>
					<Grid2 container columnGap={2}>
						<Grid2>
							<Link href="/login" variant="body2">
								{"already have an account? sign in"}
							</Link>
						</Grid2>
					</Grid2>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	)
}

export default Register
