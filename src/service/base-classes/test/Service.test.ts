import chai from "chai";
import sinon, { SinonStubbedInstance } from "sinon";
import DAO from "../../../dao/base-classes/DAO";
import { Model } from "objection";
import { v4 as uuidv4 } from 'uuid';

// file under test
import Service from "../Service";

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe("src :: service :: base-classes :: Service", () => {
  class SubclassService extends Service<Model> {}
  let subclassService: Service<Model>;

  let dao: SinonStubbedInstance<DAO<Model>>;

  beforeEach(() => {
    dao = sandbox.createStubInstance(DAO);
    subclassService = new SubclassService(dao);
  });

  afterEach(() => {
    sandbox.restore();
    sandbox.reset();
  });
  describe("# getAll", () => {
    it("calls DAOs query method", async () => {
      // arrange
      dao.getAll.resolves([]);
      // act
      const result = await subclassService.getAll();
      // assert
      sandbox.assert.calledOnce(dao.getAll);
      expect(result).to.deep.equal([]);
    });
  });

  describe("insert", () => {
    it("calls DAO with expected args", async () => {
      // arrange
      const options = {};
      // act
      await subclassService.insert(options);
      // assert
      sandbox.assert.calledOnce(dao.insert);
      sandbox.assert.calledWith(dao.insert, options);
    });
  });

  describe("findById", () => {
    it("calls DAO with expected args", async () => {
      // arrange
      const id = uuidv4();
      // act
      await subclassService.findById(id);
      // assert
      sandbox.assert.calledOnce(dao.findById);
      sandbox.assert.calledWith(dao.findById, id);
    });
  });
  describe("truncate", () => {
    it("calls DAO with expected method", async () => {
      // arrange
      // act
      await subclassService.truncate();
      // assert
      sandbox.assert.calledOnce(dao.truncate);
    });
  });
  describe("deleteById", () => {
    it("calls DAO with expected args", async () => {
      // arrange
      const id = uuidv4();
      // act
      await subclassService.deleteById(id);
      // assert
      sandbox.assert.calledOnce(dao.deleteById);
      sandbox.assert.calledWith(dao.deleteById, id);
    });
  });
  describe("updateAndFetchById", () => {
    it("calls DAO with expected args", async () => {
      // arrange
      const id = uuidv4();
      const options = {};
      // act
      await subclassService.updateAndFetchById(id, options);
      // assert
      sandbox.assert.calledOnce(dao.updateAndFetchById);
      sandbox.assert.calledWith(dao.updateAndFetchById, id, options);
    });
  });
});
