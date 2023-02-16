const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const productsService = require("../../../src/services/products.service");
const { expect } = chai;
chai.use(sinonChai);
const {
  allProducts,
  idOneProduct,
  insertProductMock,
  newProductMock,
} = require("./mocks/products.controller.mock");
const productsController = require("../../../src/controllers/products.controller");
const productsValidation = require("../../../src/middlewares/productsValidation");

describe("GET Unit tests of products.controller", () => {
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
      params: { id: "a" },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsValidation, "validateProductName")
      .resolves({ type: "INVALID_VALUE", message: '"id" must be a number' });
    await productsController.listProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: '"id" must be a number',
    });
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
      .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });
    await productsController.listProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  });
});

describe("POST Unit tests of products.controller", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Successfully inserts a new product and returns the product with his id", async () => {
    const res = {};
    const req = {
      body: insertProductMock,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "createProduct")
      .resolves({ type: null, message: newProductMock });
    await productsController.insertProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });
  it("Returns an error if product.name doesnt exists", async () => {
    const res = {};
    const req = {
      body: {},
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, "createProduct").resolves({
      type: 400,
      message: '"name" is required',
    });
    await productsController.insertProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it("Returns an error if product.name length < 5", async () => {
    const res = {};
    const req = {
      body: {
        name: "",
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, "createProduct").resolves({
      type: 422,
      message: '"name" length must be at least 5 characters long',
    });
    await productsController.insertProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"name" length must be at least 5 characters long',
    });
  });
});

describe("PUT Unit tests of products.controller", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Successfully updates a product", async () => {
    const res = {};
    const req = {
      params: { id: 1 },
      body: {
        name: "produtoTeste",
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "modifyProduct")
      .resolves({ type: null, message: { id: 1, name: "produtoTeste"} });
    await productsController.changeProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: "produtoTeste"});
  });

  it("If sale.id doesnt exist, returns an error", async () => {
    const res = {};
    const req = {
      params: { id: 999999 },
      body: {
        name: "produtoTeste",
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "modifyProduct")
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    await productsController.changeProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });
});
