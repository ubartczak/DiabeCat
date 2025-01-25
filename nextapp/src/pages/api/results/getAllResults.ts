import TestResult from "@/models/TestResult"
import dbConnect from "@/utils/dbConnect"
import type { NextApiRequest, NextApiResponse } from "next"

const getAllResults = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	try {
		await dbConnect()

		const results = await TestResult.find()

		if (!results || results.length === 0) {
			return res.status(404).json({ message: "No results found" })
		}

		return res.status(200).json(results)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default getAllResults
