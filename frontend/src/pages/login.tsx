import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid2,
	Link,
	TextField,
	Typography,
} from "@mui/material"
import React from "react"

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
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div>
				<Avatar>{/* <LockOutlinedIcon /> */}</Avatar>
				<Typography component="h1" variant="h5">
					sign in
				</Typography>
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
					>
						Sign In
					</Button>
					<Grid2 container columnGap={2}>
						<Grid2>
							<Link href="#" variant="body2">
								Forgot password?
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
