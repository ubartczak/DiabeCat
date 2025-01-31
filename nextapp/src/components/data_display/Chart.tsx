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
				borderColor: "#618833",
				backgroundColor: "#a2cf6e",
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
				labels: {
					font: {
						size: 14,
					},
					color: "#303030",
				},
			},
			title: {
				display: true,
				text: "Test Results Chart",
				font: {
					size: 18,
					weight: "bold",
				},
				color: "#303030",
				padding: {
					top: 20,
					bottom: 30,
				},
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Date",
					font: {
						size: 14,
						weight: "bold",
					},
					color: "#303030",
				},
			},
			y: {
				title: {
					display: true,
					text: "Value",
					font: {
						size: 14,
						weight: "bold",
					},
					color: "#303030",
				},
				beginAtZero: true,
			},
		},
	}

	return (
		<div style={{ width: "80%", height: "400px", margin: "auto" }}>
			<Line data={chartData} options={options} />
		</div>
	)
}

export default Chart
