import type { NextApiResponse } from "next"
import { File } from "formidable"
import { v2 as cloudinary } from "cloudinary"
import { IncomingForm } from "formidable"

import withAuthHandler, { AuthenticatedRequest } from "@/utils/withAuthHandler"
import Image from "@/models/Image"

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const config = {
	api: {
		bodyParser: false, // Wyłącz domyślny parser, bo używamy `formidable`
	},
}

const uploadImageUrl = async (
	req: AuthenticatedRequest,
	res: NextApiResponse,
) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const form = new IncomingForm()

	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error("Error parsing form:", err)
			return res.status(500).json({ error: err.message })
		}

		const file = files.file as File | File[] | undefined
		if (!file) {
			console.error("No file uploaded")
			return res.status(400).json({ error: "No file uploaded" })
		}

		const uploadedFile = Array.isArray(file) ? file[0] : file

		try {
			const result = await cloudinary.uploader.upload(
				uploadedFile.filepath,
				{
					folder: "uploads",
				},
			)

			const image = new Image({
				imageUrl: result.secure_url,
				userId: req.user?.userId,
			})

			await image.save()

			console.log("Upload successful & saved to DB:", image)
			return res.status(200).json({ url: result.secure_url })
		} catch (uploadError) {
			console.error("Upload failed:", uploadError)
			return res.status(500).json({ error: "Upload failed" })
		}
	})
}

export default withAuthHandler(uploadImageUrl, ["POST"])
