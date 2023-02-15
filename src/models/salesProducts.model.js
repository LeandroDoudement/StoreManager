const camelize = require('camelize');
const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insertSaleProduct = async ({ id, sales }) => {
  const queries = [];
  
  for (let i = 0; i < sales.length; i += 1) {
    const { productId, quantity } = sales[i];
    queries.push(
      connection.execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [id, productId, quantity],
      ),
    );
  }

  await Promise.all(queries);

  return { id, itemsSold: sales };
};

const getAllSales = async () => {
  const [allSales] = await connection.execute(
    `SELECT t2.sale_id,
      t1.date,
      t2.product_id,
      t2.quantity
FROM StoreManager.sales AS t1
INNER JOIN StoreManager.sales_products AS t2
ON t1.id = t2.sale_id`,
  );

  return camelize(allSales);
};

const getSalesById = async (productId) => {
  const [sale] = await connection.execute(
    `SELECT t2.sale_id,
      t1.date,
      t2.product_id,
      t2.quantity
FROM StoreManager.sales AS t1
INNER JOIN StoreManager.sales_products AS t2
ON t1.id = t2.sale_id
WHERE t2.product_id = ?`,
    [productId],
  );

  return camelize(sale);
};

module.exports = { insertSales, insertSaleProduct, getAllSales, getSalesById };
