import News from "@/models/News"
import dbConnect from "@/utils/dbConnect"
import { NextApiRequest, NextApiResponse } from "next"

const getNews = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect()
		const news = await News.find()

		if (!news) {
			return res.status(200).json([])
		}
		return res.status(200).json(news)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default getNews
