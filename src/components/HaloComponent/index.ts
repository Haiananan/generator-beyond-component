import { Request } from 'express'
import * as HaloComponentService from './service'
import { HaloComponentModel } from './model'
import { CustomResponse } from '../../config/middleware/responseResult'

export async function create(req: Request, res: CustomResponse): Promise<void> {
  try {
    const HaloComponent: HaloComponentModel = await HaloComponentService.create(req.body)

    res.result.success(HaloComponent)
  } catch (e) {
    res.result.error(e.message)
  }
}
export async function find(req: Request, res: CustomResponse): Promise<void> {
  try {
    const [HaloComponentList, pageData] = await HaloComponentService.find(req.query)

    res.result.success({ ...pageData, list: HaloComponentList })
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function findById(
  req: Request,
  res: CustomResponse
): Promise<void> {
  try {
    const HaloComponent = await HaloComponentService.findById(req.query._id as string)
    res.result.success(HaloComponent)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function update(req: Request, res: CustomResponse): Promise<void> {
  try {
    const HaloComponent = await HaloComponentService.update(req.body)
    res.result.success(HaloComponent)
  } catch (e) {
    res.result.error(e.message)
  }
}

export async function remove(req: Request, res: CustomResponse): Promise<void> {
  try {
    const HaloComponent = await HaloComponentService.remove(req.body)
    res.result.success(HaloComponent)
  } catch (e) {
    res.result.error(e.message)
  }
}
