import { Request } from 'express'
import * as Test1Service from '../../.././service'
import { Test1Model } from '../../.././model'
import { CustomResponse } from '../../../../../config/middleware/responseResult'

export async function create(req: Request, res: CustomResponse): Promise<void> {
  try {
    const Test1: Test1Model = await Test1Service.create(req.body)

    res.result.success(Test1)
  } catch (e) {
    res.result.error(e.message)
  }
}
export async function find(req: Request, res: CustomResponse): Promise<void> {
  try {
    const [Test1List, pageData] = await Test1Service.find(req.query)

    res.result.success({ ...pageData, list: Test1List })
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function findById(
  req: Request,
  res: CustomResponse
): Promise<void> {
  try {
    const Test1 = await Test1Service.findById(req.query._id as string)
    res.result.success(Test1)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function update(req: Request, res: CustomResponse): Promise<void> {
  try {
    const Test1 = await Test1Service.update(req.body)
    res.result.success(Test1)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function remove(req: Request, res: CustomResponse): Promise<void> {
  try {
    const Test1 = await Test1Service.remove(req.body)
    res.result.success(Test1)
  } catch (e) {
    res.result.error(e.message)
  }
}
