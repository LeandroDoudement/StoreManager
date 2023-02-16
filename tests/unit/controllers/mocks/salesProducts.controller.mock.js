const allSalesMock = [
  {
    saleId: 1,
    date: "2023-02-15T17:37:15.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-02-15T17:37:15.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-02-15T17:37:15.000Z",
    productId: 3,
    quantity: 15,
  },
];

const saleIdTwoMock = [
  {
    date: "2023-02-15T19:10:31.000Z",
    productId: 3,
    quantity: 15,
  },
];

const newSaleMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const successfullInsertedSale = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  allSalesMock,
  saleIdTwoMock,
  newSaleMock,
  successfullInsertedSale,
};
