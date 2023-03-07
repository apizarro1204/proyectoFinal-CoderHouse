import Order from "../DAOs/Order.dao.class.js";
import sendOrderMail from '../config/mail.config.js'

const order = new Order();

export const createOrder = async (req,res)=>{
    const response = await order.createOrder();
    res.send(response)
}

export const addCartToOrder = async (req,res)=>{
    const response = await order.addCartToOrder(req.params.idCart, req.params.id);
    res.send(response)
}
export const getAll = async (req,res)=>{
    const response = await order.getAll();
    res.send(response)
}

export const getById = async (req,res)=>{
    const response = await order.getById(req.params.id)
    res.send(response)
}

export const sendOrder = async (req,res)=>{
    const response = await order.getById(req.params.email)
    console.log(response)
    const sendO = sendOrderMail(response)
    res.send(sendO)

}