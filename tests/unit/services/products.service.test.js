const { expect } = require("chai");
const sinon = require("sinon");
const productsService = require("../../../src/services/products.service");
const productsModel = require("../../../src/models/products.model");
const { allProducts } = require("./mocks/products.service.mock");

describe("GET Unit tests of products.service", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("It is possible to return the complet list of all products", async () => {
    sinon.stub(productsModel, "getAllProducts").resolves(allProducts);
    const result = await productsService.findAllProducts();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });
  it("It is possible to return a product by its specific id if it exists", async () => {
    sinon.stub(productsModel, "getProductById").resolves(allProducts[0]);
    const result = await productsService.findProductById(1);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allProducts[0]);
  });
  it("Return an error if the id is not a number", async () => {
    const result = await productsService.findProductById("a");
    expect(result.type).to.equal("INVALID_VALUE");
    expect(result.message).to.equal('"id" must be a number');
  });
  it("Returns an error if the product id doesnt exist", async () => {
    sinon.stub(productsModel, "getProductById").resolves(undefined);
    const result = await productsService.findProductById(9999999999);
    expect(result.type).to.equal("PRODUCT_NOT_FOUND");
    expect(result.message).to.equal("Product not found");
  });
});

describe("POST Unit tests of products.service", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Successfully inserts a new product", async () => {
  sinon.stub(productsModel, "insertProduct").resolves({
    "id": 1,
    "name": "produtoTeste"
  });
    const result = await productsService.createProduct({ "name": "produtoTeste" })
    expect(result.type).to.be.equal(null)
    expect(result.message).to.deep.equal({
    "id": 1,
    "name": "produtoTeste"
  })
})

});

