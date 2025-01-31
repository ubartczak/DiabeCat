import Cat from "@/models/Cat"
import dbConnect from "@/utils/dbConnect"
import type { NextApiResponse } from "next"
import withAuthHandler, { AuthenticatedRequest } from "@/utils/withAuthHandler"
import { v4 as uuidv4 } from "uuid"

const addCat = async (req: AuthenticatedRequest, res: NextApiResponse) => {
	if (req.method !== "PUT") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const {
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

	// TO DO - uzupełnić walidacje - backend + komunikaty na froncie
	// TO DO - obsługa błędów
	if (!name || !birthDate || !gender || !castrated || !breed || !email) {
		return res.status(400).json({ message: "Missing required fields" })
	}

	try {
		await dbConnect()
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
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default withAuthHandler(addCat, ["PUT"])
