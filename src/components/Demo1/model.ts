import { Document, Schema } from 'mongoose'
import * as connections from '../../config/connection/connection'

export interface Demo1Model extends Document {
  readonly _id: Schema.Types.ObjectId
  name: string
  email: string
  age: number
  hobby?: string[]
  sex: 'female' | 'male'
  birthday?: Date
  status: boolean
  profile?: any

}

const Demo1Schema: Schema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 20 },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 1, max: 120 },
  hobby: { type: [String] },
  sex: { type: String, required: true, enum: ["female", "male"] },
  birthday: { type: Date },
  status: { type: Boolean, required: true },
  profile: { type: Schema.Types.Mixed },
})

export default connections.dbMain.model<Demo1Model>('Demo1', Demo1Schema)
