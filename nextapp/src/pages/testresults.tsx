import Layout from "@/components/Layout"
import { MyButton } from "@/components/MyButton"
import { SnackbarAlert } from "@/components/SnackbarAlert"
import TestResultsGrid from "@/components/TestResultsGrid"
import { ITestResult } from "@/models/TestResult"
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Snackbar,
	TextField,
} from "@mui/material"
import { set } from "mongoose"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const TestResults = () => {
	const [error, setError] = useState("")
	const [open, setOpen] = useState(false)
	const [openSB, setOpenSB] = useState(false)
	const [form, setForm] = useState<Partial<ITestResult>>()
	const [loading, setLoading] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleOpenSB = () => {
		setOpenSB(true)
	}

	const handleCloseSB = () => {
		setOpenSB(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setForm((prevForm) => ({
			...prevForm,
			[name]: name === "value" ? parseFloat(value) || "" : value,
		}))
	}

	const handleAddResult = async (testresult: Partial<ITestResult>) => {
		const id = uuidv4().slice(0, 5)

		const payload = {
			id: id,
			value: testresult.value as number,
			date: testresult.date,
			author: testresult.author,
		} as ITestResult

		const response = await fetch("/api/results/addResults", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})

		if (response.ok) {
			setOpenSB(true)
			setOpen(false)
		} else {
			const data = await response.json()
			setError(data.message)
		}
	}

	const handleEditResult = async (testresult?: Partial<ITestResult>) => {
		// const payload = {
		// 	id: id,
		// 	value: testresult.value as number,
		// 	date: testresult.date,
		// 	author: testresult.author,
		// } as ITestResult
		// const response = await fetch("/api/results/editResults", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(payload),
		// })
		// if (response.ok) {
		// 	setOpenSB(true)
		// 	setOpen(false)
		// } else {
		// 	const data = await response.json()
		// 	setError(data.message)
		// }
	}

	return (
		<Layout>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<h1
					style={{
						textAlign: "center",
						margin: "0 0 8px 0",
						color: "#303030",
					}}
				>
					test results
				</h1>
				<SnackbarAlert
					open={openSB}
					handleClose={handleCloseSB}
					message="test result added"
					severity="success"
				/>
				<Box
					style={{
						display: "flex",
						gap: "8px",
						paddingBottom: "8px",
					}}
				>
					<MyButton
						text="add result"
						onClick={handleOpen}
						color="success"
					/>
					<MyButton
						text="edit result"
						onClick={handleEditResult}
						color="warning"
					/>
					<MyButton
						text="delete result"
						onClick={handleOpen}
						color="error"
					/>
				</Box>
				<TestResultsGrid />
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>add test result</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Value"
							type="number"
							fullWidth
							name="value"
							value={form?.value}
							onChange={handleChange}
						/>
						<TextField
							margin="dense"
							label="Date"
							type="date"
							fullWidth
							name="date"
							value={form?.date}
							onChange={handleChange}
						/>
						<TextField
							margin="dense"
							label="Author"
							type="text"
							fullWidth
							name="author"
							value={form?.author}
							onChange={handleChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="secondary">
							Anuluj
						</Button>
						<Button
							onClick={() => handleAddResult(form!)}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</Layout>
	)
}

export default TestResults
