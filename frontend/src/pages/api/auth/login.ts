// backend/pages/api/auth/login.ts

import type { NextApiRequest, NextApiResponse } from "next"
import User from "../../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "../../utils/dbConnect"

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { email, password } = req.body

	try {
		await dbConnect()

		// Sprawdź, czy użytkownik istnieje
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" })
		}

		// Porównaj hasło
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid credentials" })
		}

		// Utwórz JWT
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
			expiresIn: "1h",
		})

		return res.status(200).json({ token })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default login
