import Layout from "@/components/navigation/Layout"
import {
	Box,
	MenuItem,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material"
import { CustomTextField } from "@/components/inputs/CustomTextField"
import { useState, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/router"

const Cats = () => {
	type CatForm = {
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
		email: string
		[key: string]: string
	}

	const [form, setForm] = useState<CatForm>({
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
		email: "",
	})

	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
	const [isNewCat, setIsNewCat] = useState(true)

	const labelStyle = {
		fontSize: "14px",
		lineHeight: "30px",
		color: "#303030",
	}

	const router = useRouter()
	const [token, setToken] = useState<string | null>(null)
	const [email, setEmail] = useState<string | null>(null)

	useEffect(() => {
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
								if (cat.hasOwnProperty(key)) {
									acc[key] = cat[key] || ""
								}
								return acc
							},
							{} as CatForm,
						)

						// if (cat.castrated) {
						// 	updatedForm.castrated =
						// 		cat.castrated === true ? "tak" : "nie"
						// }

						setForm(updatedForm)
					}
				} catch (error) {
					console.error("🚨 Błąd pobierania kota:", error)
				}
			}

			fetchCatData()
		} catch (error) {
			console.error("❌ Błąd dekodowania tokena:", error)
			router.push("/login")
		}
	}, [router])

	if (!token) return <p>Ładowanie...</p>

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
		try {
			const response = await axios.put("/api/cats/addCat", form, {
				headers: { Authorization: `Bearer ${token}` },
			})
		} catch (error) {
			console.error("🚨 Błąd podczas zapisu:", error)
		}
		setOpenConfirmDialog(false)
	}

	return (
		<>
			<Layout>
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
						<Button
							variant="contained"
							color="primary"
							onClick={() => setOpenConfirmDialog(true)}
						>
							{isNewCat ? "Dodaj kota" : "Zapisz zmiany"}
						</Button>
					</Box>
				</Box>
			</Layout>
			<Dialog
				open={openConfirmDialog}
				onClose={() => setOpenConfirmDialog(false)}
			>
				<DialogTitle>Potwierdzenie</DialogTitle>
				<DialogContent>
					<p>
						Czy na pewno chcesz{" "}
						{isNewCat ? "dodać" : "zmodyfikować"} dane kota?
					</p>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setOpenConfirmDialog(false)}
						color="secondary"
					>
						Anuluj
					</Button>
					<Button onClick={handleSaveCat} color="primary">
						{isNewCat ? "Dodaj" : "Zapisz"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default Cats
