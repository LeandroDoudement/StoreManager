const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products.controller');

const { validateProduct } = require('../middlewares/productsValidation');

router.get('/', productsController.listAllProducts);

router.get('/:id', productsController.listProductById);

router.post('/', validateProduct, productsController.insertProduct);

module.exports = router;
