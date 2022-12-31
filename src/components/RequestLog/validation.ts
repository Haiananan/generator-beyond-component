import * as Joi from 'joi'
import { FindFormType, validateFindSchema, checkValidate } from '../validation'
import { RequestLogModel } from './model'

const validateCreateSchema = Joi.object({})

const validateUpdateSchema = Joi.object({})

export const create = (data: any) => checkValidate<RequestLogModel>(data, validateCreateSchema)

export const find = (data: any) => checkValidate<FindFormType>(data, validateFindSchema)

export const update = (data: any) => checkValidate<RequestLogModel>(data, validateUpdateSchema)
