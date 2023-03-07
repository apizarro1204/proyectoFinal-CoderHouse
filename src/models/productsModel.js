import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, require: true},
  thumbnail: { type: String, required: true },
},{
  versionKey: false
});

const ProductModel = model("product", productSchema);

export default ProductModel;


