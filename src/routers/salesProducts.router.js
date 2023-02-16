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
  validateQuantityValue,
  validateQuantity,
  validateProductId,
  salesProductsController.insertsale,
);

router.get('/', salesProductsController.listAllsales);

router.get('/:id', salesProductsController.listsaleById);

router.delete('/:id', salesProductsController.deleteSale);

module.exports = router;
