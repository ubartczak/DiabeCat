import mongoose, { Schema, Document } from "mongoose"

export interface IImage extends Document {
	imageUrl: string
	userId: string
}

const ImageSchema: Schema = new Schema({
	imageUrl: {
		type: String,
		required: true,
		trim: true,
	},
	userId: {
		type: String,
		required: true,
		trim: true,
	},
})

const Image =
	mongoose.models.Image || mongoose.model<IImage>("Image", ImageSchema)

export default Image
