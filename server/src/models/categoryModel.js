import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {type: String, require: true}
});

const CategoryModel = model('categoryModel', categorySchema);

export default CategoryModel;