import Objection, { PartialModelObject } from "objection";

class DAO<T extends Objection.Model> {
  constructor(protected readonly model: typeof Objection.Model) {
    this.model = model;
  }

  async getAll() {
    const result = await this.model.query();
    return result as T[];
  }

  /**
   * 
   * @note As of 2022, only Postgres supports passing an array of objects to insert
   */
  async insert(insert: PartialModelObject<T> | PartialModelObject<T>[]) {
    const result = await this.model
      .query()
      .insert(insert)
    return result as T | T[];
  }

  async findById(id: string) {
    const result = await this.model.query().findById(id);
    return result as T | undefined;
  }

    /**
   *
   * @note The Objection types suggest we should be getting void, but we are getting an empty model back
   */
  async truncate() {
    const result = await this.model.query().truncate();
    return result as unknown as T;
  }

    /**
   *
   * @returns the number of rows deleted
   */
  async deleteById(id: string) {
    const result = await this.model.query().deleteById(id);
    return result;
  }

  async updateAndFetchById(id: string, patch: Objection.PartialModelObject<T>) {
    const result = await this.model.query().updateAndFetchById(id, patch);
    return result as T | undefined;
  }
}

export default DAO;
