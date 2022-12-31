import * as Joi from 'joi'
import { FindFormType, validateFindSchema, checkValidate } from '../validation'
import { HaloComponentModel } from './model'

const validateCreateSchema = Joi.object({}).unknown(false)

const validateUpdateSchema = Joi.object({}).unknown(false)

export const create = (data: any) => checkValidate<HaloComponentModel>(data, validateCreateSchema)

export const find = (data: any) => checkValidate<FindFormType>(data, validateFindSchema)

export const update = (data: any) => checkValidate<HaloComponentModel>(data, validateUpdateSchema)
