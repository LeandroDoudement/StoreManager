const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { expect } = chai;
chai.use(sinonChai);
const {
  allSalesMock,
  saleIdTwoMock,
  newSaleMock,
  successfullInsertedSale,
} = require("./mocks/salesProducts.controller.mock");
const salesProductsService = require("../../../src/services/salesProducts.service");
const salesProductsController = require("../../../src/controllers/salesProducts.controller");

describe("GET Unit tests of salesProducts.controller", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Returns status 200 and all sales in a GET request to /sales", async () => {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesProductsService, "findAllsales")
      .resolves({ type: null, message: allSalesMock });
    await salesProductsController.listAllsales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesMock);
  });

  it("Returns status 200 and the specific sale in GET request to /sales:id", async () => {
    const res = {};
    const req = {
      params: { id: 2 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesProductsService, "findsaleById")
      .resolves({ type: null, message: saleIdTwoMock });
    await salesProductsController.listsaleById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleIdTwoMock);
  });

  it("Returns status 404 and an error if saleId doesnt exist", async () => {
    const res = {};
    const req = {
      params: { id: 9999 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesProductsService, "findsaleById")
      .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });
    await salesProductsController.listsaleById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
  });
});

describe("POST Unit tests of SalesProducts.controller", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("Successfully inserts a new product and returns the product with his id", async () => {
    const res = {};
    const req = {
      body: newSaleMock,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesProductsService, "createsale")
      .resolves({ type: null, message: successfullInsertedSale });
    await salesProductsController.insertsale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(successfullInsertedSale);
  });

  it("If sale.id doesnt exist, returns an error when trying to insert a salesProducts", async () => {
    const res = {};
    const req = {
      body: [{productId:9999,quantity:1}],
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesProductsService, "createsale")
      .resolves({ type: 404, message: 'Product not found' });
    await salesProductsController.insertsale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});
