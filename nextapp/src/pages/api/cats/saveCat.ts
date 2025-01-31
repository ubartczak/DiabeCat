import Cat from "@/models/Cat"
import dbConnect from "@/utils/dbConnect"
import type { NextApiResponse } from "next"
import withAuthHandler, { AuthenticatedRequest } from "@/utils/withAuthHandler"
import { v4 as uuidv4 } from "uuid"

const saveCat = async (req: AuthenticatedRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const {
		catId,
		name,
		birthDate,
		gender,
		castrated,
		breed,
		allergies,
		tattooNumber,
		microchipNumber,
		fur,
		specialSigns,
		email,
	} = req.body

	if (
		!name ||
		!birthDate ||
		!gender ||
		castrated === undefined ||
		!breed ||
		!email
	) {
		console.error("Missing required fields")
		return res.status(400).json({ message: "Missing required fields" })
	}

	try {
		await dbConnect()

		let existingCat = null
		if (catId) {
			existingCat = await Cat.findOne({ email, catId })
		}

		if (existingCat) {
			const updatedCat = await Cat.findOneAndUpdate(
				{ email, catId },
				{
					$set: {
						name,
						birthDate,
						gender,
						castrated,
						breed,
						allergies,
						tattooNumber,
						microchipNumber,
						fur,
						specialSigns,
					},
				},
				{ new: true },
			)

			return res
				.status(200)
				.json({ message: "Cat updated successfully", cat: updatedCat })
		} else {
			const newCat = new Cat({
				catId: uuidv4().slice(0, 5),
				name,
				birthDate,
				gender,
				castrated,
				breed,
				allergies,
				tattooNumber,
				microchipNumber,
				fur,
				specialSigns,
				email,
			})

			await newCat.save()

			return res
				.status(201)
				.json({ message: "Cat added successfully", cat: newCat })
		}
	} catch (error) {
		console.error("MongoDB Error:", error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default withAuthHandler(saveCat, ["POST"])
