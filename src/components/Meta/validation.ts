import * as Joi from 'joi'
import { FindFormType, validateFindSchema, checkValidate } from '../validation'
import { MetaModel } from './model'

const validateCreateSchema = Joi.object({
  name: Joi.string().min(2).max(18).required(),
  num: Joi.number().integer().min(10).required()
    .max(100)
    .default(99)
}).unknown(true)

const validateUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(18),
  num: Joi.number().integer().min(10).max(100)
}).unknown(true)

export const create = (data: any) => checkValidate<MetaModel>(data, validateCreateSchema)

export const find = (data: any) => checkValidate<FindFormType>(data, validateFindSchema)

export const update = (data: any) => checkValidate<MetaModel>(data, validateUpdateSchema)
