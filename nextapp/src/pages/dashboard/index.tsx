import Layout from "@/components/navigation/Layout"
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Collapse,
	IconButton,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState, useEffect } from "react"
import axios from "axios"
import { MyButton } from "@/components/inputs/CustomButton"
import { CustomTextField } from "@/components/inputs/CustomTextField"
import UploadForm from "@/components/images/UploadForm"

interface News {
	_id: string
	title: string
	subheader: string
	shortVersion: string
	content: string
	imgSrc: string
}

const Dashboard = () => {
	const [loading, setLoading] = useState(false)
	const [newsList, setNewsList] = useState<News[]>([])
	const [expanded, setExpanded] = useState<string | null>(null)
	const [newNews, setNewNews] = useState({
		title: "",
		subheader: "",
		shortVersion: "",
		content: "",
		imgSrc: "",
	})

	const handleImageUpload = (url: string) => {
		setNewNews((prev) => ({ ...prev, imgSrc: url }))
	}

	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		fetchNews()
	}, [])

	const fetchNews = async () => {
		setLoading(true)
		const response = await axios.get("/api/news/getNews")
		setNewsList(response.data)
		setLoading(false)
	}

	const handleExpandClick = (id: string) => {
		setExpanded(expanded === id ? null : id)
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setNewNews({ ...newNews, [e.target.name]: e.target.value })
	}

	const handleAddNews = async () => {
		if (!newNews.imgSrc) {
			alert("Dodaj zdjęcie przed zapisaniem newsa!")
			return
		}

		const response = await axios.post("/api/news/saveNews", newNews)

		if (response.status === 201) {
			setNewNews({
				title: "",
				subheader: "",
				shortVersion: "",
				content: "",
				imgSrc: "",
			})
			fetchNews()
			handleClose()
		}
	}

	const labelStyle = {
		fontSize: "14px",
		lineHeight: "30px",
		color: "#303030",
	}

	return (
		<Layout loading={loading}>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<h2>Aktualności</h2>
				<MyButton
					text="dodaj news"
					onClick={handleClickOpen}
					margin="20px"
				/>
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"dodaj newsa"}
				</DialogTitle>
				<DialogContent>
					<UploadForm onUploadSuccess={handleImageUpload} />
					<form noValidate>
						<Box sx={{ width: "100%" }}>
							<label htmlFor="title" style={labelStyle}>
								tytuł
							</label>
							<CustomTextField
								id="title"
								name="title"
								value={newNews.title}
								onChange={handleInputChange}
							/>
						</Box>
						<Box sx={{ width: "100%" }}>
							<label htmlFor="subheader" style={labelStyle}>
								podtytuł
							</label>
							<CustomTextField
								id="subheader"
								name="subheader"
								value={newNews.subheader}
								onChange={handleInputChange}
							/>
						</Box>
						<Box sx={{ width: "100%" }}>
							<label htmlFor="shortVersion" style={labelStyle}>
								streszczenie
							</label>
							<CustomTextField
								id="shortVersion"
								name="shortVersion"
								value={newNews.shortVersion}
								onChange={handleInputChange}
							/>
						</Box>
						<Box sx={{ width: "100%" }}>
							<label htmlFor="content" style={labelStyle}>
								treść
							</label>
							<CustomTextField
								id="content"
								name="content"
								value={newNews.content}
								onChange={handleInputChange}
								rows={4}
							/>
						</Box>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddNews} autoFocus>
						dodaj
					</Button>
					<Button onClick={handleClose}>anuluj</Button>
				</DialogActions>
			</Dialog>
			<Box>
				<h4>
					Witaj na stronie głównej. Sprawdź nasze aktualności lub
					wybierz opcję z górnego menu.
				</h4>
			</Box>

			<Box>
				{newsList.map((news) => (
					<Card key={news._id} sx={{ my: 2 }}>
						<CardHeader
							title={news.title}
							subheader={news.subheader}
						/>
						{news.imgSrc && (
							<CardMedia
								component="img"
								height="140"
								image={news.imgSrc}
								alt="news image"
							/>
						)}
						<CardContent>
							<Typography variant="body2" color="text.secondary">
								{news.shortVersion}
							</Typography>
						</CardContent>
						<CardActions>
							<IconButton
								onClick={() => handleExpandClick(news._id)}
								aria-expanded={expanded === news._id}
							>
								<ExpandMoreIcon />
							</IconButton>
						</CardActions>
						<Collapse
							in={expanded === news._id}
							timeout="auto"
							unmountOnExit
						>
							<CardContent>
								<Typography>{news.content}</Typography>
							</CardContent>
						</Collapse>
					</Card>
				))}
			</Box>
		</Layout>
	)
}

export default Dashboard
