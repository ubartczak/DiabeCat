import { Line } from "react-chartjs-2"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from "chart.js"
import { ITestResult } from "@/models/TestResult"

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
)

interface ChartProps {
	data: Partial<ITestResult[]>
}

const Chart = ({ data }: ChartProps) => {
	const chartData = {
		labels: data.map((item) => new Date(item!.date).toLocaleDateString()),
		datasets: [
			{
				label: "Values",
				data: data.map((item) => item!.value),
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				fill: true,
				tension: 0.4,
			},
		],
	}

	const options: ChartOptions<"line"> = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Results chart",
			},
		},
	}

	return (
		<>
			<div style={{ width: "80%", height: "400px", margin: "auto" }}>
				<Line data={chartData} options={options} />
			</div>
		</>
	)
}

export default Chart
