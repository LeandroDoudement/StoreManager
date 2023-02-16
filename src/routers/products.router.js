const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products.controller');

const { validateProductName } = require('../middlewares/productsValidation');

router.get('/search', productsController.searchProduct);

router.get('/', productsController.listAllProducts);

router.get('/:id', productsController.listProductById);

router.post('/', validateProductName, productsController.insertProduct);

router.put('/:id', validateProductName, productsController.changeProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
