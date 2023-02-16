const salesProductsService = require('../services/salesProducts.service');

const listAllsales = async (_req, res) => {
  const { message } = await salesProductsService.findAllsales();
  res.status(200).json(message);
};

const listsaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesProductsService.findsaleById(id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const insertsale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesProductsService.createsale(sales);
  if (type) return res.status(404).json({ message });
  return res.status(201).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesProductsService.removeSale(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  const { type, message } = await salesProductsService.updateSales(id, sales);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  listAllsales,
  listsaleById,
  insertsale,
  deleteSale,
  updateSale,
};
