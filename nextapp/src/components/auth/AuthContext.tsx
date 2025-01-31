import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

interface AuthContextType {
	token: string | null
	email: string | null
}

const AuthContext = createContext<AuthContextType>({ token: null, email: null })

// nigdzie nie używane, przemyśleć

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(null)
	const [email, setEmail] = useState<string | null>(null)

	useEffect(() => {
		const storedToken = localStorage.getItem("token")
		if (storedToken) {
			try {
				setToken(storedToken)
				const decoded: any = jwtDecode(storedToken)
				setEmail(decoded.email)
			} catch (error) {
				console.error("Błąd dekodowania tokena:", error)
			}
		}
	}, [])

	return (
		<AuthContext.Provider value={{ token, email }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
