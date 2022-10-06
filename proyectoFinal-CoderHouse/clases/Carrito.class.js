import Producto from "./Producto.class.js";
import fs from "fs";


export default class Carrito {
	constructor() {
		this.producto = new Producto();
		this.carritos = [];
		this.id = 1;
	}

	async crearCarrito(carr) {
		await fs.promises.writeFile("./carrito.txt", JSON.stringify(carr, null, 2), "utf-8");
		return carr;
	}

	// Obtener carrito por ID
	async listar(id) {
		const contenido = await this.listarAll();
		const contJson = Array.from(contenido);
		let carrito = contJson.filter((carr) => carr.id == id);
		return carrito || { error: "Carrito no encontrado" };

		// let prod = this.carritos.find((carr) => carr.id == id);
		// return prod || { error: "carrito no encontrado" };
	}

	async listarAll() {
		try {
			const contenido = await fs.promises.readFile("./carrito.txt", "utf-8");

			return JSON.parse(contenido);
		} catch (err) {
			console.log("Tomó el catch, no hay archivo para el readFile")
			this.crearCarrito([]);
			return false;
		}
		// return this.carritos.length
		// 	? this.carritos
		// 	: { error: "no hay carritos cargados" };
	}

	async addCarrito() {
		try {
			const contenido = await this.listarAll();
			const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
			const carr = { id: indice + 1, timeStamp: Date.now(), productos: [] };
			contenido.push(carr);
			this.crearCarrito(contenido);
			console.log("--- Carrito agregado ---");
			return carr;	

		} catch (err) {
			const contenido = await this.listarAll();
			const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
			contenido.push(carr)
			await this.crearCarrito(contenido);
			return carr;
		}



		// const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
		// return carr;
	}

	async guardarProductoEnCarrito(idProd, idCarrito) {
		// console.log(idProd);
		// console.log(idCarrito)
		try {
			const prod = await this.producto.getById(idProd);
			const carro = await this.listarAll();
			const carr = await this.listar(idCarrito);
			console.log(prod)
			console.log(carr)
			
			carr[0].productos.push(prod[0]);
			carro.push(carr);
			
			// await this.actualizar(carr, idCarrito);


		} catch (err) {
			console.log(err)
		}


		// this.carritos.forEach((carro) => {
		// 	carro.id == idCarrito ? carro.productos.push(producto) : null;
		// });
		// console.log(producto);
		// return this.carritos;
	}

	async actualizar(carr, id) {
		const contenido = await this.listarAll();
		let index = contenido.findIndex((p) => p.id === id);
		carr.timeStamp = Date.now();
		if (index >= 0) {
			contenido.splice(index, 1, { ...carr, id });
			this.crearCarrito(contenido);
			return carr;
		} else {
			console.log(`Producto con id: ${carr.id} no existe`);
			return null;
		}

		// carr.id = Number(id);
		// let index = this.carritos.findIndex((carr) => carr.id == id);
		// this.productos.splice(index, 1, carr);
	}

	borrar(id) {
		let index = this.carritos.findIndex((carr) => carr.id == id);
		return this.carritos.splice(index, 1);
	}
}