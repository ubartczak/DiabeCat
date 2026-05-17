import mongoose from "mongoose"

const dbConnect = async () => {
	if (mongoose.connection.readyState >= 1) {
		console.log("dbConnect: already connected")
		return
	}
	try {
		const uri = process.env.MONGODB_URI!
		await mongoose.connect(uri)
		console.log("Connected to MongoDB")
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
		throw error
	}
}

export default dbConnect
