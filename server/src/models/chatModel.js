import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  author: {
    email: { type: String, require: true },
    timeStamp: { type: Date, default: Date.now },
  },
  text: { type: String },
});

const ChatModel = model("message", chatSchema);

export default ChatModel;
