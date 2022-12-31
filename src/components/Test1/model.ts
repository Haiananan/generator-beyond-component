import { Document, Schema } from "mongoose";
import * as connections from "../../config/connection/connection";

export interface Test1Model extends Document {
  readonly _id: Schema.Types.ObjectId;
}

const Test1Schema: Schema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 23 },
  age: { type: Number, required: true, min: 0, max: 110 },
  email: { type: String },
  sex: { type: String, enum: ["male", "female"] },
});

export default connections.dbMain.model<Test1Model>("Test1", Test1Schema);
