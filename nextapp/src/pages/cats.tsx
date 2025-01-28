import Layout from "@/components/Layout"
import { Box } from "@mui/material"
import "../components/Components.css"
import { CustomTextField } from "@/components/CustomTextField"

const Cats = () => {
	const labelStyle = {
		fontSize: "14px",
		lineHeight: "30px",
		color: "#303030",
	}

	return (
		<>
			<Layout>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "stretch",
						padding: 2,
						gap: 2,
						height: "auto",
					}}
				>
					<Box
						width={"30%"}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						sx={{
							height: "100%",
							backgroundColor: "#f0f0f0",
						}}
					>
						<img
							src="/images/cat2.jpg"
							alt="cat"
							style={{
								maxHeight: "100%",
								maxWidth: "100%",
								objectFit: "contain",
							}}
						/>
					</Box>
					<Box
						sx={{
							width: "100%",
							height: "auto",
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
							gap: "10px 30px",
							color: "white",
						}}
					>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="catName" style={labelStyle}>
								Imię
							</label>
							<CustomTextField id="catName" />
						</Box>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="birthDate" style={labelStyle}>
								Data urodzenia
							</label>
							<CustomTextField id="birthDate" type="date" />
						</Box>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="sex" style={labelStyle}>
								Płeć
							</label>
							<CustomTextField id="sex" select />
						</Box>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="castrated" style={labelStyle}>
								Kastracja
							</label>
							<CustomTextField id="castrated" />
						</Box>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="breed" style={labelStyle}>
								Rasa
							</label>
							<CustomTextField id="breed" />
						</Box>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="allergies" style={labelStyle}>
								Alergie
							</label>
							<CustomTextField id="allergies" />
						</Box>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="tattooNumber" style={labelStyle}>
								Numer tatuażu
							</label>
							<CustomTextField id="tattooNumber" />
						</Box>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="microchipNumber" style={labelStyle}>
								Numer mikrochipu
							</label>
							<CustomTextField id="microchipNumber" />
						</Box>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="fur" style={labelStyle}>
								Umaszczenie / sierść
							</label>
							<CustomTextField id="fur" multiline rows={2} />
						</Box>
						<Box sx={{ width: "45%" }}>
							<label htmlFor="specialSigns" style={labelStyle}>
								Znaki szczególne
							</label>
							<CustomTextField
								id="specialSigns"
								multiline
								rows={2}
							/>
						</Box>
					</Box>
				</Box>
			</Layout>
		</>
	)
}

export default Cats
