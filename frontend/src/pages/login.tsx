import { faPaw } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	Alert,
	Avatar,
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid2,
	Link,
	TextField,
	Typography,
} from "@mui/material"
import router from "next/router"
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

const Login = () => {
	const [loading, setLoading] = useState(false)

	const [form, setForm] = useState({
		email: "",
		password: "",
	})

	const [error, setError] = useState("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
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
						sign in
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
						name="password"
						label="password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleLogin}
						disabled={loading}
					>
						{loading ? (
							<CircularProgress
								size={24}
								sx={{ color: "white", mr: 1 }}
							/>
						) : null}
						Sign In
					</Button>
					<Grid2 container columnGap={2}>
						<Grid2>
							<Link href="#" variant="body2">
								forgot password?
							</Link>
						</Grid2>
						<Grid2>
							<Link href="/register" variant="body2">
								{"don't have an account? sign up"}
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

export default Login
