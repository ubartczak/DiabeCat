import mongoose, { Schema, Document } from "mongoose"

export interface ICat extends Document {
	name: string
	birthDate: Date
	gender: "male" | "female"
	castrated: string
	breed: string
	allergies?: string
	tattooNumber?: string
	microchipNumber?: string
	fur?: string
	specialSigns?: string
}

const CatSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		catId: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		birthDate: {
			type: Date,
			required: true,
		},
		gender: {
			type: String,
			enum: ["male", "female"],
			required: true,
		},
		castrated: {
			type: String,
			required: true,
		},
		breed: {
			type: String,
			required: true,
			trim: true,
		},
		allergies: {
			type: String,
			trim: true,
		},
		tattooNumber: {
			type: String,
			trim: true,
		},
		microchipNumber: {
			type: String,
			trim: true,
		},
		fur: {
			type: String,
			trim: true,
		},
		specialSigns: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true },
)

const Cat = mongoose.models.Cat || mongoose.model<ICat>("Cat", CatSchema)

export default Cat
