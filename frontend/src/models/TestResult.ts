import mongoose, { Schema, Document } from "mongoose"

export interface ITestResult extends Document {
	id: string
	value: number
	date: Date
	author: string
}

const TestResultSchema: Schema = new Schema({
	id: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	value: {
		type: Number,
		required: true,
		trim: true,
	},
	date: {
		type: Date,
		required: true,
		trim: true,
	},
	author: {
		type: String,
		required: true,
		trim: true,
	},
})

const TestResult =
	mongoose.models.TestResult ||
	mongoose.model<ITestResult>("TestResult", TestResultSchema)

export default TestResult
