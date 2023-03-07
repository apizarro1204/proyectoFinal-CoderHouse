import express from 'express';
import * as orderControl from '../controllers/order.controller.js'

const router = express.Router();

router.get('/', orderControl.getAll)
router.post('/', orderControl.createOrder)
router.post('/:id/cart/:idCart', orderControl.addCartToOrder)

export default router;