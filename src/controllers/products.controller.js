const productsService = require('../services/products.service');

const listAllProducts = async (_req, res) => {
  const { message } = await productsService.findAllProducts();
  res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findProductById(id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productsService.createProduct(product);
  if (type) return res.status(400).json({ message });
  return res.status(201).json(message);
};

const changeProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.modifyProduct(name, id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  listProductById,
  insertProduct,
  changeProduct,
};
