import Image from "@/models/Image"
import dbConnect from "@/utils/dbConnect"
import { NextApiRequest, NextApiResponse } from "next"

const saveImageUrl = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { imageUrl, userId } = req.body

	if (!imageUrl || !userId) {
		return res.status(400).json({ message: "Missing required fields" })
	}

	try {
		await dbConnect()

		const newImageUrl = new Image({
			imageUrl,
			userId,
		})

		await newImageUrl.save()

		return res.status(201).json({ message: "Url saved" })
	} catch (error) {
		console.error("MongoDB Error:", error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default saveImageUrl
