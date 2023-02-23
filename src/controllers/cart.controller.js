import Cart from "../DAOs/Cart.dao.class.js";

const cart = new Cart();

export const createCart = async (req, res) => {
    const response = await cart.crearCarrito();
    res.send(response)
}

export const getAllCart = async (req, res) => {
    const response = await cart.listarAll();
    res.send(response)
}

export const getCartById = async (req, res) => {
    const response = await cart.listar(req.params.id)
    res.send(response)
}

export const getProdInCart = async (req, res) => {
    const productId = req.params.id;
    const response = await cart.listarProd(productId)
    res.send(response)
}

export const addProdToCart = async (req, res) => {
    const response = await cart.guardarProductoEnCarrito(req.params.idPrd, req.params.id);
    res.send(response)
}

export const deleteCartById = async (req, res) => {
    const response = await cart.borrar(req.params.id);
    res.send(response)
}

export const deleteProdFromCart = async (req, res) => {
    const response = await cart.borrarProd(req.params.idPrd, req.params.id);
    res.send(response)
}
