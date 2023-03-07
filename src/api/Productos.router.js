import express from "express";
import * as productControl from "../controllers/products.controller.js";
import passport from "passport";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  productControl.createProduct
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  productControl.deteleProductById
);

router.get("/", productControl.getAllProducts);

router.get("/:id", productControl.getProductById);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  productControl.updateProductById
);

export default router;
