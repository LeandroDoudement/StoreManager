const salesModel = require('../models/salesProducts.model');
const { validateId, validateProduct } = require('./validations/inputValuesValidation');

const findAllsales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const findsaleById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const sale = await salesModel.getsaleById(productId);
  if (!sale) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: sale };
};

const createsale = async (sales) => {
  const verifiedProduct = await Promise.all(sales.map((sale) => validateProduct(sale.productId)));

  const verify = verifiedProduct
    .find((error) => error.type !== null);

  if (verify !== undefined) return verify;

  const saleId = await salesModel.insertSales();
  const result = await salesModel.insertSaleProduct({ id: saleId, sales });
  return { type: null, message: result };
};

module.exports = { findAllsales, findsaleById, createsale };