const express = require('express');

const router = express.Router();

const salesProductsController = require('../controllers/salesProducts.controller');

const {
  validateProductId,
  validateQuantity,
  validateQuantityValue,
} = require('../middlewares/salesProductsValidation');

router.post(
  '/',
  validateProductId,
  validateQuantity,
  validateQuantityValue,
  salesProductsController.insertsale,
);

router.get('/', salesProductsController.listAllsales);

router.get('/:id', salesProductsController.listsaleById);

module.exports = router;
