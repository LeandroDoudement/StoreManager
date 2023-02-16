const { idSchema } = require('./schemas');
const salesProductsModel = require('../../models/salesProducts.model');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateProduct = async (id) => {
  const [result] = await salesProductsModel.getSalesById(id);
  if (!result) return { type: 404, message: 'Product not found' };

  return { type: null, message: '' };
};

const validateSaleId = async (saleId) => {
  const result = await salesProductsModel.getSalesById(saleId);
  if (result.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: '' };
};

module.exports = { validateId, validateProduct, validateSaleId };