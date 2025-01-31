import Layout from "@/components/navigation/Layout"
import { useState } from "react"

const Calendar = () => {
	const [loading, setLoading] = useState(true)
	return (
		<>
			<Layout loading={loading}>
				<h1>Calendar</h1>
			</Layout>
		</>
	)
}

export default Calendar
