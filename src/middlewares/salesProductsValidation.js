const validateProductId = (req, res, next) => {
  const sales = req.body;

  for (let sale = 0; sale < sales.length; sale += 1) {
    if (!sales[sale].productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }

  return next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;
  for (let i = 0; i < sales.length; i += 1) {
    if (!sales[i].quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }

  return next();
};

const validateQuantityValue = (req, res, next) => {
  const sales = req.body;

  for (let sale = 0; sale < sales.length; sale += 1) {
    if (sales[sale].quantity <= 0) {
       return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }
  return next();
};

module.exports = { validateProductId, validateQuantity, validateQuantityValue };
