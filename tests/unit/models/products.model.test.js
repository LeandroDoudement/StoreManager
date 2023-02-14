const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../../src/models/products.model");
const connection = require("../../../src/models/connection");
const { allProducts } = require("./mocks/products.model.mock");

describe("Unit tests of products.model", function () {
  afterEach(function () {
    sinon.restore();
  });
  it("It is possible to get all products by the /products route", async function () {
    sinon.stub(connection, "execute").resolves([allProducts]);
    const result = await productsModel.getAllProducts();
    expect(result).to.be.deep.equal(allProducts);
  });

  it("It is possible to get a specific product by its id by the /products/:id route", async () => {
    sinon.stub(connection, "execute").resolves([[allProducts[0]]]);
    const result = await productsModel.getProductById(1);
    expect(result).to.be.deep.equal(allProducts[0]);
  });
});
