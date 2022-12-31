import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
// import app from '../../config/server/server'
import AuthService from './service'
import HttpError from '../../config/error'
import { IUserModel } from '../User/model'
import { CustomResponse } from '../../config/middleware/responseResult'
import baseConfig from '../../config'

/**
 * @export
 * @param {Request} req
 * @param {CustomResponse} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function signup(
  req: Request,
  res: CustomResponse,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await AuthService.createUser(req.body)
    const token: string = jwt.sign(
      { email: user.email },
      baseConfig.jwt.secretKey,
      {
        expiresIn: '60m'
      }
    )

    res.result.success({ token }, 'ok')
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message))
    }
    res.result.error(error.message)
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: IUserModel = await AuthService.getUser(req.body)

    const token: string = jwt.sign(
      { email: user.email },
      baseConfig.jwt.secretKey,
      {
        expiresIn: '60m'
      }
    )

    res.json({
      status: 200,
      logged: true,
      token,
      message: 'Sign in successfull'
    })
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message))
    }

    res.json({
      status: 400,
      message: error.message
    })
  }
}
