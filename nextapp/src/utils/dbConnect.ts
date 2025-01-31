import mongoose from "mongoose"

const dbConnect = async () => {
	if (mongoose.connection.readyState >= 1) {
		console.log("dbConnect: already connected")
		return
	}
	try {
		const uri = "mongodb://localhost:27018/diabecat"
		await mongoose.connect(uri)
		console.log("Connected to MongoDB")
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
		process.exit(1)
	}
}

export default dbConnect
