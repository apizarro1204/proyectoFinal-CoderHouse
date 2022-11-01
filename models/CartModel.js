import { mongoose, Types, model } from "mongoose";

const CarritoSchema = new mongoose.Schema({
    productos: []
})


const CarritoModel = model('carrito', CarritoSchema);

export default CarritoModel;