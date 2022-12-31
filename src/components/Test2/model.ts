import { Document, Schema } from "mongoose";
import * as connections from "../../config/connection/connection";

export interface Test2Model extends Document {
  readonly _id: Schema.Types.ObjectId;
}

const Test2Schema: Schema = new Schema({
  
});

export default connections.dbMain.model<Test2Model>("Test2", Test2Schema);
