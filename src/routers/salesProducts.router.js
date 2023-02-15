const express = require('express');

const router = express.Router();

const salesProductsController = require('../controllers/salesProducts.controller');

const {
  validateProductId,
  validateQuantity,
  validateQuantityValue,
} = require('../middlewares/salesProductsValidation');

router.get('/', salesProductsController.listAllsales);

router.get('/:id', salesProductsController.listsaleById);

router.post(
  '/',
  validateProductId,
  validateQuantity,
  validateQuantityValue,
  salesProductsController.insertsale,
);

module.exports = router;
