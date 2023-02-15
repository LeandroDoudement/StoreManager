const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const {
  allSalesMock,
  saleIdOneMock,
  newSaleMock,
} = require("./mocks/salesProducts.model.mock");
const salesProductsModel = require("../../../src/models/salesProducts.model");

describe("GET Unit tests of salesProducts.model", function () {
  afterEach(function () {
    sinon.restore();
  });
  it("It is possible to get all sales by the /sales route", async function () {
    sinon.stub(connection, "execute").resolves([allSalesMock]);
    const result = await salesProductsModel.getAllSales();
    expect(result).to.be.deep.equal(allSalesMock);
  });

  it("It is possible to get a specific sale by the /sales:id route", async function () {
    sinon.stub(connection, "execute").resolves([saleIdOneMock]);
    const result = await salesProductsModel.getSalesById(1);
    expect(result).to.be.deep.equal(saleIdOneMock);
  });
});

describe("POST Unit tests of salesProducts.model", function () {
  afterEach(function () {
    sinon.restore();
  });
  it("Successfully inserts a new sale", async () => {
    sinon.stub(connection, "execute").resolves(newSaleMock);
    const newId = await salesProductsModel.insertSales();
    const result = await salesProductsModel.insertSaleProduct({
      id: newId,
      sales: newSaleMock,
    });
    expect(result).to.be.deep.equal({ id: newId, itemsSold: newSaleMock });
  });
});
