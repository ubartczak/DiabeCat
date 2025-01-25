import { Snackbar, Alert } from "@mui/material"

interface SnackbarAlertProps {
	open: boolean
	handleClose: () => void
	message: string
	severity: "success" | "info" | "warning" | "error"
}

export const SnackbarAlert = (props: SnackbarAlertProps) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			open={props.open}
			autoHideDuration={5000}
			onClose={props.handleClose}
		>
			<Alert
				onClose={props.handleClose}
				severity={props.severity}
				variant="filled"
				sx={{ width: "100%" }}
			>
				{props.message}
			</Alert>
		</Snackbar>
	)
}
