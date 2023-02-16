const salesModel = require('../models/salesProducts.model');
const {
  validateId,
  validateProduct,
} = require('./validations/inputValuesValidation');

const findAllsales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const findsaleById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const sale = await salesModel.getSalesById(productId);
  if (sale.length === 0) { return { type: 'SALE_NOT_FOUND', message: 'Sale not found' }; }

  return { type: null, message: sale };
};

const createsale = async (sales) => {
  const verifiedProduct = await Promise.all(
    sales.map((sale) => validateProduct(sale.productId)),
  );

  const verify = verifiedProduct.find((error) => error.type !== null);

  if (verify !== undefined) return verify;

  const saleId = await salesModel.insertSales();
  const result = await salesModel.insertSaleProduct({ id: saleId, sales });
  return { type: null, message: result };
};

const removeSale = async (id) => {
  const sale = await salesModel.getSalesById(id);
  console.log(sale);
  if (sale.length === 0) { return { type: 'SALE_NOT_FOUND', message: 'Sale not found' }; }
  await salesModel.deleteSale(id);
  return { type: null, message: [] };
};

module.exports = { findAllsales, findsaleById, createsale, removeSale };
