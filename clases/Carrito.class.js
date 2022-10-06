import Producto from "./Producto.class.js";
import fs from "fs";
import { formatWithOptions } from "util";


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
		try{
			const contenido = await this.listarAll();

			// const contJson = Object.values(contenido);
			let carrito = contenido.find((carr) => carr.id == id);
			return carrito
	
			// let prod = this.carritos.find((carr) => carr.id == id);
			// return prod || { error: "carrito no encontrado" };
	
		}catch(error){
			return {error: "No existen carritos"}
		}
	}

	async listarProd(id){
			 const carrProd = await this.listar(id);
			 return carrProd.length ? JSON.parse(carrProd.productos) : { error: "Producto no encontrado" };
				
	}

	async listarAll() {
		try {
			const contenido = await fs.promises.readFile("./carrito.txt", "utf-8");

			return contenido.length ? JSON.parse(contenido) : {error: "No existen carritos"}
		} catch (err) {
			return {error: "No carritos"}
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
			await this.crearCarrito([]);
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
			const carr = await this.listar(idCarrito);
			
			carr.productos.push(prod);

			this.actualizar(carr, idCarrito);

			return (`{Producto con id: ${idProd} agregado al carrito con id: ${idCarrito}`)

			// await this.actualizar(carr, idCarrito);


		} catch (err) {
			console.log(err)
			return {err: "No se agregó nada"}
		}


		// this.carritos.forEach((carro) => {
		// 	carro.id == idCarrito ? carro.productos.push(producto) : null;
		// });
		// console.log(producto);
		// return this.carritos;
	}

	async actualizar(carr, id) {
		const contenido = await this.listarAll();
		let index = contenido.findIndex((p) => p.id == id);
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

	async borrar(id) {
		const contenido = await this.listarAll();
		let index = contenido.findIndex((carr) => carr.id == id);
		contenido.splice(index, 1);
		console.log(contenido);
		this.crearCarrito(contenido);

		return (`{ Carrito con id: ${id} eliminado }`)

	}

	async borrarProd(idProd, idCarrito){
		const carr = await this.listarAll();
		console.log(carr);
		console.log(idCarrito)
		let carrito = carr.find((c) => c.idCarrito == idCarrito);
			console.log(carrito)
		const newCarr = carrito.productos.filter((prod)=> prod.idProd != idProd);
		await this.crearCarrito(newCarr);
		return {msj: "Producto borrado"}
		
		// let indexCarr = carr.findIndex((prod) => prod.idProd== idProd);
		console.log(carr);
		// carr.splice(indexProd, 1);
		console.log(indexCarr);


	}
}