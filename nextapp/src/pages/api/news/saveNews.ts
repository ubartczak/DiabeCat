import News from "@/models/News"
import dbConnect from "@/utils/dbConnect"
import { NextApiRequest, NextApiResponse } from "next"

const saveNews = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { title, subheader, shortVersion, content, imgSrc } = req.body

	if (!title || !subheader || !shortVersion || !content || !imgSrc) {
		console.error("Missing required fields")
		return res.status(400).json({ message: "Missing required fields" })
	}

	try {
		await dbConnect()

		const newNews = new News({
			title,
			subheader,
			shortVersion,
			content,
			imgSrc,
		})

		await newNews.save()

		return res.status(201).json({ message: "News created" })
	} catch (error) {
		console.error("MongoDB Error:", error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default saveNews
