import fs from "fs";

// Defino los productos
// let productos = []
export default class Producto {
	constructor() {
		// this.itemList = productos;
		this.id = 0;
	}

	// Crear Archivo
	async createData(prod) {
		try {
			await fs.promises.writeFile("./lista.txt", JSON.stringify(prod, null, 2), "utf-8");
		} catch (err) {
			console.log("No se pudo agregar el archivo")
		}
	}
	// Obtener producto por Id
	async getById(id) {
		const contenido = await this.getAll();
		let producto = contenido.filter((prod) => prod.id === id);
		return producto || { error: "producto no encontrado" };
	}
	// Obtener todos los productos
	async getAll() {
		try {
			const contenido = await fs.promises.readFile("./lista.txt", "utf-8");

			return JSON.parse(contenido);
		} catch (err) {
			console.log("no existen productos")
		}


		// const contenido = this.itemList;
		// return contenido
		// 	? this.itemList
		// 	: { error: "No existen productos cargados"};
	}
	// Agregar producto(a un carrito)
	async save(prod) {
		const contenido = await this.getAll();
		const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
		prod.id = indice + 1;
		prod.timeStamp = Date.now();
		contenido.push(prod);
		this.createData(contenido);
		// console.log("----Nuevo producto ingresado----")
		return prod;

		// prod.id = ++this.id;
		// prod.timeStamp = Date.now();
		// Producto.productos.push(prod);
		// return prod;
	}

	async put(id, prod) {
		// const contenido = await this.getAll();
		// prod.id = Number(id);
		// let index = contenido.findIndex((prod) => prod.id == id);
		// contenido.splice(index, 1, {...prod, id});
		try {
			const contenido = await this.getAll();
			let index = contenido.findIndex((p) => p.id === id);
			if (index >= 0) {
				contenido.splice(index, 1, { ...prod, id });
				this.createData(contenido);
				return prod;
			} else {
				console.log(`Producto con id: ${prod.id} no existe`);
				return null;
			}

		} catch (err) {
			console.log(err)
		}
	}

	borrar(id) {
		let index = Producto.productos.findIndex((prod) => prod.id == id);
		return Producto.productos.splice(index, 1);
	}
}