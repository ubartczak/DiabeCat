import { Button } from "@mui/material"

interface IButtonProps {
	text: string
	onClick: () => void
	backgroundColor?: string
	textColor?: string
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
		>
			{props.text}
		</Button>
	)
}
