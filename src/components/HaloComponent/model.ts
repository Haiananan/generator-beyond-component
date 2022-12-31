import { Document, Schema, Types } from "mongoose";
import * as connections from "../../config/connection/connection";

export interface HaloComponentModel extends Document {
  readonly _id: Types.ObjectId;
  name: string;
  num: number;
  readonly fun: () => number;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    HaloComponentSchema:
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
const HaloComponentSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 18,
  },
  num: {
    type: Number,
    required: true,
    min: 10,
    max: 100,
    default: 99,
  },
  str: String,
});

HaloComponentSchema.methods.fun = function (): number {
  return this.num + 1;
};

export default connections.dbMain.model<HaloComponentModel>(
  "HaloComponent",
  HaloComponentSchema
);
