import React, { useEffect, useMemo, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-theme-quartz.css"
import {
	AllCommunityModule,
	ColDef,
	ModuleRegistry,
	RowSelectionOptions,
	themeQuartz,
} from "ag-grid-community"
import "./TestResultsGrid.css"
import { SnackbarAlert } from "../feedback/SnackbarAlert"

ModuleRegistry.registerModules([AllCommunityModule])

const TestResultsGrid = () => {
	const [rowData, setRowData] = useState<any[]>([])
	const [openSnackbar, setOpenSnackbar] = useState(false)

	const columns: ColDef[] = useMemo(
		() => [
			{ headerName: "id", field: "id" },
			{
				headerName: "date",
				field: "date",
				valueFormatter: (params) =>
					new Date(params.value).toLocaleDateString("pl-PL"),
			},
			{
				headerName: "value",
				field: "value",
			},
		],
		[],
	)

	const rowSelection: RowSelectionOptions = useMemo(() => {
		return {
			mode: "multiRow",
			checkboxes: true,
			headerCheckbox: true,
			enableClickSelection: true,
		}
	}, [])

	const myTheme = themeQuartz.withParams({
		fontFamily: "ubuntu",
		headerFontFamily: "ubuntu",
		cellFontFamily: "ubuntu",
		textColor: "#303030",
	})

	const fetchData = async () => {
		try {
			const token = localStorage.getItem("token")
			if (!token) {
				setOpenSnackbar(true)
			}

			const response = await fetch("/api/results/getAllResults", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				console.error("Failed to fetch data")
				return
			}

			const data = await response.json()

			if (!Array.isArray(data)) {
				console.error("Invalid data format", data)
				return
			}

			setRowData(data)
		} catch (error) {
			console.error("Error fetching data: ", error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div style={{ height: 400, width: "100%" }}>
			<SnackbarAlert
				open={openSnackbar}
				message="Brak autoryzacji"
				severity="error"
			/>
			<AgGridReact
				columnDefs={columns}
				rowData={rowData}
				pagination={true}
				theme={myTheme}
				rowSelection={rowSelection}
			/>
		</div>
	)
}

export default TestResultsGrid
