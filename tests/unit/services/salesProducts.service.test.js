const { expect } = require("chai");
const sinon = require("sinon");
const salesProductsModel = require('../../../src/models/salesProducts.model');
const salesProductsService = require('../../../src/services/salesProducts.service')
const { allSalesMock } = require('./mocks/salesProducts.service.mock')

describe("GET Unit tests of salesProducts.service", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("It is possible to return the complet list of all sales", async () => {
    sinon.stub(salesProductsModel, "getAllSales").resolves(allSalesMock);
    const result = await salesProductsService.findAllsales();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allSalesMock);
  });

});