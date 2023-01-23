import Objection, {  PartialModelObject } from "objection";
import DAO from "../../dao/base-classes/DAO";

abstract class Service<T extends Objection.Model> {
  constructor(protected readonly _DAO: DAO<T>) {}

  async getAll() {
    return this._DAO.getAll();
  }

 /**
   * 
   * @note As of 2022, only Postgres supports passing an array of objects to insert
   * @note overload the insert method to accept either a single object or an array of objects
   */
  insert(insert: PartialModelObject<T>): Promise<T>;
  insert(insert: PartialModelObject<T>[]): Promise<T[]>;
  async insert(insert: PartialModelObject<T> | PartialModelObject<T>[]) {
    return this._DAO.insert(insert);
  }

  async findById(id: string) {
    return this._DAO.findById(id);
  }

  async truncate() {
    return this._DAO.truncate();
  }

  async deleteById(id: string) {
    return this._DAO.deleteById(id);
  }

  async updateAndFetchById(id: string, options: PartialModelObject<T>) {
    return this._DAO.updateAndFetchById(id, options);
  }
}

export default Service;
