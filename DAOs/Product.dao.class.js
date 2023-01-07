import mongoose from 'mongoose'
import ProductModel from '../models/ProductModel.js';

export default class Product {
	constructor() {
		this.url = process.env.DB_MONGO;
		this.mongodb = mongoose.connect
	}

	// Crear Archivo con el producto
	async createData(prod) {
		try {
			await this.mongodb(this.url)
			const newProduct = await this.save(
				new ProductModel({
                title: prod.title,
                price: prod.price,
                thumbnail: prod.thumbnail
            })
			);
			console.log(`newProduct ${newProduct}`)
			return await newProduct;
		} catch (err) {
			console.log(err)
		}
	}
	// Obtener producto por Id
	async getById(id) {
		try {
			//findById es un metodo de mongoose
			await this.mongodb(this.url);
			return await findById(id);

		} catch (error) {
			return { error: "Producto no existe" }
		}
	}
	// Obtener todos los productos

	async getAll() {
		try {
			await this.mongodb(this.url);
			return await find();

		} catch (err) {
			return { error: "No existen productos" }
		}
	}
	// Agregar producto(a un carrito)
	async save(prod){
		try{
			await this.mongodb(this.url)
			const result = await prod.save();
			console.log(`result ${result}`)
			return result;
		}catch(err){
			return err;
		}
	}

	// Actualizar un producto
	async put(id, prod) {
		try {
			// await this.mongodb(this.url);
			// return await findByIdAndUpdate(id, prod);
			return await this.mongodb(this.url).insert(id, prod)

		} catch (err) {
			console.log(err)
		}
	}

	// Borrar un producto
	async delete(id) {
		try {
			await this.mongodb(this.url);
			return await findByIdAndDelete(id);

		} catch (err) {
			return { error: "No existen productos" }
		}


	}
}