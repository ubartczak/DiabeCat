import Layout from "@/components/Layout"
import { ITestResult } from "@/models/TestResult"
import { useEffect, useState } from "react"
import Chart from "@/components/Chart"

const TestChart = () => {
	const [data, setData] = useState<Partial<ITestResult[]>>()

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/results/getAllResults")
			const result: Partial<ITestResult[]> = await res.json()
			setData(result)
		}
		fetchData()
	}, [])

	return (
		<>
			<Layout>
				<div>
					<h1>Test chart</h1>
					<Chart data={data ?? []} />
				</div>
			</Layout>
		</>
	)
}

export default TestChart
