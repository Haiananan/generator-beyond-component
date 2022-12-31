import { Document, Schema } from "mongoose";
import * as connections from "../../config/connection/connection";

export interface MetaModel extends Document {
  readonly _id: Schema.Types.ObjectId;
  name: string;
  num: number;
  str?: Date;
  mixed?: any;
  readonly fun: () => number;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    MetaSchema:
 *      required:
 *        - name
 *        - num
 *      properties:
 *        name:
 *          type: string
 *        num:
 *          type: number
 *
 */
const MetaSchema: Schema = new Schema({
  simpleString: { type: String },
  simpleStringArray: { type: [String] },
  requiredNumber: {
    type: Number,
    required: true,
  },
  numberWithOptions: {
    type: Number,
    min: 10,
    max: 100,
    default: 99,
    required: true,
  },
  uniqueKey: {
    type: String,
    unique: true,
    minLength: 2,
    maxLength: 18,
  },
  enumKey: {
    type: Number,
    enum: [1, 2, 3],
  },
  booleanKey: {
    type: Boolean,
  },
  dateKey: {
    type: Date,
  },
  mixedKey: {
    type: Schema.Types.Mixed,
  },
});

MetaSchema.methods.fun = function (): number {
  return this.num + 1;
};

export default connections.dbMain.model<MetaModel>("Meta", MetaSchema);
