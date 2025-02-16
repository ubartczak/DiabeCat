import { useState } from "react"

interface IUploadFormProps {
	onUploadSuccess: (url: string) => void
}

const UploadForm = (props: IUploadFormProps) => {
	const [file, setFile] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0])
		}
	}

	const handleUpload = async () => {
		const token = localStorage.getItem("token")
		if (!file) return

		const formData = new FormData()
		formData.append("file", file)

		setLoading(true)

		try {
			const response = await fetch("/api/upload/upload", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			})

			if (response.ok) {
				const data = await response.json()
				props.onUploadSuccess(data.url)
			}
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUpload} disabled={loading}>
				{loading ? "Przesyłanie..." : "Prześlij"}
			</button>
		</div>
	)
}

export default UploadForm
