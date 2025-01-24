import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
	firstName: string
	lastName: string
	email: string
	password: string
}

const UserSchema: Schema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true, // Email musi być unikalny
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
})

// Sprawdź, czy model jest już zarejestrowany (Next.js może załadować plik wielokrotnie)
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User
