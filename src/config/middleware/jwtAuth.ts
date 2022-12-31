import * as jwt from 'jsonwebtoken'
import { NextFunction, Request } from 'express'
// import * as http from 'http'
// import app from '../server/server'
// import HttpError from '../error'
import { CustomResponse } from './responseResult'
import baseConfig from '..'

interface RequestWithUser extends Request {
  auth: object | string
}

const isRegExp = (v: any): boolean => {
  return Object.prototype.toString.call(v) === '[object RegExp]'
}

function isVerified(path: string | RegExp): boolean {
  if (isRegExp(path)) {
    return (path as RegExp).test(this)
  }

  return path === this
}

/**
 * @swagger
 *  components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: authorization
 */
export function isAuthenticated(
  req: RequestWithUser,
  res: CustomResponse,
  next: NextFunction
): void {
  /** 放行路径判断 */
  const isNext = baseConfig.jwt.anonymPaths.findIndex((path) => {
    return isVerified.bind(req.path)(path)
  }) !== -1
  if (isNext) return next()
  const token: string | string[] = req.headers?.authorization?.replace(
    'Bearer ',
    ''
  )

  /** 宽松拦截模式
   * false: token不合法，拦截
   * true: 始终放行，若token合法，req.auth = user
   */
  const noForce: boolean = baseConfig.jwt.noForceModePaths.includes(req.path)

  if (token) {
    try {
      const user: object | string = jwt.verify(
        token.toString(),
        baseConfig.jwt.secretKey
      )
      req.auth = user
      next()
    } catch (error) {
      res.result.error(error.message)
    }
  } else if (noForce) {
    next()
  } else {
    res.result.error('Unauthorized')
  }
}
