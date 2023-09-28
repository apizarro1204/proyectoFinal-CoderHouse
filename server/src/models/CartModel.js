import { mongoose, model, Schema } from "mongoose";

const CarritoSchema = new mongoose.Schema({
    productos: [{
        producto: { type: Schema.Types.ObjectId, ref: 'producto'},
        cantidad: Number
    }],
    user: { type: Schema.Types.ObjectId, ref: 'users'},
    timeStamp: {type: Date, default: Date.now}
})


const CartModel = model('carrito', CarritoSchema);

export default CartModel;