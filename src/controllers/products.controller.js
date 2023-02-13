const { findAllProducts, findProductById } = require('../services/products.service');

const listAllProducts = async (_req, res) => {
  const { type, message } = await findAllProducts();
  if (type) return res.status(400).json(message);
  res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await findProductById(id);
  if (type) return res.status(400).json(message);
  res.status(200).json(message);
};

module.exports = { listAllProducts, listProductById };