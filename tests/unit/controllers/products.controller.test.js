const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const productsService = require("../../../src/services/products.service");
const { expect } = chai;
chai.use(sinonChai);
const { allProducts, idOneProduct } = require("./mocks/products.controller.mock");
const productsController = require("../../../src/controllers/products.controller");

describe("Unit tests of products.controller", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Returns status 200 and all products in a GET request to /products", async () => {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "findAllProducts")
      .resolves({ type: null, message: allProducts });
    await productsController.listAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it("Returns status 200 and the specific product in GET request to /products:id", async () => {
    const res = {};
    const req = {
        params: { id: 1 },
      };
    res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "findProductById")
      .resolves({ type: null, message: idOneProduct });
    await productsController.listProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(idOneProduct);
  });

  it("Returns status 404 and an error if id is not a number", async () => {
    const res = {};
    const req = {
        params: { id: 'a' },
      };
    res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "findProductById")
      .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
    await productsController.listProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: '"id" must be a number'});
  });

  it("Returns status 404 and an error if productId doesnt exist", async () => {
    const res = {};
    const req = {
        params: { id: 9999 },
      };
    res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "findProductById")
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    await productsController.listProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  });

});
