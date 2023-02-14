const { getAllProducts, getProductById, insertProduct } = require('../models/products.model');
const { validateId } = require('./validations/inputValuesValidation');

const findAllProducts = async () => {
  const products = await getAllProducts();
  return { type: null, message: products };
};

const findProductById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await getProductById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (product) => {
  const newProduct = await insertProduct(product);
  return { type: null, message: newProduct };
};

module.exports = { findAllProducts, findProductById, createProduct };