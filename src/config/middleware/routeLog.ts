/* eslint-disable no-console */
import { NextFunction, Response, Request } from 'express'
import * as RequestLogService from '../../components/RequestLog/service'

export interface BaseRequest extends Request {
  startTime: Date
  resultData: Object
}

export const routeLog = (req: BaseRequest, res: Response, next: NextFunction): void => {
  req.startTime = new Date()
  const calResponseTime = function () {
    const now = new Date()
    const reqTime = now.getTime() - req.startTime.getTime()
    const {
      method,
      path,
      body,
      query,
      headers: { authorization }
    } = req
    const token = authorization?.replace('Bearer ', '') || ''
    // eslint-disable-next-line no-console
    const ua = req.headers['user-agent']
    if (process.env.NODE_ENV === 'development') {
      console.log(query)
      console.log(
        '\x1B[36m',
        `${reqTime} ms ${method} ${path} ${JSON.stringify(body)} ${token} ${ua}`
      )
    }
    RequestLogService.create({
      reqTime,
      method,
      path,
      token,
      ua,
      params: JSON.stringify(Object.assign(query, body))
    })
  }

  // res.once('finish', calResponseTime)
  res.once('close', calResponseTime)

  next()
}
