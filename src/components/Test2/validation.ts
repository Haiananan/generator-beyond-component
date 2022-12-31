import * as Joi from 'joi'
import { FindFormType, validateFindSchema, checkValidate } from '../validation'
import { Test2Model } from './model'

const validateCreateSchema = Joi.object({}).unknown(false)

const validateUpdateSchema = Joi.object({}).unknown(false)

export const create = (data: any) => checkValidate<Test2Model>(data, validateCreateSchema)

export const find = (data: any) => checkValidate<FindFormType>(data, validateFindSchema)

export const update = (data: any) => checkValidate<Test2Model>(data, validateUpdateSchema)
