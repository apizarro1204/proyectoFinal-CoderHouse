import mongoose from "mongoose";
import CartModel from "../models/CartModel.js";
import CartClass from '../DAOs/Cart.dao.class.js'
import OrderModel from "../models/orderModel.js";
import dotenv from 'dotenv'
dotenv.config()

const cartClass = new CartClass()

export default class Order {
    constructor(){
        this.url = process.env.DB_MONGO;
        this.mongodb = mongoose.connect;
        this.cart = new CartClass();
    }

    async createOrder(carr){
        console.log(carr)
        try{
            await this.mongodb(this.url);
            const newOrder = new OrderModel(carr)
            return await newOrder.save()
        }catch(error){
            console.log(error)
            return { error: 'No se pudo crear la orden'}
        }
    }

    async addCartToOrder(idCart,idOrder){
        await this.mongodb(this.url);
        const order = await this.getById(idOrder);
        const cart = await cartClass.listar(idCart);
        if(order)
        return await OrderModel.findByIdAndUpdate({ _id: idOrder}, {$push: { carrito: cart }});
    }

    async getById(id){
        try{
            await this.mongodb(this.url)
            return await OrderModel.findById(id)
        }catch(error){
            return { error: "No existen ordenes"}
        }
    }

    async getAll(){
        try{
            await this.mongodb(this.url)
            return await OrderModel.find()
        }catch(error){
            return { error: "No existen ordenes"}
        }
    }
}