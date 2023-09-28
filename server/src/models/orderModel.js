import { mongoose, model, Schema } from "mongoose";


const orderSchema = new mongoose.Schema({
    cart: [
        {
            productos: [{
                producto: { type: Schema.Types.ObjectId, ref: 'cart'},
                cantidad: Number
            }],
            user: { type: Schema.Types.ObjectId, ref: 'users'},
            timeStamp: {type: Date, default: Date.now}
                }
    ],
    timeStamp: { type: Date, default: Date.now},
    status: { type: String, default: 'generated'}
})

const OrderModel = model('order', orderSchema)

export default OrderModel;
