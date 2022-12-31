import { Document, Schema } from 'mongoose'
import * as connections from '../../../../../config/connection/connection'

export interface Test1Model extends Document {
  readonly _id: Schema.Types.ObjectId
}

const Test1Schema: Schema = new Schema({})

export default connections.dbMain.model<Test1Model>('Test1', Test1Schema)
