import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	address: { type: String, required: true, },
	age: { type: Number, required: true },
	avatar: { type: String, required: true }
});

const userModel = model("user", UserSchema)
export default userModel;