import React, { useMemo } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community"

interface RowData {
	id: number
	name: string
	value: number
}

ModuleRegistry.registerModules([AllCommunityModule])

const TestResultsGrid = () => {
	const columns: ColDef[] = useMemo(
		() => [
			{ headerName: "ID", field: "id" },
			{ headerName: "Nazwa", field: "name" },
			{ headerName: "Wartość", field: "value" },
		],
		[],
	)

	const rowData: RowData[] = [
		{ id: 1, name: "Wykres 1", value: 120 },
		{ id: 2, name: "Wykres 2", value: 250 },
		{ id: 3, name: "Wykres 3", value: 90 },
		{ id: 4, name: "Wykres 4", value: 150 },
	]

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
			<AgGridReact
				// modules={[ClientSideRowModelModule]}
				columnDefs={columns}
				rowData={rowData}
				pagination={true}
			/>
		</div>
	)
}

export default TestResultsGrid
