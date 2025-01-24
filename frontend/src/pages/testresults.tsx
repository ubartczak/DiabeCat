import Layout from "@/components/Layout"
import TestResultsGrid from "@/components/TestResultsGrid"
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material"
import { useState } from "react"

const TestResults = () => {
	const [error, setError] = useState("")
	const [open, setOpen] = useState(false) // Kontrola otwierania modala
	const [form, setForm] = useState({ value: "", date: "" }) // Stan formularza

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleAddResult = async () => {
		const response = await fetch("/api/results/addResults", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: 1,
				value: 50,
				date: "2022-01-01",
				author: "John Doe",
			}),
		})

		if (response.ok) {
			alert("Added successfully")
		} else {
			const data = await response.json()
			setError(data.message)
		}
	}
	return (
		<Layout>
			<div>
				<h1>Test Results</h1>
				<Button
					variant="contained"
					color="primary"
					onClick={handleOpen}
				>
					Dodaj wynik
				</Button>
				<TestResultsGrid />
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Dodaj wynik</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Wartość"
							type="number"
							fullWidth
							name="value"
							value={form.value}
							onChange={handleChange}
						/>
						<TextField
							margin="dense"
							label="Data"
							type="date"
							fullWidth
							name="date"
							value={form.date}
							onChange={handleChange}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="secondary">
							Anuluj
						</Button>
						<Button onClick={handleAddResult} color="primary">
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</Layout>
	)
}

export default TestResults
