import mongoose, { Schema, Document } from "mongoose"

export interface INews extends Document {
	title: string
	subheader: string
	shortVersion: string
	content: string
	imgSrc: string
}

const NewsSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		subheader: {
			type: String,
			required: true,
		},
		shortVersion: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		imgSrc: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)

const News = mongoose.models.News || mongoose.model<INews>("News", NewsSchema)

export default News
