import mongoose, { Schema, Document } from "mongoose"

export interface ITestResult {
	id: string
	value: number
	date: Date
}

export interface IUserTestResults extends Document {
	email: string
	results: ITestResult[]
}

const TestResultSchema: Schema = new Schema({
	id: {
		type: String,
		required: true,
		trim: true,
	},
	value: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
})

const UserTestResultsSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	results: { type: [TestResultSchema], default: [] },
})

const UserTestResults =
	mongoose.models.UserTestResults ||
	mongoose.model<IUserTestResults>("UserTestResults", UserTestResultsSchema)

export default UserTestResults
