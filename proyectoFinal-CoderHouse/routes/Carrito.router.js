import express from "express";
import Carrito from "../clases/Carrito.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", async (req, res) => {
	const carritoCreado = await carrito.addCarrito();
	res.send(carritoCreado);
});

router.delete("/:id", (req, res) => {
	const carritoBorrado = carrito.borrar(req.params.id);
	res.send(carritoBorrado);
});

router.get("/", (req, res) => {
	carrito.listarAll().then(listaCarritos => {
		res.send(listaCarritos);
	})
	// const listaCarritos = carrito.listarAll();
	// res.send(listaCarritos);
});

router.get("/:id", async (req, res) => {
	const carroBuscado = Number(req.params.id);
	const cont = await carrito.listar(carroBuscado);
	res.send(cont);
	// const listaCarrito = carrito.listar();
	// res.send(listaCarrito);
});


router.post("/:id/productos/:idPrd", (req, res) => {
	const respuesta = carrito.guardarProductoEnCarrito(
		req.params.idPrd,
		req.params.id
	);
	res.send(respuesta);
});
export default router;