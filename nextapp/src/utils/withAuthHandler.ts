import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

export interface AuthenticatedRequest extends NextApiRequest {
	user?: { userId: string; email: string }
}

type HandlerFunction = (
	req: AuthenticatedRequest,
	res: NextApiResponse,
) => Promise<void>

/**
 * Middleware do obsługi autoryzacji dla API.
 * @param handler Funkcja obsługująca żądanie.
 * @param allowedMethods Lista dozwolonych metod HTTP (opcjonalnie).
 */
const withAuthHandler = (
	handler: HandlerFunction,
	allowedMethods: string[] = ["GET", "POST", "PUT", "DELETE"],
) => {
	return async (req: AuthenticatedRequest, res: NextApiResponse) => {
		if (!allowedMethods.includes(req.method || "")) {
			return res.status(405).json({ message: "Method not allowed" })
		}

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
			await handler(req, res)
		} catch (error) {
			return res.status(401).json({ message: "Invalid token" })
		}
	}
}

export default withAuthHandler
