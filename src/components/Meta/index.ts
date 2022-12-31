import { Request } from 'express'
import * as MetaService from './service'
import { MetaModel } from './model'
import { CustomResponse } from '../../config/middleware/responseResult'

export async function create(req: Request, res: CustomResponse): Promise<void> {
  try {
    const meta: MetaModel = await MetaService.create(req.body)

    res.result.success(meta)
  } catch (e) {
    res.result.error(e.message)
  }
}
export async function find(req: Request, res: CustomResponse): Promise<void> {
  try {
    const [metas, pageData] = await MetaService.find(req.query)

    res.result.success({ ...pageData, list: metas })
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function findById(
  req: Request,
  res: CustomResponse
): Promise<void> {
  try {
    const meta = await MetaService.findById(req.query._id as string)
    res.result.success(meta)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function update(req: Request, res: CustomResponse): Promise<void> {
  try {
    const meta = await MetaService.update(req.body)
    res.result.success(meta)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function remove(req: Request, res: CustomResponse): Promise<void> {
  try {
    const meta = await MetaService.remove(req.body)
    res.result.success(meta)
  } catch (e) {
    res.result.error(e.message)
  }
}
