import express from "express";
import Producto from "../DAOs/Producto.dao.class.js";

const router = express.Router();

const producto = new Producto();

function validarAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("usted no tiene acceso");
	}
}

router.post("/", validarAdmin, (req, res) => {
	console.log(req.body);
	const response = await producto.createData(req.body)
	res.send(response);
});

router.delete("/:id", validarAdmin, async (req, res) => {
	const productoBorrado = await producto.borrar(req.params.id);
	res.send(productoBorrado);
});

router.get("/", async (req, res) => {
	const response = await producto.getAll();
	res.send(response)
});

router.get("/:id", async (req, res) => {
	const productoBuscado = Number(req.params.id);
	const cont = await producto.getById(productoBuscado);
	res.send(cont);
});

router.put('/:id', validarAdmin, async (req, res) => {
	const {nombre, descripcion, codigo, foto, precio, stock, timeStamp} = req.body;
	const id = await producto.put(Number(req.params.id), {nombre, descripcion, codigo, foto, precio, stock, timeStamp});
	res.json(id);
})

export default router;