import UserTestResults from "@/models/TestResult"
import dbConnect from "@/utils/dbConnect"
import type { NextApiResponse } from "next"
import withAuthHandler, { AuthenticatedRequest } from "@/utils/withAuthHandler"

const getAllResults = async (
	req: AuthenticatedRequest,
	res: NextApiResponse,
) => {
	const email = req.user?.email

	if (!email) {
		return res.status(401).json({ message: "Unauthorized" })
	}

	try {
		await dbConnect()
		const userResults = await UserTestResults.findOne({ email })

		if (!userResults || userResults.results.length === 0) {
			return res.status(404).json({ message: "No results found" })
		}
		return res.status(200).json(userResults.results)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default withAuthHandler(getAllResults, ["GET"])
