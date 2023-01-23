import chai from "chai";
import sinon, { SinonStub } from "sinon";
import DAO from "../DAO";
import { Model } from "objection";
import { v4 as uuidv4 } from "uuid";

const { expect } = chai;
const sandbox = sinon.createSandbox();

// creating an interface is not ideal, but it's necessary due to 
// limitations with stubbing the Objection.Model instance passed to the DAO
// for a better test implementation, see Service.test.ts
interface Methods {
  query: SinonStub<any[], Methods>;
  insert: SinonStub<any[], Methods>;
  findById: SinonStub<any[], Methods>;
  truncate: SinonStub<any[], Methods>;
  deleteById: SinonStub<any[], Methods>;
  where: SinonStub<any[], Methods>;
  returning: SinonStub<any[], Methods>;
  first: SinonStub<any[], Methods>;
  updateAndFetchById: SinonStub<any[], Methods>;
}

describe("src :: dao :: base-classes :: DAO", () => {
  // DAO is an abstract class, so we need to extend it to test it
  class SubclassDAO extends DAO<Model> {}

  let methods: Methods;
  let DAOsubclass: DAO<Model>;

  beforeEach(() => {
    methods = {
      query: sandbox.stub(),
      insert: sandbox.stub(),
      findById: sandbox.stub(),
      truncate: sandbox.stub(),
      deleteById: sandbox.stub(),
      where: sandbox.stub(),
      returning: sandbox.stub(),
      first: sandbox.stub(),
      updateAndFetchById: sandbox.stub(),
    };

    DAOsubclass = new SubclassDAO(methods as unknown as typeof Model);
  });

  afterEach(() => {
    sandbox.reset();
  });
  describe("# getAll", () => {
    it("should call the query method", async () => {
      // arrange
      methods.query.resolves([]);
      // act
      const result = await DAOsubclass.getAll();
      // assert
      sandbox.assert.calledOnce(methods.query);
      expect(result).to.deep.equal([]);
    });
  });
  describe("# insert", () => {
    it("creates an instance", async () => {
      // arrange
      const id = uuidv4();
      methods.query.returnsThis();
      methods.insert.returnsThis();
      methods.returning.resolves({
        id,
      });
      const options = { id };
      // act
      const result = await DAOsubclass.insert(options);
      // assert
      expect(result).to.be.an("object");
      sandbox.assert.calledOnce(methods.insert);
      sandbox.assert.calledWith(methods.insert, options);
      sandbox.assert.calledOnce(methods.returning);
      sandbox.assert.calledWith(methods.returning, "*");
    });
  });
  describe("# findById", () => {
    it("returns an instance", async () => {
      // arrange
      const id = uuidv4();
      methods.query.returnsThis();
      methods.findById.resolves({ id });
      // act
      const result = await DAOsubclass.findById(id);
      // assert
      expect(result).to.be.an("object");
    });
  });
  describe("# truncate", () => {
    it("truncates table", async () => {
      // arrange
      methods.query.returnsThis();
      methods.truncate.resolves("SUCCESS");
      // act
      const result = await DAOsubclass.truncate();
      // assert
      expect(result).to.be.a("string");
      expect(result).to.equal("SUCCESS");
    });
  });
  describe("# deleteById", () => {
    it("deletes an instance", async () => {
      // arrange
      const id = uuidv4();
      methods.query.returnsThis();
      methods.deleteById.resolves(1);
      // act
      const result = await DAOsubclass.deleteById(id);
      // assert
      expect(result).to.equal(1);
    });
  });
  describe("# updateAndFetchById", () => {
    it("patches an instance", async () => {
      // arrange
      const id = uuidv4();
      methods.query.returnsThis();
      methods.updateAndFetchById.returnsThis();
      methods.first.resolves({});

      const patch = {
        foo: "bar",
      };
      // act
      const result = await DAOsubclass.updateAndFetchById(id, patch);
      // assert
      expect(result).to.be.an("object");
      sandbox.assert.calledOnce(methods.updateAndFetchById);
      sandbox.assert.calledWith(methods.updateAndFetchById, id, patch);
    });
  });
});
