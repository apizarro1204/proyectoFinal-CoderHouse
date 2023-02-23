import Product from "../DAOs/Product.dao.class.js"

const product = new Product();

export const createProduct = async (req, res) => {
    const response = await product.createData(req.body)
    res.send(response)
}

export const getAllProducts = async (req, res) => {
    const response = await product.getAll()
    res.send(response)
}

export const getProductById = async (req, res) => {
    const response = await product.getById(req.params.id)
    res.send(response);
}

export const updateProductById = async (req, res) => {
    const response = await product.put(req.params.id, req.body);
    res.json(response)
}

export const deteleProductById = async (req, res) => {
    const response = await product.delete(req.params.id)
    res.send(response)
}