import { Button } from "@mui/material"

interface IButtonProps {
	text: string
	onClick?: () => Promise<void> | void
	onSubmit?: (e: React.FormEvent) => void
	children?: React.ReactNode
	backgroundColor?: string
	textColor?: string
	disabled?: boolean
	fullWidth?: boolean
	disableTouchRipple?: boolean
	variant?: "contained" | "outlined" | "text"
	size?: "small" | "medium" | "large"
	color?:
		| "inherit"
		| "primary"
		| "secondary"
		| "success"
		| "error"
		| "info"
		| "warning"
}

export const MyButton = (props: IButtonProps) => {
	return (
		<Button
			style={{
				backgroundColor: props.backgroundColor,
				borderRadius: "20px",
				color: props.textColor,
				fontFamily: "Ubuntu, sans-serif",
				textTransform: "none",
			}}
			variant={props.variant || "contained"}
			size={props.size || "small"}
			color={props.color || "primary"}
			onClick={props.onClick}
			onSubmit={props.onSubmit}
			disabled={props.disabled}
			fullWidth={props.fullWidth}
			disableTouchRipple={props.disableTouchRipple}
		>
			{props.text}
			{props.children}
		</Button>
	)
}
