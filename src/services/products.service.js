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
  if (!product) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }

  return { type: null, message: product };
};

const createProduct = async (product) => {
  const newProduct = await productsModel.insertProduct(product);
  return { type: null, message: newProduct };
};

const modifyProduct = async (name, id) => {
  const product = await productsModel.getProductById(id);
  if (product === undefined) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const newProduct = await productsModel.updateProduct({ name, id });
  return { type: null, message: newProduct };
};

const removeProduct = async (id) => {
  const product = await productsModel.getProductById(id);
  if (product === undefined) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.deleteProduct(id);
  return { type: null, message: [] };
};

const searchProduct = async (searchTerm) => {
  const product = await productsModel.searchProduct(searchTerm);
  return { type: null, message: product };
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  modifyProduct,
  removeProduct,
  searchProduct,
};
