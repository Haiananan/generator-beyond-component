import RequestLog, { RequestLogModel } from './model'
// import * as Validation from './validation'
import * as Service from '../service'

export const create = (data: any) => Service.create<RequestLogModel>(RequestLog, data)

export const find = (data: any) => Service.find<RequestLogModel>(RequestLog, data)

export const findById = (_id: string) => Service.findById<RequestLogModel>(RequestLog, _id)

export const update = (data: any) => Service.update<RequestLogModel>(RequestLog, data)

export const remove = (data: any) => Service.remove<RequestLogModel>(RequestLog, data)
