import Test2, { Test2Model } from './model'
import * as Validation from './validation'
import * as Service from '../service'

export const create = (data: any) => Service.create<Test2Model>(Test2, data, Validation.create)

export const find = (data: any) => Service.find<Test2Model>(Test2, data, Validation.find)

export const findById = (_id: string) => Service.findById<Test2Model>(Test2, _id)

export const update = (data: any) => Service.update<Test2Model>(Test2, data, Validation.update)

export const remove = (data: any) => Service.remove<Test2Model>(Test2, data)
