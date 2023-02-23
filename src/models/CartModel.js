import { mongoose, model } from "mongoose";

const CarritoSchema = new mongoose.Schema({
    productos: []
})


const CartModel = model('carrito', CarritoSchema);

export default CartModel;