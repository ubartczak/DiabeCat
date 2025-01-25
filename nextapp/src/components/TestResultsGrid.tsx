import React, { useEffect, useMemo, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community"
import { ITestResult } from "@/models/TestResult"

ModuleRegistry.registerModules([AllCommunityModule])

const TestResultsGrid = () => {
	const [rowData, setRowData] = useState<ITestResult[]>([])

	const columns: ColDef[] = useMemo(
		() => [
			{ headerName: "ID", field: "id" },
			{ headerName: "Date", field: "date" },
			{ headerName: "Value", field: "value" },
			{ headerName: "Author", field: "author" },
		],
		[],
	)

	const fetchData = async () => {
		try {
			const response = await fetch("/api/results/getAllResults")
			if (response.ok) {
				const data = await response.json()
				setRowData(data)
			} else {
				console.error("Failed to fetch data")
			}
		} catch (error) {
			console.error("Error fetching data: ", error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
			<AgGridReact
				columnDefs={columns}
				rowData={rowData}
				pagination={true}
			/>
		</div>
	)
}

export default TestResultsGrid
