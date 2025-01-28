import { TextField } from "@mui/material"

interface ITextFieldProps {
	id: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	variant?: "standard" | "outlined" | "filled"
	fullWidth?: boolean
	type?: string
	backgroundColor?: string
	borderRadius?: string
	padding?: string
	fontSize?: string
	color?: string
	boxShadow?: string
	select?: boolean
	multiline?: boolean
	rows?: number
}

export const CustomTextField = (props: ITextFieldProps) => {
	return (
		<TextField
			id={props.id}
			onChange={props.onChange}
			variant={props.variant ?? "standard"}
			fullWidth={props.fullWidth ?? true}
			type={props.type ?? "text"}
			select={props.select}
			multiline={props.multiline}
			rows={props.rows}
			style={{
				backgroundColor: props.backgroundColor ?? "#d7d7e3",
				borderRadius: props.borderRadius ?? "20px",
				padding: props.padding ?? "4px 8px",
				fontFamily: "Ubuntu, sans-serif",
				fontSize: props.fontSize ?? "14px",
				color: "#303030",
				boxShadow: props.boxShadow ?? "0px 4px 10px rgba(0, 0, 0, 0.1)",
			}}
			slotProps={{
				input: { disableUnderline: true },
			}}
		/>
	)
}
