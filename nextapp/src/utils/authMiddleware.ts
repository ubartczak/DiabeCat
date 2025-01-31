import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

export interface AuthenticatedRequest extends NextApiRequest {
	user?: { userId: string; email: string }
}

const authMiddleware = (handler: any) => {
	;async (req: AuthenticatedRequest, res: NextApiResponse) => {
		const token = req.headers.authorization?.split(" ")[1]

		if (!token) {
			return res.status(401).json({ message: "No token provided" })
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
				userId: string
				email: string
			}
			req.user = decoded
			return handler(req, res)
		} catch (error) {
			return res.status(401).json({ message: "Invalid token" })
		}
	}
}

export default authMiddleware
