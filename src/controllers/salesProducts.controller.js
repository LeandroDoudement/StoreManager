const salesService = require('../services/salesProducts.service');

const listAllsales = async (_req, res) => {
  const { message } = await salesService.findAllsales();
  res.status(200).json(message);
};

const listsaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findsaleById(id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const insertsale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.createsale(sale);
  if (type) return res.status(400).json({ message });
  return res.status(201).json(message);
};

module.exports = { listAllsales, listsaleById, insertsale };