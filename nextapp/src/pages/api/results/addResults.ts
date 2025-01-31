import UserTestResults from "@/models/TestResult"
import dbConnect from "@/utils/dbConnect"
import type { NextApiResponse } from "next"
import withAuthHandler, { AuthenticatedRequest } from "@/utils/withAuthHandler"

const addResult = async (req: AuthenticatedRequest, res: NextApiResponse) => {
	const { id, value, date } = req.body
	const email = req.user?.email

	if (!email) {
		return res.status(401).json({ message: "Unauthorized" })
	}

	try {
		await dbConnect()
		let userTestResults = await UserTestResults.findOne({ email })

		if (!userTestResults) {
			userTestResults = new UserTestResults({ email, results: [] })
		}

		userTestResults.results.push({ id, value, date })
		await userTestResults.save()

		return res.status(201).json({ message: "Test result added" })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default withAuthHandler(addResult, ["POST"])
