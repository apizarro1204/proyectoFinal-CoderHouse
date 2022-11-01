import mongoose from 'mongoose'
import ProductModel from '../models/ProductModel.js';

export default class Product {
	constructor() {
		//this.url = "mongodb+srv://Apizarro:darbeta12@cluster0.ho8uwm4.mongodb.net/?retryWrites=true&w=majority";
		this.url = "mongodb://localhost:27017/"
		this.mongodb = mongoose.connect
	}

	// Crear Archivo con el producto
	async createData(prod) {
		try {
			await this.mongodb(this.url);
			const newProduct = new ProductModel(prod);
			return await newProduct.save();
		} catch (err) {
			console.log(err)
		}
	}
	// Obtener producto por Id
	async getById(id) {
		try {
			//findById es un metodo de mongoose
			await this.mongodb(this.url);
			return await ProductModel.findById(id);

		} catch (error) {
			return { error: "Producto no existe" }
		}
	}
	// Obtener todos los productos

	async getAll() {
		try {
			await this.mongodb(this.url);
			return await ProductModel.find();

		} catch (err) {
			return { error: "No existen productos" }
		}
	}

	// Actualizar un producto
	async put(id, prod) {
		try {
			await this.mongodb(this.url);
			return await ProductModel.findByIdAndUpdate(id, prod);

		} catch (err) {
			console.log(err)
		}
	}

	// Borrar un producto
	async delete(id) {
		try {
			await this.mongodb(this.url);
			return await ProductModel.findByIdAndDelete(id);

		} catch (err) {
			return { error: "No existen productos" }
		}


	}
}
