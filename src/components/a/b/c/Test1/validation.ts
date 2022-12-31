import * as Joi from 'joi'
import { FindFormType, validateFindSchema, checkValidate } from '../../../../validation'
import { Test1Model } from '../../.././model'

const validateCreateSchema = Joi.object({}).unknown(false)

const validateUpdateSchema = Joi.object({}).unknown(false)

export const create = (data: any) => checkValidate<Test1Model>(data, validateCreateSchema)

export const find = (data: any) => checkValidate<FindFormType>(data, validateFindSchema)

export const update = (data: any) => checkValidate<Test1Model>(data, validateUpdateSchema)
