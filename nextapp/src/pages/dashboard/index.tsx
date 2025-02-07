import Layout from "@/components/navigation/Layout"
import {
	Alert,
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Collapse,
	IconButton,
	Typography,
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState, useEffect } from "react"
import axios from "axios"
import { MyButton } from "@/components/inputs/CustomButton"
import { CustomTextField } from "@/components/inputs/CustomTextField"

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
		}
	}

	const labelStyle = {
		fontSize: "14px",
		lineHeight: "30px",
		color: "#303030",
	}

	return (
		<Layout loading={loading}>
			<MyButton text="dodaj news" onClick={handleClickOpen} />
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
						<Box sx={{ width: "100%" }}>
							<label htmlFor="imgSrc" style={labelStyle}>
								źródło obrazu
							</label>
							<CustomTextField
								id="imgSrc"
								name="imgSrc"
								value={newNews.imgSrc}
								onChange={handleInputChange}
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
			<Alert variant="outlined" severity="success">
				Witaj na stronie głównej. Wybierz jedną z opcji w górnym menu.
			</Alert>
			<Box>
				<h2>Aktualności</h2>
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
