import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

const productModel = model("product", productSchema);

export default productModel;


