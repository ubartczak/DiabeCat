import Layout from "@/components/navigation/Layout"
import { ITestResult } from "@/models/TestResult"
import { useEffect, useState } from "react"
import Chart from "@/components/data_display/Chart"
import { SnackbarAlert } from "@/components/feedback/SnackbarAlert"
import { useRouter } from "next/router"

const TestChart = () => {
	const [data, setData] = useState<ITestResult[]>([])
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	// TO DO ujednolicić loadingi i obsługe błędów jak na innych komopnentach

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			const token = localStorage.getItem("token")

			if (!token) {
				setOpenSnackbar(true)
				setTimeout(() => {
					router.push("/login")
				}, 3000)
			}

			const res = await fetch("/api/results/getAllResults", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})

			if (!res.ok) {
				console.error("Failed to fetch data", res.status)
				return
			}

			const result: ITestResult[] = await res.json()
			setData(result)
			setLoading(false)
		}

		fetchData()
	}, [])

	return (
		<Layout loading={loading}>
			<SnackbarAlert
				open={openSnackbar}
				message="Brak autoryzacji"
				severity="error"
			/>
			<div>
				<h1>Test chart</h1>
				<Chart data={data} />
			</div>
		</Layout>
	)
}

export default TestChart
