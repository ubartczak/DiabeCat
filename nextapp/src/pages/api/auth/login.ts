import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/utils/dbConnect"
import User from "@/models/User"

const login = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	const { email, password } = req.body

	try {
		await dbConnect()

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({ error: "User does not exist" })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid email or password" })
		}

		// TO DO access token a refresh token??
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			process.env.JWT_SECRET!,
			{ expiresIn: "1h" },
		)

		return res.status(200).json({ token })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: "Server error" })
	}
}

export default login
