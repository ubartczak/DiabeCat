import mongoose from "mongoose"

const dbConnect = async () => {
	console.log("dbConnect: Function called")
	if (mongoose.connection.readyState >= 1) {
		return
	}
	try {
		const uri = "mongodb://localhost:27017/diabecat"
		await mongoose.connect(uri)
		console.log("Connected to MongoDB")
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
		process.exit(1)
	}
}

export default dbConnect
