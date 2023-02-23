import express from "express";
import * as cartControl from '../controllers/cart.controller.js'

const router = express.Router();

router.get("/", cartControl.getAllCart)

router.get("/:id", cartControl.getCartById)

router.get("/:id/productos", cartControl.getProdInCart)

router.post("/", cartControl.createCart)

router.post("/:id/productos/:idPrd", cartControl.addProdToCart)

router.delete("/:id", cartControl.deleteCartById)

router.delete("/:id/productos/:idPrd", cartControl.deleteProdFromCart)

export default router;