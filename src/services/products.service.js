const productsModel = require('../models/products.model');
const { validateId } = require('./validations/inputValuesValidation');

const findAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { type: null, message: products };
};

const findProductById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productsModel.getProductById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (product) => {
  const newProduct = await productsModel.insertProduct(product);
  return { type: null, message: newProduct };
};

module.exports = { findAllProducts, findProductById, createProduct };