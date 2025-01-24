import TestResult from "@/models/TestResult"
import dbConnect from "@/utils/dbConnect"
import type { NextApiRequest, NextApiResponse } from "next"

const addResult = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { id, value, date, author } = req.body

	try {
		await dbConnect()

		const existingResult = await TestResult.findOne({ id })
		if (existingResult) {
			return res.status(400).json({ message: "Result already exists" })
		}

		const testResult = new TestResult({
			id,
			value,
			date,
			author,
		})
		await testResult.save()

		return res.status(201).json({ message: "Test result added" })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default addResult
