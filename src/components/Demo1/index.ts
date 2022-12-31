import { Request } from 'express'
import * as Demo1Service from './service'
import { Demo1Model } from './model'
import { CustomResponse } from '../../config/middleware/responseResult'

export async function create(req: Request, res: CustomResponse): Promise<void> {
  try {
    const Demo1: Demo1Model = await Demo1Service.create(req.body)

    res.result.success(Demo1)
  } catch (e) {
    res.result.error(e.message)
  }
}
export async function find(req: Request, res: CustomResponse): Promise<void> {
  try {
    const [Demo1List, pageData] = await Demo1Service.find(req.query)

    res.result.success({ ...pageData, list: Demo1List })
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function findById(
  req: Request,
  res: CustomResponse
): Promise<void> {
  try {
    const Demo1 = await Demo1Service.findById(req.query._id as string)
    res.result.success(Demo1)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function update(req: Request, res: CustomResponse): Promise<void> {
  try {
    const Demo1 = await Demo1Service.update(req.body)
    res.result.success(Demo1)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function remove(req: Request, res: CustomResponse): Promise<void> {
  try {
    const Demo1 = await Demo1Service.remove(req.body)
    res.result.success(Demo1)
  } catch (e) {
    res.result.error(e.message)
  }
}
