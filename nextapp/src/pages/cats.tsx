import Layout from "@/components/navigation/Layout"
import {
	Box,
	MenuItem,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	CircularProgress,
} from "@mui/material"
import { CustomTextField } from "@/components/inputs/CustomTextField"
import { useState, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/router"
import { SnackbarAlert } from "@/components/feedback/SnackbarAlert"
import { MyButton } from "@/components/inputs/CustomButton"

// TO DO - Deaktywuj - dodać obsługę

const Cats = () => {
	type CatForm = {
		email: string
		catId: string
		name: string
		birthDate: string
		gender: string
		castrated: string
		breed: string
		allergies: string
		tattooNumber: string
		microchipNumber: string
		fur: string
		specialSigns: string
		[key: string]: string
	}

	const router = useRouter()
	const [token, setToken] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [, setEmail] = useState<string | null>(null)

	const [snackbar, setSnackbar] = useState<{
		open: boolean
		message: string
		severity: "success" | "error" | "warning" | "info"
	}>({
		open: false,
		message: "",
		severity: "info",
	})

	const [form, setForm] = useState<CatForm>({
		email: "",
		catId: "",
		name: "",
		birthDate: "",
		gender: "",
		castrated: "",
		breed: "",
		allergies: "",
		tattooNumber: "",
		microchipNumber: "",
		fur: "",
		specialSigns: "",
	})

	const labelStyle = {
		color: "#303030",
		fontSize: "14px",
		lineHeight: "30px",
	}

	useEffect(() => {
		setLoading(true)
		const storedToken = localStorage.getItem("token")

		if (!storedToken) {
			router.push("/login")
			return
		}

		try {
			setToken(storedToken)
			const decoded: any = jwtDecode(storedToken)

			if (!decoded.email) return

			setEmail(decoded.email)

			setForm((prevForm) => ({
				...prevForm,
				email: decoded.email,
			}))

			const fetchCatData = async () => {
				try {
					const response = await axios.get(`/api/cats/getCats`, {
						headers: { Authorization: `Bearer ${storedToken}` },
					})

					if (response.data) {
						//TO DO - obsługa kilku kotów jednego właściciela
						const cat = response.data

						const updatedForm = Object.keys(form).reduce(
							(acc, key) => {
								acc[key] =
									key === "birthDate" && cat[key]
										? cat[key].split("T")[0]
										: cat[key] || ""
								return acc
							},
							{} as CatForm,
						)

						setForm(updatedForm)
						setLoading(false)
					}
				} catch (error) {
					console.error("Błąd pobierania danych:", error)
					showSnackbar(
						"wystąpił błąd podczas pobierania danych",
						"error",
					)
					setLoading(false)
				}
			}

			fetchCatData()
		} catch (error) {
			console.error("Błąd dekodowania tokena:", error)
			showSnackbar("błąd dekodowania tokena", "error")
			router.push("/login")
		}
	}, [router])

	const handleChange = <T extends keyof CatForm>(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target

		setForm((prevForm) => ({
			...prevForm,
			[name as T]: value,
		}))
	}

	const handleSaveCat = async () => {
		const emptyFields = Object.keys(form).filter((key) => !form[key].trim())

		if (emptyFields.length > 0) {
			showSnackbar("uzupełnij wszystkie pola", "error")
			return
		}

		try {
			await axios.post("/api/cats/saveCat", form, {
				headers: { Authorization: `Bearer ${token}` },
			})
			showSnackbar("zapisano pomyślnie", "success")
		} catch (error) {
			showSnackbar("wystąpił błąd podczas zapisu", "error")
		} finally {
			setLoading(false)
		}
	}

	const showSnackbar = (
		message: string,
		severity: "success" | "error" | "warning" | "info",
	) => {
		setSnackbar({ open: true, message, severity })
	}

	return (
		<>
			<Layout loading={loading}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						textAlign: "center",
					}}
				>
					<h1
						style={{
							textAlign: "center",
							margin: "0 0 8px 0",
							color: "#303030",
						}}
					>
						dane kota
					</h1>
					<SnackbarAlert
						open={snackbar.open}
						handleClose={() =>
							setSnackbar((prev) => ({ ...prev, open: false }))
						}
						message={snackbar.message}
						severity={snackbar.severity}
					/>
					<Box
						style={{
							display: "flex",
							gap: "8px",
							paddingBottom: "8px",
						}}
					>
						<MyButton
							text="zapisz"
							onClick={handleSaveCat}
							color="success"
						/>
						<MyButton
							text="deaktywuj"
							onClick={() => console.log("dezaktywuj")}
							color="error"
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "stretch",
							padding: 2,
							gap: 2,
						}}
					>
						<Box
							width={"30%"}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							sx={{ backgroundColor: "#f0f0f0" }}
						>
							<img
								src="/images/cat2.jpg"
								alt="cat"
								style={{
									maxHeight: "400px",
									maxWidth: "100%",
									objectFit: "contain",
								}}
							/>
						</Box>
						<Box
							sx={{
								width: "100%",
								maxWidth: "600px",
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								gap: "10px 30px",
								color: "white",
							}}
						>
							{[
								{ label: "Imię", id: "name" },
								{
									label: "Data urodzenia",
									id: "birthDate",
									type: "date",
								},
								{ label: "Rasa", id: "breed" },
								{ label: "Alergie", id: "allergies" },
								{ label: "Numer tatuażu", id: "tattooNumber" },
								{
									label: "Numer mikrochipu",
									id: "microchipNumber",
								},
								{
									label: "Umaszczenie / sierść",
									id: "fur",
									multiline: true,
									rows: 2,
								},
								{
									label: "Znaki szczególne",
									id: "specialSigns",
									multiline: true,
									rows: 2,
								},
							].map(({ label, id, type, multiline, rows }) => (
								<Box sx={{ width: "45%" }} key={id}>
									<label htmlFor={id} style={labelStyle}>
										{label}
									</label>
									<CustomTextField
										id={id}
										name={id}
										value={form[id as keyof CatForm]}
										type={type || "text"}
										onChange={handleChange}
										padding="0 10px"
										multiline={multiline}
										rows={rows}
									/>
								</Box>
							))}
							<Box sx={{ width: "45%" }}>
								<label htmlFor="gender" style={labelStyle}>
									Płeć
								</label>
								<CustomTextField
									id="gender"
									name="gender"
									select
									value={form.gender}
									onChange={handleChange}
									padding="0 10px"
								>
									<MenuItem value="male">Samiec</MenuItem>
									<MenuItem value="female">Samica</MenuItem>
								</CustomTextField>
							</Box>
							<Box sx={{ width: "45%" }}>
								<label htmlFor="castrated" style={labelStyle}>
									Kastracja
								</label>
								<CustomTextField
									id="castrated"
									name="castrated"
									select
									value={form.castrated}
									onChange={handleChange}
									padding="0 10px"
								>
									<MenuItem value="tak">Tak</MenuItem>
									<MenuItem value="nie">Nie</MenuItem>
								</CustomTextField>
							</Box>
						</Box>
					</Box>
				</div>
			</Layout>
		</>
	)
}

export default Cats
