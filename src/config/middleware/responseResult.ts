import { NextFunction, Response } from 'express'
import { BaseRequest } from './routeLog'

export interface CustomResponseData {
  code: number
  msg: string
  success: boolean
  data: any
}

export interface CustomResponse extends Response {
  result: {
    success: (data: any, msg?: string, code?: number) => void
    error: (msg?: string, code?: number, data?: any) => void
  }
}

function build(res: Response, req: BaseRequest) {
  const base = (data: Object) => {
    req.resultData = data
    res.send(data)
  }

  return {
    success(data: any, msg = '成功', code = 200) {
      base({
        code,
        msg,
        success: true,
        data
      } as CustomResponseData)
    },
    error(msg = '失败', code = 400, data = {}) {
      base({
        code,
        msg,
        success: false,
        data
      } as CustomResponseData)
    }
  }
}

export const resultMiddle = (
  req: BaseRequest,
  res: CustomResponse,
  next: NextFunction
) => {
  res.result = build(res, req)
  next()
}
