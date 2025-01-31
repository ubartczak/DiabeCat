import Layout from "@/components/navigation/Layout"
import { useState } from "react"

// TO DO czy ta strona potrzebna?

const Dashboard = () => {
	const [loading, setLoading] = useState(false)

	return (
		<div>
			<Layout loading={loading}>
				<div>
					<h1>Witaj na stronie głównej</h1>
					<p>Wybierz jedną z opcji w górnym menu.</p>
				</div>
			</Layout>
		</div>
	)
}

export default Dashboard
