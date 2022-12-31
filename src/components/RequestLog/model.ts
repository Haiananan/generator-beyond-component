import { Document, Schema } from 'mongoose'
import * as connections from '../../config/connection/connection'

export interface RequestLogModel extends Document {
  name: string,
  method: string,
  ua: string,
  path: string,
  params: string | object,
  token: string,
  reqTime: number
}

/**
 * @swagger
 * components:
 *  schemas:
 *    RequestLogSchema:
 *      properties:
 *        name:
 *          type: string
 *        method:
 *          type: string
 *        ua:
 *          type: string
 *        path:
 *          type: string
 *        params:
 *          type: string
 *        token:
 *          type: string
 *        reqTime:
 *          type: number
 *
 */
const RequestLogSchema: Schema = new Schema({
  name: String,
  method: String,
  ua: String,
  path: String,
  params: Schema.Types.Mixed,
  token: String,
  reqTime: Number
})

export default connections.dbMain.model<RequestLogModel>('RequestLog', RequestLogSchema)
