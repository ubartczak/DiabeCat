import User from "@/models/User"
import dbConnect from "@/utils/dbConnect"
import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"

const register = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { firstName, lastName, email, password } = req.body

	try {
		await dbConnect()

		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" })
		}

		const hashedPassword = await bcrypt.hash(password, 12)

		const user = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		})
		await user.save()

		return res.status(201).json({ message: "User created" })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default register
