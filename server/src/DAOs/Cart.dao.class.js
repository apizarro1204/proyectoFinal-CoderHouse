import Product from "./Product.dao.class.js";
import mongoose from 'mongoose'
import CartModel from '../models/CartModel.js'
import dotenv from 'dotenv'
dotenv.config()


export default class Cart {
	constructor() {
		this.url = process.env.DB_MONGO;
		this.mongodb = mongoose.connect
		this.producto = new Product();
	}

	async crearCarrito(carr) {
		try {
			await this.mongodb(this.url);
			const newCart = new CartModel(carr);
			return await newCart.save();

		} catch (err) {
			console.log(err);
			return { error: "No se pudo crear el carrito" }
		}
	}

	// Obtener carrito por ID
	async listar(id) {
		try {
			await this.mongodb(this.url);
			return await CartModel.findById(id)
		} catch (error) {
			return { error: "No existen carritos" }
		}
	}

	//Obtener un producto de un carrito
	async listarProd(id) {
		const carrProd = await this.listar(id);
		console.log(carrProd.length);
		return carrProd.productos;

	}

	// Obtener todos los carritos
	async listarAll() {
		try {
			await this.mongodb(this.url);
			return await CartModel.find();
		} catch (err) {
			return { error: "No existen carritos" }
		}
	}


	// Agrega un producto específico en un carrito específico
	async guardarProductoEnCarrito(idProd, idCarrito) {
		await this.mongodb(this.url);
		const cart = await this.listar(idCarrito);
		const prod = await this.producto.getById(idProd);
		if (cart)
		return await CartModel.findByIdAndUpdate({ _id: idCarrito }, { $push: { productos: prod } });

	}



	// Borra un carrito en específico
	async borrar(id) {
		try {
			await this.mongodb(this.url);
			return await CartModel.findByIdAndDelete(id);
		} catch (err) {
			return { error: "No se pudo eliminar el carrito" }
		}
	}

	// Borra un producto en específico de un carrito
	async borrarProd(idProd, idCarrito) {
		try {
			await this.mongodb(this.url);
			const prod = await this.producto.getById(idProd);
			return await CartModel.findByIdAndUpdate(idCarrito, { $pull: { productos: prod } });
		} catch (err) {
			return { error: "No se pudo eliminar el producto" }
		}

	}
}