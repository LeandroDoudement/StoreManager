const express = require('express');

const router = express.Router();

const { listAllProducts, listProductById } = require('../controllers/products.controller');

router.get('/', listAllProducts);

router.get('/:id', listProductById);

module.exports = router;
