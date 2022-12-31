import { Request } from 'express'
import * as Test2Service from './service'
import { Test2Model } from './model'
import { CustomResponse } from '../../config/middleware/responseResult'

export async function create(req: Request, res: CustomResponse): Promise<void> {
  try {
    const Test2: Test2Model = await Test2Service.create(req.body)

    res.result.success(Test2)
  } catch (e) {
    res.result.error(e.message)
  }
}
export async function find(req: Request, res: CustomResponse): Promise<void> {
  try {
    const [Test2List, pageData] = await Test2Service.find(req.query)

    res.result.success({ ...pageData, list: Test2List })
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function findById(
  req: Request,
  res: CustomResponse
): Promise<void> {
  try {
    const Test2 = await Test2Service.findById(req.query._id as string)
    res.result.success(Test2)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function update(req: Request, res: CustomResponse): Promise<void> {
  try {
    const Test2 = await Test2Service.update(req.body)
    res.result.success(Test2)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function remove(req: Request, res: CustomResponse): Promise<void> {
  try {
    const Test2 = await Test2Service.remove(req.body)
    res.result.success(Test2)
  } catch (e) {
    res.result.error(e.message)
  }
}
