import { Request } from 'express'
import * as RequestLogService from './service'
import { RequestLogModel } from './model'
import { CustomResponse } from '../../config/middleware/responseResult'

export async function create(req: Request, res: CustomResponse): Promise<void> {
  try {
    const RequestLog: RequestLogModel = await RequestLogService.create(req.body)

    res.result.success(RequestLog)
  } catch (e) {
    res.result.error(e.message)
  }
}
export async function find(req: Request, res: CustomResponse): Promise<void> {
  try {
    const [RequestLogs, pageData] = await RequestLogService.find(req.query)

    res.result.success({ ...pageData, list: RequestLogs })
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function findById(
  req: Request,
  res: CustomResponse
): Promise<void> {
  try {
    const RequestLog = await RequestLogService.findById(req.query._id as string)
    res.result.success(RequestLog)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function update(req: Request, res: CustomResponse): Promise<void> {
  try {
    const RequestLog = await RequestLogService.update(req.body)
    res.result.success(RequestLog)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function remove(req: Request, res: CustomResponse): Promise<void> {
  try {
    const RequestLog = await RequestLogService.remove(req.body)
    res.result.success(RequestLog)
  } catch (e) {
    res.result.error(e.message)
  }
}
