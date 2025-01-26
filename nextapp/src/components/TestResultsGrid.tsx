import React, { useEffect, useMemo, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-theme-quartz.css"
import {
	AllCommunityModule,
	ColDef,
	GridOptions,
	ModuleRegistry,
	RowSelectionOptions,
	themeQuartz,
} from "ag-grid-community"
import { ITestResult } from "@/models/TestResult"
import "./TestResultsGrid.css"

ModuleRegistry.registerModules([AllCommunityModule])

const TestResultsGrid = () => {
	const [rowData, setRowData] = useState<ITestResult[]>([])

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
			{ headerName: "author", field: "author" },
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
		<div style={{ height: 400, width: "100%" }}>
			<AgGridReact
				columnDefs={columns}
				rowData={rowData}
				pagination={true}
				theme={myTheme}
				rowSelection={rowSelection}
				// onSelectionChanged={handleSelectionChanged}
			/>
		</div>
	)
}

export default TestResultsGrid
