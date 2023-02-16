const { expect } = require("chai");
const sinon = require("sinon");
const salesProductsModel = require("../../../src/models/salesProducts.model");
const salesProductsService = require("../../../src/services/salesProducts.service");
const {
  allSalesMock,
  saleIdTwoMock,
  newSaleMock,
  successfullInsertedSale,
} = require("./mocks/salesProducts.service.mock");

describe("GET Unit tests of salesProducts.service", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("It is possible to return the complet list of all sales in the /sales route", async () => {
    sinon.stub(salesProductsModel, "getAllSales").resolves(allSalesMock);
    const result = await salesProductsService.findAllsales();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allSalesMock);
  });

  it("It is possible to return a specific sale in /sales:id route", async () => {
    sinon.stub(salesProductsModel, "getSalesById").resolves([saleIdTwoMock]);
    const result = await salesProductsService.findsaleById(2);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal([saleIdTwoMock]);
  });

  it("Returns an error if id is not a number", async () => {
    sinon.stub(salesProductsModel, "getSalesById").resolves({
      message: '"id" must be a number',
    });
    const result = await salesProductsService.findsaleById("a");
    expect(result.type).to.not.be.equal(null);
    expect(result.message).to.deep.equal('"id" must be a number');
  });

  it("Returns an error if id doesnt exist", async () => {
    sinon.stub(salesProductsModel, "getSalesById").resolves([]);
    const result = await salesProductsService.findsaleById(99999999);
    expect(result.type).to.be.equal("SALE_NOT_FOUND");
    expect(result.message).to.deep.equal("Sale not found");
  });
});

describe("POST Unit tests of salesProducts.service", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Returns an error if saleId doesn't exist", async () => {
    sinon
      .stub(salesProductsModel, "getSalesById")
      .resolves([]);
    const result = await salesProductsService.createsale([{ quantity: 1 }]);
    expect(result.type).to.be.equal(404);
    expect(result.message).to.deep.equal("Product not found");
  });

    it("Successfully inserts a new sale", async () => {
    sinon.stub(salesProductsModel, "insertSaleProduct").resolves(successfullInsertedSale);
      const result = await salesProductsService.createsale(newSaleMock)
      expect(result.type).to.be.equal(null)
      expect(result.message).to.deep.equal(successfullInsertedSale)
  })
});
