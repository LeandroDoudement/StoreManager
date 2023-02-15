const camelize = require('camelize');
const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insertsaleProduct = async ({ id, sales }) => {
  sales.forEach((element) => {
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, element.productId, element.quantity],
    );
  });

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

module.exports = { insertSales, insertsaleProduct, getAllSales, getSalesById };
