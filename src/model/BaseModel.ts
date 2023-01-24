import { Model, ModelOptions, QueryContext } from "objection";
import { z } from "zod";

class BaseModel extends Model {
  static ModelSchema: z.AnyZodObject;

  constructor(schema: z.AnyZodObject) {
    super();
    BaseModel.ModelSchema = schema;
  }

  private customValidate(): void {
    const value = BaseModel.ModelSchema.parse(this);
    Object.keys(this).forEach((key: string) => {
      delete this[key as keyof this];
    });
    Object.assign(this, value);
  }

  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    this.customValidate();
  }

  async $afterInsert(queryContext: QueryContext) {
    await super.$afterInsert(queryContext);
    this.customValidate();
  }

  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    await super.$beforeUpdate(opt, queryContext);
    this.customValidate();
  }

  async $afterUpdate(opt: ModelOptions, queryContext: QueryContext) {
    await super.$afterUpdate(opt, queryContext);
    this.customValidate();
  }

  // this gets called after a truncate query too
  async $afterFind(queryContext: QueryContext) {
    await super.$afterFind(queryContext);
    this.customValidate();
  }
}

export default BaseModel;
