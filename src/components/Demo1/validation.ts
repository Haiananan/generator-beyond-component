import * as Joi from 'joi'
import { FindFormType, validateFindSchema, checkValidate } from '../validation'
import { Demo1Model } from './model'

const validateCreateSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().required(),
  age: Joi.number().required().min(1).max(120),
  sex: Joi.string().required().valid('female','male'),
  birthday: Joi.date(),
  status: Joi.boolean().default(true),
  profile: Joi.any(),

}).unknown(false)

const validateUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string(),
  age: Joi.number().min(1).max(120),
  sex: Joi.string().valid('female','male'),
  birthday: Joi.date(),
  status: Joi.boolean().default(true),
  profile: Joi.any(),

}).unknown(false)

export const create = (data: any) => checkValidate<Demo1Model>(data, validateCreateSchema)

export const find = (data: any) => checkValidate<FindFormType>(data, validateFindSchema)

export const update = (data: any) => checkValidate<Demo1Model>(data, validateUpdateSchema)
