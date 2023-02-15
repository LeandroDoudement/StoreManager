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
  const numSales = sales.length;

  for (let i = 0; i < numSales; i += 1) {
    const element = sales[i];
    if (!Reflect.has(element, 'quantity')) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }

  next();
};

const validateQuantityValue = (req, res, next) => {
  const sales = req.body;
  const numSales = sales.length;

  for (let i = 0; i < numSales; i += 1) {
    const element = sales[i];
    if (element.quantity <= 0 || typeof element.quantity !== 'number') {
      return res
        .status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }

  next();
};

module.exports = { validateProductId, validateQuantity, validateQuantityValue };
