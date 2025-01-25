import Layout from "@/components/Layout"
import { SnackbarAlert } from "@/components/SnackbarAlert"
import TestResultsGrid from "@/components/TestResultsGrid"
import { ITestResult } from "@/models/TestResult"
import {
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
	return (
		<Layout>
			<div>
				<h1>Test Results</h1>
				<SnackbarAlert
					open={openSB}
					handleClose={handleCloseSB}
					message="Test result added"
					severity="success"
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleOpen}
				>
					Dodaj wynik
				</Button>
				<TestResultsGrid />
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Add test result</DialogTitle>
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
