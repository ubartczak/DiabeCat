import dbConnect from "@/utils/dbConnect"
import type { NextApiResponse } from "next"
import withAuthHandler, { AuthenticatedRequest } from "@/utils/withAuthHandler"
import Cat from "@/models/Cat"

const getCats = async (req: AuthenticatedRequest, res: NextApiResponse) => {
	const email = req.user?.email

	if (!email) {
		return res.status(401).json({ message: "Unauthorized" })
	}

	try {
		await dbConnect()
		const cats = await Cat.findOne({ email })

		if (!cats) {
			return res.status(200).json([])
		}
		return res.status(200).json(cats)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default withAuthHandler(getCats, ["GET"])
