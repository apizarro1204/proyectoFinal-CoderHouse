import express from "express";
import * as productControl from "../controllers/products.controller.js";
import { validAdmin } from '../auth/index.js'

const router = express.Router();


router.post("/", validAdmin, productControl.createProduct)

router.delete("/:id", validAdmin, productControl.deteleProductById)

router.get("/", productControl.getAllProducts)

router.get("/:id", productControl.getProductById)

router.put('/:id', validAdmin, productControl.updateProductById)

export default router;
